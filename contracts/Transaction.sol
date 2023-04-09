// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

contract  Transaction {

    address public owner;

    constructor (address _owner){
        owner = _owner;
    }

    function send (address payable to, uint amount ) public {
        if(msg.sender == owner){
            to.transfer(amount);
            return;
        }
        revert("Esta cuebta no tiene permitido enviar dinero");
    }

    function deposit () payable public {

    }
    
    function balanceOf () view public returns(uint){
        return address(this).balance;
    }
}

