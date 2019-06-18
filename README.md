# status-channels

<p>
<strong>WIP. DO NOT USE IN PRODUCTION. HIGH RISK ⚠</strong>
</p>


Experimental implementation of state channels with [status-js-api](https://github.com/status-im/status-js-api). Current code is able to generate cryptographic signatures and pass them between whisper nodes, more state channel functionality will be added in the future.

 
Clone the repo first
```
git clone https://github.coim/arsenyjin/status-channels.git && cd status-channels
```
run

```
npm install status-js-api &&  npm install @babel/runtime-corejs2 --save
```

Then import the private keys into `geth`, `--testnet` argument would automatically import the private keys into the testnet folder
```
geth --testnet account import <your_path>/status-channels/nothing_special_delete_me_1.txt && geth --testnet account import <your_path>/status-channels/nothing_special_delete_me_2.txt
```
Alternatively you can use your own private keys. Just change `privKey_1` and `privKey_2` variables in `test/channels_spec.js` 

Run 

```
geth --testnet --syncmode=light --ws --wsport=8546 --wsaddr=localhost --wsorigins="*" --rpc --maxpeers=25 --shh --shh.pow=0.002 --wsapi=eth,net,web3,shh,admin --unlock "0a1034393f818882546fac36500c8764805f8cef, c817afb31f99970f250d2a68d6e3785a3307f2a0"
```
You will start a ropsten testnet client, so it will take some time before the node is being synched with the Ethereum network.

After the synchronisation is finished run in a different window
```
embark test ./test/channels_spec.js --node ws://localhost:8546
```

The tests should be passed.

You can find the code in `test/channels_spec.js`
