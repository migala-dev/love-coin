// Script para realizar el mint de tokens
// decimals: 18 por defecto
// cantidad: La cantidad de TAO a crear
// address: Address de una EOA (External Owned Account)
var decimals = 18
var cantidad = 100
var address = "0x8A7320D4E9bcA258E73f8ec61F4e4149f22f6F96"

module.exports = async function main(callback){
    try {
        // Codigo aqui
        const Love = artifacts.require("Love");
        const love = await Love.deployed();
        const value = cantidad * 10 ** decimals
        const val = await love.mint(address, value.toString());
        console.log("Contenido: ", val)
        console.log("Valor transferido", cantidad)
        callback(0);
    } catch (error) {
        console.error(error);
        callback(1);
    }
}
