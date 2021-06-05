const Love = artifacts.require("Love");

module.exports = async function (deployer) {
    await deployer.deploy(Love);
}
