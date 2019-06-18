# status-channels

PoC implementation of state channels via whisper made with https://github.com/status-im/status-js-api  
 
Clone the repo first
```
git clone https://github.coim/arsenyjin/status-channels.git && cd status-channels
```
Then import the private keys into `geth`, argument `--testnet` would automatically import the private keys into the testnet folder
```
geth --testnet account import <your_path>/status-channels/nothing_special_delete_me_1.txt && geth --testnet account import <your_path>/status-channels/nothing_special_delete_me_1.txt
```



Run 

```
geth --testnet --syncmode=light --ws --wsport=8546 --wsaddr=localhost --wsorigins="*" --rpc --maxpeers=25 --shh --shh.pow=0.002 --wsapi=eth,net,web3,shh,admin --unlock "0a1034393f818882546fac36500c8764805f8cef, c817afb31f99970f250d2a68d6e3785a3307f2a0"
```

```
embark test ./test/channels_spec.js --node ws://localhost:8546
```
