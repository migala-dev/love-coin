// Test Script
var decimals = 18
var cantidad = 100
var address = "0x8A7320D4E9bcA258E73f8ec61F4e4149f22f6F96"

module.exports = async function main(callback){
    try {
        // Codigo aqui
        const Tao = artifacts.require("Tao");
        const tao = await Tao.deployed();
        const value = cantidad * 10**decimals
        const val = await tao.mint(address, value.toString());
        console.log("Transferencia: ", val)
        console.log("Valor transferido", value)
        callback(0);
    } catch (error) {
        console.error(error);
        callback(1);
    }
}
