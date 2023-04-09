const Contract = artifacts.require("Contracts");

module.exports = function(deployer){
  deployer.deploy(Contract);
};