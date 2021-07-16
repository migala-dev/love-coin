const web3 = require('web3')
var cantidad = 1
var address = "0x53c1C5eF182E20c14A84eF178DDAE2525B8bcb36"
var addresses = []
const fs = require('fs')
const readline = require('readline')
//lineReader.on('line', (line) => {
//    addresses.push(line)
//    console.log(line)
//})

async function processLineByLine() {
    const fileStream = fs.createReadStream('./address.txt');

    const rl = readline.createInterface({
        input: fileStream,
        crlfDelay: Infinity
    });

    for await (const line of rl){
        addresses.push(`${line}`)
    }
}


module.exports = async function main(callback){
    try {
        const contrato = artifacts.require("LoveBeta");
        const love = await contrato.deployed();
        await processLineByLine()
        for await (const ress of addresses){
            console.log(ress)
            const transaccion = await love.transfer(ress, cantidad);
            console.log("Transferencia", transaccion)
        }
        callback(0);
    } catch (error) {
        console.error(error);
        callback(1);
    }
}
