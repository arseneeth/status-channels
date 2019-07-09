pragma solidity >=0.5.0 <0.6.0;

import "./Signatures.sol";


/*
        This contract is a copy of: 
        https://solidity.readthedocs.io/en/v0.5.9/solidity-by-example.html#id3

        For a contract that fulfils payments, the signed message must include:

        The recipient’s address.
        The amount to be transferred.
        Protection against replay attacks.


        mapping(uint256 => bool) usedNonces;
        require(!usedNonces[nonce]);
        usedNonces[nonce] = true;
*/

contract PaymentChannel {

	Signatures public signatures;


	address payable public sender;
	address payable public recipient;
	uint256 public expiration; // timeout

	function setSender(address payable _sender) public {
		//TODO: add permissions
		sender = _sender;
	}

	function setRecipient(address payable _recipient) public  {	
		//TODO: add permissions
		recipient = _recipient;
	}	

	function isValidSignature(string storage message, bytes memory signature)
		internal
		// view
		returns (bool)
	{
		
		address signer = signatures.getMessageSigner(message, signature);
		//check that the signature is from the payment sender
		return signer == sender;
	}

	// the recipient can close the channel at any time by presenting a
	// signed amount from the sender. the recipient will be sent that amount,
	// and the remainder will go back to the sender
	

	// function close(uint256 amount, bytes memory signature) public {
	// 	require(msg.sender == recipient);
	// 	require(isValidSignature(amount, signature));

	// 	recipient.transfer(amount);
	// 	selfdestruct(sender);
	// }



}