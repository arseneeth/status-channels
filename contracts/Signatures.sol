pragma solidity >=0.5.0 <0.6.0;

import "./common/MessageSigned.sol";

contract Signatures is MessageSigned{

	    function getDataHash(string calldata _username, 
                         bytes calldata _statusContactCode, 
                         string calldata _location
            ) external view returns (bytes32) { 
        return dataHash(_username, _statusContactCode, _location);
    }

    function dataHash(string memory _username, 
                      bytes memory _statusContactCode, 
                      string memory _location
            ) internal view returns (bytes32) { 
        return keccak256(abi.encodePacked(address(this), _username, _statusContactCode, _location));
    }
    
    function getSigner(string memory _username, 
                    bytes memory _statusContactCode, 
                    string memory _location, 
                    bytes memory _signature
            ) internal returns(address) {
        return recoverAddress(getSignHash(dataHash(_username, _statusContactCode, _location)), _signature);
        // return recoverAddress(dataHash(_username, _statusContactCode, _location)11, _signature);

    }

    function getMessageSigner(string calldata _username, 
                    bytes calldata _statusContactCode, 
                    string calldata _location,
                    bytes calldata _signature
            ) external returns(address) {
        return getSigner(_username, _statusContactCode, _location, _signature);   
        }


}