const Tao = artifacts.require("Tao");

module.exports = async function (deployer) {
    await deployer.deploy(Tao);
}