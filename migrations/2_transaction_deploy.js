const Transaction = artifacts.require("Transaction.sol");

module.exports = (deployer, network, accounts) => {
  const _owner = accounts[0];
   
  deployer.deploy(Transaction, _owner);
}
