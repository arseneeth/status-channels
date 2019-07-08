pragma solidity >=0.5.0 <0.6.0;

import "./common/MessageSigned.sol";

contract Signatures is MessageSigned{

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


    function getDataHash(string calldata _messageData
            ) external view returns (bytes32) { 
        return dataHash(_messageData);
    }

    function dataHash(string memory _messageData
            ) internal view returns (bytes32) { 
        return keccak256(abi.encodePacked(address(this), _messageData));
    }
    
    function getSigner(string memory _messageData, 
                       bytes memory _signature
            ) internal returns(address) {
        return recoverAddress(getSignHash(dataHash(_messageData)), _signature);
        // return recoverAddress(dataHash(_username, _statusContactCode, _location)11, _signature);

    }

    function getMessageSigner(string calldata _messageData,
                              bytes calldata _signature
            ) external returns(address) {
        return getSigner(_messageData, _signature);   
        }


}