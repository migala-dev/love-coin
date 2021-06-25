const MyContract = artifacts.require("LoveBeta");
const forwarder = '0x7eEae829DF28F9Ce522274D5771A6Be91d00E5ED'

module.exports = async function(deployer) {
  console.log('using forwarder: ', forwarder)
  await deployer.deploy(MyContract, forwarder);
};