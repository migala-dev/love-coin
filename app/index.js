var Web3 = require('web3')
const gsn = require('@opengsn/provider')
const ethers = require('ethers')
const contract = require('@truffle/contract')
const contractArtifact = require('../build/contracts/LoveBeta.json')
const IPaymaster = require('../build/contracts/IPaymaster.json')
const RelayProvider = gsn.RelayProvider
const {networks} = require('./networks')
const MetaCoin = contract(contractArtifact)
let accounts
let account

var network

const App = {
  start: async function () {
    const self = this
    // This should actually be web3.eth.getChainId but MM compares networkId to chainId apparently
    web3.eth.net.getId(async function (err, networkId) {
      if (parseInt(networkId) < 1000) { // We're on testnet/
        network = networks[networkId]
        MetaCoin.deployed = () => MetaCoin.at(network.metacoin)
      }
      if (!network) {
        const fatalmessage = document.getElementById('fatalmessage')
        fatalmessage.innerHTML = "Red incorrecta. Porfavor cambia a la red de Kovan'"
        return
      }
      console.log('chainid=', networkId, network)

      if (err) {
        console.log('Error al obtener la id de la cadena', err)
        process.exit(-1)
      }
      const gsnConfig = {
        relayLookupWindowBlocks: 600000,
        loggerConfigration: {
          logLevel: window.location.href.includes('verbose') ? 'debug' : 'error'
        },
        paymasterAddress: network.paymaster
      }
      var provider = RelayProvider.newProvider({ provider: web3.currentProvider, config: gsnConfig })
      await provider.init()
      web3.setProvider(provider)

      // Bootstrap the MetaCoin abstraction for Use.
      MetaCoin.setProvider(web3.currentProvider)

      // Get the initial account balance so it can be displayed.
      web3.eth.getAccounts(function (err, accs) {
        if (err != null) {
          alert('Hubo un error al intentar obtener tus cuentas.')
          return
        }

        if (accs.length === 0) {
          alert("No se pudo obtener ninguna cuenta.")
          return
        }

        accounts = accs
        account = accounts[0]

        self.refreshBalance()
      })
    })
  },

  setStatus: function (message) {
    const status = document.getElementById('status')
    status.innerHTML = message
  },

  link: function (path, text) {
    return '<a href="' + network.baseurl + path + '">' + text + '</a>'
  },

  addressLink: function (addr) {
    return '<a href="' + network.addressUrl + addr + '" target="_info">' + addr + '</a>'
  },

  txLink: function (addr) {
    return '<a href="' + network.txUrl + addr + '" target="_info">' + addr + '</a>'
  },

  refreshBalance: function () {
    const self = this

    function putItem (name, val) {
      const item = document.getElementById(name)
      item.innerHTML = val
    }
    function putAddr (name, addr) {
      putItem(name, self.addressLink(addr))
    }

    putAddr('paymaster', network.paymaster)

    new web3.eth.Contract(IPaymaster.abi, network.paymaster).methods
      .getHubAddr().call().then(hub => {
        putAddr('hubaddr', hub)
      }).catch(console.log)

    new web3.eth.Contract(IPaymaster.abi, network.paymaster).methods
      .getRelayHubDeposit().call().then(bal => {
        putItem('paymasterBal', '- Balance(ETH): ' + (bal / 1e18))
      }).catch(console.log)

    new web3.eth.Contract(IPaymaster.abi, network.paymaster).methods
      .trustedForwarder().call().then(forwarder => {
        putAddr('forwarderAddress', forwarder)
      }).catch(console.log)

    let meta
    MetaCoin.deployed().then(function (instance) {
      meta = instance
      putAddr('address', account)
      putAddr('metaaddr', MetaCoin.address)

      return meta.balanceOf.call(account, { from: account })
    }).then(function (value) {
      const balanceElement = document.getElementById('balance')
      balanceElement.innerHTML = value.valueOf()

    }).catch(function (e) {
      const fatalmessage = document.getElementById('fatalmessage')
      console.log(e)
      if (/mismatch/.test(e)) {
        fatalmessage.innerHTML = "Red incorrecta. Porfavor cambia a Kovan"
      }
      self.setStatus('Error al obtener tu balance.')
    })
  },

  transfer: function () {
    const self = this

    const amount = parseInt(document.getElementById('amount').value)
    const receiver = document.getElementById('receiver').value

        this.setStatus('Iniciando Transacción... (Porfavor espera)')

    let meta
    MetaCoin.deployed().then(function (instance) {
      meta = instance
      return meta.transfer(receiver, amount,
        { from: account })
    }).then(function (res) {
      self.setStatus('Transacción Completa!<br>\n' + self.txLink(res.tx))
      self.refreshBalance()
    }).catch(function (e) {
      console.log(e)
      self.setStatus('Error al enviar love.')
    })
  }
}

window.App = App
window.addEventListener('load', async () => {
  // Modern browsers...
  if (window.ethereum) {
    window.web3 = new Web3(ethereum)
    try {
      // Request account access if needed
      await ethereum.enable()

      ethereum.on('chainChanged', (chainId)=>{
        console.log( 'chainChanged', chainId)
        window.location.reload()
      })
      ethereum.on('accountsChanged', (accs)=>{
        console.log( 'accountChanged', accs)
        window.location.reload()
      })

    } catch (error) {
      // User denied account access...
      alert('Error Inesperado')
    }
  } else if (window.web3) {
    // Legacy dapp browsers...
    window.web3 = new Web3(web3.currentProvider)
  } 
  await App.start()
})
