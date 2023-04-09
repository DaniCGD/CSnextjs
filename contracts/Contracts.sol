// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

contract Contracts{

  struct Contract{
    uint256 id;
    string contratatante;
    string contratado;
    string grante;
    string grante1;
    string grante2;
    string descripcion;
    string date;
    string monto;
    bool done;
  }

  event ContractCreated(
    uint256 id,
    string contratatante,
    string contratado,
    string grante,
    string grante1,
    string grante2,
    string descripcion,
    string date,
    string monto,
    bool done
  );

  event ContractCompleted(
    uint256 id,
    bool done
  );

  event ContractDone(
    uint id,
    bool done
  );

  mapping(address => mapping(uint => Contract)) public contracts;
  mapping(address => uint) public contractsCount;

  constructor(){
    createContract("0x123456778980", "0x123456778983", "BANDEC", "null", "null", "fvgragnir brgijrv ny rtgcf  thverhtgvewhyvwer thvwerbtv8", "2023-02-02 ", "0.00");
  }



  function createContract(string memory _contratante, string memory _contratado, string memory _garante, string memory _garante1, string memory _garante2, string memory _descripcion, string memory _date, string memory _monto) public {
    uint contractCount = contractsCount[msg.sender];
    contracts[msg.sender][contractCount] = Contract(
      contractCount, 
      _contratante, 
      _contratado,
      _garante, 
      _garante1, 
      _garante2, 
 
      _descripcion, 
      _date, 
      _monto, 
      false
    );
    emit ContractCreated(
      contractCount, 
      _contratante, 
      _contratado,
      _garante, 
      _garante1, 
      _garante2, 
      _descripcion, 
      _date, 
      _monto, 
      false
    );
    contractsCount[msg.sender]++;
  }

  function toggleDone(uint _id) public{
    Contract memory task = contracts[msg.sender][_id];
    task.done = !task.done;
    contracts[msg.sender][_id] = task;
    emit ContractDone(_id, task.done);
  }
}