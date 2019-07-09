pragma solidity >=0.5.0 <0.6.0;

/*
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

	address payable public sender;
	address payable public recipient;
	uint256 public expiration; // timeout

	constructor (address payable _recipient, uint256 duration)
		public
		payable
	{
		sender = msg.sender;
		recipient = _recipient;
		expiration = now + duration;
	}
}