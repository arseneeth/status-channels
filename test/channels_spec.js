/*global contract, config, it, assert, embark, web3, before, describe, beforeEach*/
// const EthUtil = require('ethereumjs-util');
// const TestUtils = require("../utils/testUtils");

// basic StatusJS instantiation
const StatusJS = require('status-js-api');
const status = new StatusJS

const privKey = "0x7847A6D27AAD97D4C6FDC93F47CCD386F3A9DA8065EAF1A64DB5A284FE6BA76D";

// contracts

const Signatures = require('Embark/contracts/Signatures');

config({
  contracts: {
     Signatures: {
      // args: ["$License", "$Arbitration"]
    }
  }
}, (_err, web3_accounts) => {
  accounts = web3_accounts;
});



contract("Channels", function () {

	  before(async () => {

	    let hash = await Signatures.methods.getDataHash("Iuri", [0], "London").call();
//	    signature = await web3.eth.sign(hash, accounts[0]);

		await console.log(hash);

	  });


	it("it should connect to ethereum node", async function () {

	  	await status.connect("ws://localhost:8546", privKey);
	  	// await status.connect("ws://localhost:8546", privateKey);
	  	await console.log("connected");

	  	// try{
	  	// 	await status.joinChat("#mytest");
	  	// } catch (error){
	  	// 	await console.log(error);
	  	// }

	  	// TODO:
	  	//1* set up connection between two nodes
	  	//2* generate signature on one node
	  	//3* pass signature to another node
	});

})
;



