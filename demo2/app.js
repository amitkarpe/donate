const Web3 = require('web3')
const rpcURL = 'https://rpc.ankr.com/eth'
// const rpcURL = 'https://mainnet.infura.io/v3/' // Your RCkP URL goes here
const web3 = new Web3(rpcURL)
const address = '0x22dA1eEdeBC60C1b8c3a0c48f5C81BBE2b943dD9' // Your account address goes here
web3.eth.getBalance(address).then(console.log);

// , (err, wei) => { balance = web3.utils.fromWei(wei, 'ether') })
// web3.eth.getBalance(address, (err, wei) => { balance = web3.utils.fromWei(wei, 'ether') }).then(console.log);
