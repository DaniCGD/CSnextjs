/*
Contrato inteligente en Solidity que recibe la dirección de una billetera
 y una cantidad de ether, y luego verifica si la billetera contiene 
la cantidad de ether especificada. Si es así, transfiere los ether a una cuenta 
predefinida y devuelve true. Si no se realiza la transferencia, devuelve false:
*/
// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

contract EtherTransfer {
    address payable public destinationAddress;
    
    function transferEther(address payable walletAddress, uint256 etherAmount) public returns(bool) {
        require(walletAddress.balance >= etherAmount, "Not enough ether in the wallet");
        if (walletAddress.send(etherAmount)) {
            destinationAddress.transfer(etherAmount);
            return true;
        } else {
            return false;
        }
    }
}
/*
En este contrato, la dirección de la cuenta predefinida se almacena en 
destinationAddress. La función transferEther toma la dirección de la 
billetera y la cantidad de ether como parámetros y verifica si la 
billetera contiene la cantidad de ether especificada utilizando la 
función require. Si la billetera contiene suficientes ether, 
transfiere la cantidad de ether especificada a la cuenta predefinida 
utilizando la función send y devuelve true. 
Si la transferencia falla, devuelve false.
*/