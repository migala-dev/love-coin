// SPDX-License-Identifier: MIT
pragma solidity ^0.7.6;

/// @author Migala Dev Team - Moonify
/// @title Love Coin with open GSN Implementation
/// @dev Note that this is  only a meta-token dont use it on main-nets

import "@opengsn/contracts/src/BaseRelayRecipient.sol";
import "@openzeppelin/contracts/access/Ownable.sol";

contract LoveBeta is BaseRelayRecipient, Ownable {

    string public symbol = "LOVE";
    string public description = "Love Coin Sample";
    uint public decimals = 0;

    mapping(address => uint) balances;

    event Transfer(address indexed _from, address indexed _to, uint256 _value);

    /// @dev pre-mint of 10k coints for the deployer and set the trusted forwarder for
    /// meta TX. 
    constructor(address forwarder) {
        balances[tx.origin] = 10000;
        trustedForwarder = forwarder;
    }
    /// @dev GSN Recipient version 
    function versionRecipient() external override view returns (string memory) {
        return "2.0.0";
    }

    /// @dev Override of sender and data functions
    function _msgSender()
        internal
        view
        override(Context, BaseRelayRecipient)
        returns (address payable)
    {
        return BaseRelayRecipient._msgSender();
    }

    function _msgData()
        internal
        view
        override(Context, BaseRelayRecipient)
        returns (bytes memory)
    {
        return BaseRelayRecipient._msgData();
    }

    /// @dev typical transfer function
    function transfer(address receiver, uint amount) public returns (bool sufficient) {
        if (balances[_msgSender()] < amount) return false;
        balances[_msgSender()] -= amount;
        balances[receiver] += amount;
        emit Transfer(_msgSender(), receiver, amount);
        return true;
    }
    
    /// @dev get the balance of lovecoins for addr
    function balanceOf(address addr) public view returns (uint) {
        return balances[addr];
    }

    /// @dev mint of new lovecoins, only callable by the Owner
    function mint(address to, uint256 amount) public onlyOwner {
        balances[to] += amount;
    }
}