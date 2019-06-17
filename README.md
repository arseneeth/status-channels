# status-js-state-channel

PoC implementation of state channels via whisper made with https://github.com/status-im/status-js-api  
 
Change private keys for your own in https://github.com/arsenyjin/status-channels/blob/master/test/channels_spec.js , those are my test keys

```
geth --testnet --syncmode=light --ws --wsport=8546 --wsaddr=localhost --wsorigins="*" --rpc --maxpeers=25 --shh --shh.pow=0.002 --wsapi=eth,net,web3,shh,admin --unlock "<account 1>, <account 2>"
```

```
embark test ./test/channels_spec.js --node ws://localhost:8546
```
