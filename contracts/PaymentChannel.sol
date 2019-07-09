pragma solidity >=0.5.0 <0.6.0;

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

	function isValidSignature(uint256 amount, bytes memory signature)
		internal
		view
		returns (bool)
	{
		bytes32 message = prefixed(keccak256(abi.encodePacked(address(this), amount)));

		//check that the signature is from the payment sender
		return recoverSigner(message, signature) == sender;
	}

	// the recipient can close the channel at any time by presenting a
	// signed amount from the sender. the recipient will be sent that amount,
	// and the remainder will go back to the sender
	function close(uint256 amount, bytes memory signature) public {
		require(msg.sender == recipient);
		require(isValidSignature(amount, signature));

		recipient.transfer(amount);
		selfdestruct(sender);
	}

	// the sender can extend the expiration at any time
	function extend(uint256 newExpiration) public {
		require(msg.sender == sender);
		require(newExpiration > expiration);

		expiration = newExpiration;
	}

	// if the timeout is reached without the recipient  closing the channel,
	// then the Ether is released back to the sender.

	function claimTimeout() public {
		require(now >= expiration);
		selfdestruct(sender);
	}
	
 	    /// All functions below this are just taken from the chapter
    /// 'creating and verifying signatures' chapter.

    function splitSignature(bytes memory sig)
        internal
        pure
        returns (uint8 v, bytes32 r, bytes32 s)
    {
        require(sig.length == 65);

        assembly {
            // first 32 bytes, after the length prefix
            r := mload(add(sig, 32))
            // second 32 bytes
            s := mload(add(sig, 64))
            // final byte (first byte of the next 32 bytes)
            v := byte(0, mload(add(sig, 96)))
        }

        return (v, r, s);
    }

    function recoverSigner(bytes32 message, bytes memory sig)
        internal
        pure
        returns (address)
    {
        (uint8 v, bytes32 r, bytes32 s) = splitSignature(sig);

        return ecrecover(message, v, r, s);
    }

    /// builds a prefixed hash to mimic the behavior of eth_sign.
    function prefixed(bytes32 hash) internal pure returns (bytes32) {
        return keccak256(abi.encodePacked("\x19Ethereum Signed Message:\n32", hash));
    }
}