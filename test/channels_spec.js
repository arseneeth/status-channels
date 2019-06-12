/*global contract, config, it, assert, embark, web3, before, describe, beforeEach*/
const EthUtil = require('ethereumjs-util');
const TestUtils = require("../utils/testUtils");

// basic StatusJS instantiation
const StatusJS = require('status-js-api');
const status = new StatusJS


contract("Channels", function () {

	it("it should connect to ethereum node", async function () {
	  	await status.connect("ws://localhost:8546", "<private key>");
	  	// await status.connect("ws://localhost:8546", privateKey);
	  	await console.log("connected");

	  	// try{
	  	// 	await status.joinChat("#mytest");
	  	// } catch (error){
	  	// 	await console.log(error);
	  	// }
	});

})
;



