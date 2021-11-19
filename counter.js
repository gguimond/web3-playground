const web3 = new Web3('http://localhost:8545')
const myContractAddress = '0xeD89bc87C946Ee121e6D765095c6177C4c0fb38f'
const myAbi = [
  { inputs: [], name: 'count', outputs: [{ internalType: 'int256', name: '', type: 'int256' }], stateMutability: 'view', type: 'function' },
  { inputs: [], name: 'decr', outputs: [], stateMutability: 'nonpayable', type: 'function' },
  { inputs: [], name: 'display', outputs: [{ internalType: 'int256', name: '', type: 'int256' }], stateMutability: 'view', type: 'function' },
  { inputs: [], name: 'incr', outputs: [], stateMutability: 'nonpayable', type: 'function' },
]
const myContract = new web3.eth.Contract(myAbi, myContractAddress)
const htmlLabel = document.getElementById('myLabel')
myContract.methods
  .display()
  .call()
  .then((jsonRpcResult) => {
    htmlLabel.innerHTML = jsonRpcResult
    console.log(jsonRpcResult)
  })
  document.getElementById('incr').addEventListener('click', (function () {
  myContract.methods.incr().send({ from: '0xc95318c792aF015cE0bCc07eB1956780850A64a9' }, function () {
    myContract.methods.display().call((error, result) => {
      htmlLabel.innerHTML = result
      console.log(result)
    })
  })
}))
document.getElementById('decr').addEventListener('click', (function () {
  myContract.methods.decr().send({ from: '0xc95318c792aF015cE0bCc07eB1956780850A64a9' }, function () {
    myContract.methods.display().call((error, result) => {
      htmlLabel.innerHTML = result
      console.log(result)
    })
  })
}))
