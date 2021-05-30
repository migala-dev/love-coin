# Token WorlCoin

Token construido sobre Ethereum usando Solidity para Migala. Para empezar a aprender te dejamos algunos recursos abajo. 

## Convenciones para Solidity

### Comentarios

Usar comentarios de línea (`//`) para comentarios cortos.

Ejemplo:

```
// Comentario corto ...
// continua comentario ...
// continua comentario ...
```

Usar comentarios de bloque (`/* */`) en comentarios largos de 4 o más líneas, usando una línea aparte para cada indicador de apertura y cierre.

Ejemplo:

```
/*
Comentario de bloque ...
continua comentario ...
continua comentario ...
continua comentario ...
*/
```

### Espacios

Se prefieren los espacios como método de indentación, se deben usar 4 espacios para ello.

### Máximo tamaño de línea

Una línea no debe sobrepasar 99 caracteres.

# Tao-Token
Este es un token realizado con [Solidity](https://docs.soliditylang.org/en/v0.8.4/) + [OpenZepellin](https://openzeppelin.com/) tiene 3 características: acuñado de tokens (mintable), quemado de tokens (burnable) y la opción de pausar transferencias (pausable). El contrato principal lo pueden encontrar en tao-token/contracts/Tao.sol
## Requisitos
Para poder hacer el deploy o compilar el token necesitaran de [Node](https://nodejs.org/en/) y [Truffle](https://www.trufflesuite.com/) . Existen varios recursos y guías de como instalar Node en tu sistema operativo, debes instalar truffle con el siguiente comando:

    npm install -g truffle

## Compilar el contrato 
Para compilar el contrato dirigite a la carpeta ruta del proyecto: migala-token/tao-token y corre el siguiente comando:

    truffle compile
Recuerda que el contrato usa la versión de Solidity ^0.8.0, si deseas usar cualquier otra versión del compilador puedes cambiar la versión en el archivo [truffle-config.js](https://github.com/migala-dev/migala-token/blob/main/tao-token/truffle-config.js) 
## Deploy 
Actualmente el archivo [truffle-config.js](https://github.com/migala-dev/migala-token/blob/main/tao-token/truffle-config.js) tiene configurado 3 networks: Local - [Kovan](https://kovan-testnet.github.io/website/) - [CheapETH](https://cheapeth.org/). 

Si deseas hacer el deploy del contrato en tu red local te recomendamos usar [Ganache](https://www.trufflesuite.com/ganache). 
Kovan es una red de pruebas, el deploy actual lo puedes encontrar en: https://kovan.etherscan.io/address/0x68dcd57dd218400a85ecf16f24e348e24481aec3
CheapETH es Ethereum pero con costos de transacción mucho mas barato, el deploy actual lo puedes encontrar en: https://explore.cheapswap.io/account/0xb9d5c42003f09ee4555e4e17a832fbb3db150150
Si deseas hacer tu mismo el deploy del contrato lo puedes hacer con el comando:

    truffle migrate --network NOMBRE_DE_NETWORK
Por supuesto puedes agregar otras redes en el archivo de configuración. Recuerda agregar tu llaves privada al archivo de configuración para poder hacer el deploy del contrato.

# Como Contribuir
Puedes contribuir con el proyecto siguiendo el ciclo básico clone, branch, commit y push. Puedes aprender de esto [aquí](https://github.com/firstcontributions/first-contributions/blob/master/translations/README.mx.md). 

# Recursos 
¿Deseas aprender? Te dejo la recomendación personal de Moonify, esta lista esta en orden ascendente de dificultad: 

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
