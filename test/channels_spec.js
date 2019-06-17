/*global contract, config, it, assert, embark, web3, before, describe, beforeEach*/
// const EthUtil = require('ethereumjs-util');
// const TestUtils = require("../utils/testUtils");

// basic StatusJS instantiation
const StatusJS = require('status-js-api');
const status_1 = new StatusJS
const status_2 = new StatusJS

const privKey_1 = "0x7847A6D27AAD97D4C6FDC93F47CCD386F3A9DA8065EAF1A64DB5A284FE6BA76D"; // TODO manage private key issue later
const privKey_2 = "0x11BA3F03E99672DAE1E23661BE19021D3EA69C7F43FFA1B58D742E5FD3553321"; 

				// NOTE: it's a test private key, for test purpose only
 
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

	    // let hash = await Signatures.methods.getDataHash("Iuri", [0], "London").call();
	    // let signature = await web3.eth.sign(hash, accounts[0]);


	  });


	it("it should eprint something", async function () {

		  await status_1.connect("ws://localhost:8546", privKey_1);
		  await status_2.connect("ws://localhost:8546", privKey_2);

		  const user1pubKey = await status_1.getPublicKey();
		  const user2pubKey = await status_2.getPublicKey();

		  // console.log("user1 (" + await status_1.getUserName() + "):\n" + user1pubKey);
		  // console.log("user2 (" + await status_2.getUserName() + "):\n" + user2pubKey);
		  // console.log("\n")

		  const receivedMessageCb = (username) =>  (err, data) => {
		    if(err){
		      console.error("Error: " + err);
		      return;
		    }

		    // return data;
			console.log( username + " received a message from " + data.username);
			console.log(data.data.sig);
			console.log(data.payload)
		  };
		  
		  await status_1.onMessage(receivedMessageCb('user1'));
		  await status_2.onMessage(receivedMessageCb('user2'));

		  await status_1.addContact(user2pubKey);
		  await status_1.sendMessage(user2pubKey, "hello user2!");
		  await status_2.sendMessage(user1pubKey, "hello user1!");


		  await delay(5000);
		  console.log("Waited 5s");
	});


	// it("it should establish connection for Status client 1", async function () {

	//   	await status_1.connect("ws://localhost:8546", privKey_1);

	// });


	// it("it should establish connection for Status client 2", async function () {

	//   	await status_2.connect("ws://localhost:8546", privKey_2);
	
	// 	});


	// it("it should sent message from Status client 1 to client 2", async function () {

	//   	let pubkey2 = await status_2.getPublicKey();

	//   	await status_1.sendUserMessage(pubkey2, "Hello world!",  (err, data) => {
	// 		  if (err) {
	// 		    console.error(err);
	// 		    // return;
	// 		  }

 //  		});

	// });


	  	// TODO:
	  	//1* set up connection between two nodes
	  	//2* generate signature on one node
	  	//3* pass signature to another node


})
;



