import ContractsJSON from '../build/contracts/Contracts.json';
import Web3 from 'web3';

var contract = require('@truffle/contract');

export const load = async () => {
  await loadWeb3();
  const addressAccount = await loadAccount();
  const {todoContract, contracts} = await loadContract(addressAccount);

  return {addressAccount, todoContract, contracts };
};

const loadTasks = async (todoContract, addressAccount) =>{
  const contractsCount = await todoContract.contractsCount(addressAccount);
  const contracts = [];
  for (var i = 0 ; i < contractsCount; i++){
    const contract = await todoContract.contracts(addressAccount, i);
    contracts.push(contract);
  }

  return contracts
};

const loadContract = async (addressAccount) =>{
  const theContract = contract(ContractsJSON);
  theContract.setProvider(web3.eth.currentProvider);
  const todoContract = await theContract.deployed();
  const contracts = await loadTasks(todoContract, addressAccount);

  return {todoContract, contracts};
}

const loadAccount = async () => {
  const addressAccount = await web3.eth.getCoinbase();
  console.log(addressAccount);
  return addressAccount;
};

const loadWeb3 = async () => {
  if(window.ethereum){
    window.web3 = new Web3(ethereum);
    try{
      await ethereum.enable();
      web3.eth.sendTrasaction({/* ... */});
    }catch (error) {
      // User denied account access ...
    }
  }
  else if (window.web3){
    window.web3 = new Web3(web3.currentProvider);
    web3.eth.sendTrasaction({/* ... */});
  }
  else{
    console.log('Non-Ethereum browser detected. you should consider tring MetaMask')
  }
};