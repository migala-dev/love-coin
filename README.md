# Love Coin
El Love Coin es un meta-token realizado con [Solidity](https://docs.soliditylang.org/en/v0.8.4/) + [OpenZepellin](https://openzeppelin.com/). Al ser una meta-token no posee un estándar como ERC20 o ERC777 pero tiene integración con Open Gas Station Network (GSN) para cubrir los costos de transacción de los usuarios. El contrato principal lo pueden encontrar en contracts/token.sol.

## Playground
En la carpeta app podrás encontrar un playground donde podrás realizar transacciones de Love sin necesidad de pagar por el gas. Para correr el playground usa 
```bash
serve
```
dentro de la carpeta app. Si deseas modificar el JavaScript para experimentar con Web3 debes usar browserfy: 
```bash 
npm install -g browserify
```
Una vez instalado browserfy:
```bash
browserfy index.js > app.js
```
Ahora ya puedes usar serve para experimentar con tus cambios.

# Como Contribuir
Puedes contribuir con el proyecto siguiendo el ciclo básico clone, branch, commit y push. Puedes aprender de esto [aquí](https://github.com/firstcontributions/first-contributions/blob/master/translations/README.mx.md). 

# Recursos 
¿Deseas aprender? Te dejo la recomendación personal de Moonify: 

**Introducción**
 - [¿Qué es el BLOCKCHAIN y por qué DEBERÍA importarte?](https://www.youtube.com/watch?v=V9Kr2SujqHw)
 - [Por qué el Dinero No Vale NADA (y por qué las Criptomonedas podrían Sustituirlo)](https://www.youtube.com/watch?v=pqEidVW9da0)
- [How to become a blockchain developer in 2021](https://www.youtube.com/watch?v=OwSl2xwl2-w)
- [El Protcolo de la Verdad](https://drive.google.com/file/d/1FirtbhyoRHjWyo0gqc_Lk7guht2DoRn1/view?usp=sharing)

**Intermedio**

 - [Crea tu token ERC20 de manera fácil con OpenZepellin](https://www.youtube.com/watch?v=gk_EXjq6kxY)
 - [Aprende a Programar DApps Construyendo Tu Propio Juego](https://cryptozombies.io/es/)

**Avanzado**

 - [Mastering Ethereum](https://github.com/ethereumbook/ethereumbook)
