const Notification = artifacts.require("Notification");

module.exports = function(deployer, network, accounts) {
  const otherContractAddress = process.env.OTHER_CONTRACT_ADDRESS || "0x622A55e1b7b6551D00cDB87B393611E3acE78bAF"; // Dirección del otro contrato inteligente, puede ser definida como variable de entorno
  const requiredConfirmations = process.env.REQUIRED_CONFIRMATIONS || 5; // Número de confirmaciones requeridas, puede ser definido como variable de entorno
  const destinationAddress = process.env.DESTINATION_ADDRESS || accounts[2]; // Dirección de la billetera de destino, puede ser definida como variable de entorno o usar una de las cuentas de Truffle
  const refundAddress = process.env.REFUND_ADDRESS || accounts[1]; // Dirección de la billetera de reembolso, puede ser definida como variable de entorno o usar una de las cuentas de Truffle
  deployer.deploy(Notification, otherContractAddress, requiredConfirmations, destinationAddress, refundAddress);
};
