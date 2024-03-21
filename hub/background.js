const extensions = {}

const dappPorts = {}

chrome.runtime.onConnectExternal.addListener(function(port) {
  const senderName = port.name
  const senderExtId = port.sender.id
  const senderTabId = port.sender.tab?.id
  console.log("hub received connection", port, {senderExtId, senderTabId, senderName});

  const isExtension = Boolean(senderExtId)

  if (isExtension) {
    port.onMessage.addListener(function(msg) {
      console.log("hub received message: ", msg, {senderExtId, senderName});
      if (msg.type === 'registerExtension') {
        extensions[senderExtId] = senderName
        console.log("hub registry added: ", {senderExtId, senderName})
        console.log("hub registry updated: ", extensions)

        for (const [dappTabId, dappPort] of Object.entries(dappPorts)) {
          dappPort.postMessage({type: 'announceExtensions', data: {extensions}})
          console.log('hub sent announceExtensions', {dappTabId})
        }
      }
    });

    port.onDisconnect.addListener(function(port) {
      console.log("hub received disconnect: ", port, {senderExtId, senderName});
      if (extensions[senderExtId] !== undefined) {
        delete extensions[senderExtId];
        console.log("hub registry removed: ", {senderExtId, senderName})
        console.log("hub registry updated: ", extensions)

        for (const [dappTabId, dappPort] of Object.entries(dappPorts)) {
          dappPort.postMessage({type: 'announceExtensions', data: {extensions}})
          console.log('hub sent announceExtensions', {dappTabId})
        }
      }
    });
  } else {
    port.onMessage.addListener(function(msg) {
      if (msg.type === 'requestExtensions') {
        dappPorts[senderTabId] = port

        port.postMessage({type: 'announceExtensions', data: {extensions}})
        console.log('hub sent announceExtensions', {senderTabId, senderName})
      }
    });

    port.onDisconnect.addListener(function(port) {
      console.log("hub received disconnect: ", port, {senderTabId, senderName});
      delete dappPorts[senderTabId]
    });
  }
})
