const Web3 = require('web3');
const abi = [
  {
    inputs: [
      {
        internalType: 'address payable',
        name: '_to',
        type: 'address',
      },
    ],
    name: 'sendEther',
    outputs: [
      {
        internalType: 'bool',
        name: 'success',
        type: 'bool',
      },
    ],
    stateMutability: 'payable',
    type: 'function',
    payable: true,
  },
]; // replace with your contract's ABI
const contractAddress = '0x67508Ff8Be3e02A98d143a214eE159E2048165E5'; // replace with your contract's address
const providerUrl = 'http://localhost:7545'; // replace with your Ganache network URL

// Initialize web3 instance with provider
const provider = new Web3.providers.HttpProvider(providerUrl);
const web3 = new Web3(provider);

// Set up ERC20 contract instance
const erc20Contract = new web3.eth.Contract(abi, contractAddress);

// Set up your solar energy production monitoring logic
const dailyProductionKwh = 10; // Replace with your actual production value
const userAddress = '0x9ce56614C910871CC432faF2b5B226ee8a4f1dc9'; // Replace with the user's address you want to send tokens to

// Calculate the number of tokens to send
const tokensToSend = web3.utils.toBN('10000000000000000000');

// Send tokens to the user
erc20Contract.methods
  .transfer(userAddress, tokensToSend)
  .send({ from: '0x835F50045B788958763833088d1D65e19AdA5C75', gas: 100000 })
  .then(receipt => {
    console.log(`Sent ${tokensToSend / 10 ** 18} Solaria tokens to ${userAddress}`);
  })
  .catch(error => {
    console.error(error);
  });

/*
// Import the web3 library
const Web3 = require('web3');

// Create a new instance of the web3 library using the URL of the Ethereum node (in this case, Ganache)
const web3 = new Web3('http://localhost:7545');

// Set the default account to use for transactions (replace this with the address of the sender)
web3.eth.defaultAccount = '0xD23B857e637b72f7a37FE3B30b7c39aE20f8D5C1';

// Set the recipient address (replace this with the address of the recipient)
const recipientAddress = '0x97D2f4F6ad309dd5Cf4B80Db285021e1BBB5dcB6';

// Define the value (in Wei) to send
const value = web3.utils.toWei('1', 'ether');

// Create a new transaction object with the recipient address and value
const transactionObject = {
  to: recipientAddress,
  value: value
};

// Send the transaction using the sendTransaction method
web3.eth.sendTransaction(transactionObject, function(error, transactionHash) {
  if (error) {
    console.log(error);
  } else {
    console.log('Transaction hash:', transactionHash);
  }
});
*/
