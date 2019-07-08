// basic StatusJS instantiation
const StatusJS = require('status-js-api');
const status_1 = new StatusJS
const status_2 = new StatusJS

const privKey_1 = "0x7847A6D27AAD97D4C6FDC93F47CCD386F3A9DA8065EAF1A64DB5A284FE6BA76D"; // TODO manage private key issue later
const privKey_2 = "0x11BA3F03E99672DAE1E23661BE19021D3EA69C7F43FFA1B58D742E5FD3553321"; 
				// NOTE: given private keys are for test purpose only
 
let messageData, user1pubKey, user2pubKey, receivedMessageCb; 
const delay = ms => new Promise(res => setTimeout(res, ms));

// contracts

const Signatures = require('Embark/contracts/Signatures');

config({
  contracts: {
     Signatures: {
     	address: '0x92cdB4b878aC7DA5897a2c55c4E54FE653A89416' // NOTE: comment this section if you want to deploy a new contract
    }
  }
}, (_err, web3_accounts) => {
  accounts = web3_accounts;
});



contract("Channels", function () {

	  before(async () => {

		await status_1.connect("ws://localhost:8546", privKey_1);
		await status_2.connect("ws://localhost:8546", privKey_2);

		user1pubKey = await status_1.getPublicKey();
		user2pubKey = await status_2.getPublicKey();

		  receivedMessageCb = () =>  (err, data) => {
		    if(err){
		      console.error("Error: " + err);
		      return;
		    }

		    messageData = data.payload[0];
		  };

	  });


	it("it should pass a message between two nodes", async function () {
		  
		  await status_2.onMessage(receivedMessageCb());
		  await status_1.sendMessage(user2pubKey, "test message");

		  await delay(500); // wait for 0.5s to recieve a message
		  assert.strictEqual(messageData, "test message");

	});

	it("it should generate a signature, pass to another node and verify the signer", async function () {
	    let hash = await Signatures.methods.getDataHash("test message").call();
	    let signature = await web3.eth.sign(hash, accounts[1]);

		await status_1.onMessage(receivedMessageCb());

		await status_2.sendMessage(user1pubKey, signature);
		await delay(500); // wait for 0.5s to recieve a message

		let signer = await Signatures.methods.getMessageSigner("test message", messageData).call();

		assert.strictEqual(signer, accounts[1]);
	});

})
;
