var hubExtId = "ojlfljfgbdipegekhflbfmbhdhachcpo";
var walletName = "Wallet Foobar"

var port = chrome.runtime.connect(hubExtId, {name: 'Wallet Foobar'});
port.onMessage.addListener(function(msg) {
  console.log("wallet received from hub: ", msg);
});

var event = { type: 'registerExtension' }
port.postMessage(event);
console.log('wallet dispatched registerExtension')

chrome.runtime.onConnectExternal.addListener(function(port) {
  console.log("wallet received connection", port);

  port.onMessage.addListener(function(msg) {
    console.log("wallet received message: ", msg);
  });
})
