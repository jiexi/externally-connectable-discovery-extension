# iframe-discovery-example-example

Example Chrome extension that establishes a pattern for extension discovery via externally_connectable

## Usage
1. Start the hub extension
2. Open the hub extension console
3. Edit `hubExtId` in `wallet/background.js` to match the hub extension's Id
4. Edit `hubExtId` in `dapp.html` to match the hub extension's Id
5. Start the wallet extension
6. Open the wallet extension console
7. Open `dapp.html` as a file locally in your browser
8. View console logs from `dapp.html`

## Notes

* Hub must be running before the Wallet as the Wallet will not retry registering itself if the Hub is unreachable
* The Wallet will be registered when it connects to the Hub and sends `registerExtension`. The extension Id and name are derived from the port connection itself
* The Wallet be unregistered automatically when it disconnects from the Hub
* The Dapp will receive a list of extensions registered with the Hub when it connects to the Hub and sends `requestExtensions`
  * The Dapp will receive `announceExtensions` from the Hub for the initial request and for every change that occurs in the Hub registry
* Wallets calling `requestExtensions` results in a noop
* Dapps calling `registerExtension` results in a noop
