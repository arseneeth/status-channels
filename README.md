# status-js-state-channel
State channels implementation via status-js-api and whisper

```
geth --testnet --syncmode=light --ws --wsport=8546 --wsaddr=localhost --wsorigins="*" --rpc --maxpeers=25 --shh --shh.pow=0.002 --wsapi=eth,net,web3,shh,admin --unlock <account>
```

```
embark test ./test/channels_spec.js --node ws://localhost:8546
```
