'use strict';
const path = require('path');
const api = require('growatt');

const user = 'Otthon162';
const passwort = 'otthon1234';
const options = {}; //growatt api settings

const Web3 = require('web3');
const abi = [
  {
    inputs: [
      {
        internalType: 'uint256',
        name: 'initialSupply',
        type: 'uint256',
      },
      {
        internalType: 'string',
        name: '_name',
        type: 'string',
      },
      {
        internalType: 'string',
        name: '_symbol',
        type: 'string',
      },
      {
        internalType: 'uint8',
        name: '_decimals',
        type: 'uint8',
      },
    ],
    stateMutability: 'nonpayable',
    type: 'constructor',
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: 'address',
        name: 'owner',
        type: 'address',
      },
      {
        indexed: true,
        internalType: 'address',
        name: 'spender',
        type: 'address',
      },
      {
        indexed: false,
        internalType: 'uint256',
        name: 'value',
        type: 'uint256',
      },
    ],
    name: 'Approval',
    type: 'event',
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: 'address',
        name: 'from',
        type: 'address',
      },
      {
        indexed: true,
        internalType: 'address',
        name: 'to',
        type: 'address',
      },
      {
        indexed: false,
        internalType: 'uint256',
        name: 'value',
        type: 'uint256',
      },
    ],
    name: 'Transfer',
    type: 'event',
  },
  {
    inputs: [
      {
        internalType: 'address',
        name: '',
        type: 'address',
      },
      {
        internalType: 'address',
        name: '',
        type: 'address',
      },
    ],
    name: 'allowance',
    outputs: [
      {
        internalType: 'uint256',
        name: '',
        type: 'uint256',
      },
    ],
    stateMutability: 'view',
    type: 'function',
    constant: true,
  },
  {
    inputs: [
      {
        internalType: 'address',
        name: '',
        type: 'address',
      },
    ],
    name: 'balanceOf',
    outputs: [
      {
        internalType: 'uint256',
        name: '',
        type: 'uint256',
      },
    ],
    stateMutability: 'view',
    type: 'function',
    constant: true,
  },
  {
    inputs: [],
    name: 'decimals',
    outputs: [
      {
        internalType: 'uint8',
        name: '',
        type: 'uint8',
      },
    ],
    stateMutability: 'view',
    type: 'function',
    constant: true,
  },
  {
    inputs: [],
    name: 'name',
    outputs: [
      {
        internalType: 'string',
        name: '',
        type: 'string',
      },
    ],
    stateMutability: 'view',
    type: 'function',
    constant: true,
  },
  {
    inputs: [],
    name: 'symbol',
    outputs: [
      {
        internalType: 'string',
        name: '',
        type: 'string',
      },
    ],
    stateMutability: 'view',
    type: 'function',
    constant: true,
  },
  {
    inputs: [],
    name: 'totalSupply',
    outputs: [
      {
        internalType: 'uint256',
        name: '',
        type: 'uint256',
      },
    ],
    stateMutability: 'view',
    type: 'function',
    constant: true,
  },
  {
    inputs: [
      {
        internalType: 'address',
        name: '_to',
        type: 'address',
      },
      {
        internalType: 'uint256',
        name: '_value',
        type: 'uint256',
      },
    ],
    name: 'transfer',
    outputs: [
      {
        internalType: 'bool',
        name: 'success',
        type: 'bool',
      },
    ],
    stateMutability: 'nonpayable',
    type: 'function',
  },
  {
    inputs: [
      {
        internalType: 'address',
        name: '_spender',
        type: 'address',
      },
      {
        internalType: 'uint256',
        name: '_value',
        type: 'uint256',
      },
    ],
    name: 'approve',
    outputs: [
      {
        internalType: 'bool',
        name: 'success',
        type: 'bool',
      },
    ],
    stateMutability: 'nonpayable',
    type: 'function',
  },
  {
    inputs: [
      {
        internalType: 'address',
        name: '_from',
        type: 'address',
      },
      {
        internalType: 'address',
        name: '_to',
        type: 'address',
      },
      {
        internalType: 'uint256',
        name: '_value',
        type: 'uint256',
      },
    ],
    name: 'transferFrom',
    outputs: [
      {
        internalType: 'bool',
        name: 'success',
        type: 'bool',
      },
    ],
    stateMutability: 'nonpayable',
    type: 'function',
  },
]; // ERC20 contract ABI
const contractAddress = '0x9c5e37DB18dA112D9e720B1b1AeF3b0A5de1DCa8'; 
const providerUrl = 'http://localhost:7545'; 

// Initialize web3 instance with provider
const provider = new Web3.providers.HttpProvider(providerUrl);
const web3 = new Web3(provider);

// Set up ERC20 contract instance
const erc20Contract = new web3.eth.Contract(abi, contractAddress);

const userAddress = '0x8862BC0e5De157e851fd53dF64d267DB50B5862D'; // Replace with the user's address you want to send tokens to

// Calculate the number of tokens to send
const tokensToSend = web3.utils.toBN('100000000000000000000');

// Set up variables
let total_energy = 0;
let wallet_balance = 0;

function sleep(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}

async function test() {
  const growatt = new api({});
  let login = await growatt.login(user, passwort).catch(e => {
    console.log(e);
  });

  if (growatt.isConnected()) {
    let myArray = [];

    // Loop until stopped
    while (true) {
      let options = { plantData: false, deviceData: true, deviceTyp: false, weather: false, chartLastArray: false };

      let getAllPlantData = await growatt.getAllPlantData(options);

      const producedEnergy = getAllPlantData['1444463']['devices']['DMG0B0204E']['totalData'].eToday;
      myArray.push(producedEnergy);
      const lastElement = myArray[myArray.length - 1];
      let firstElement = myArray[0];
      console.log(myArray);
      let new_energy = producedEnergy;

      /*if (firstElement < lastElement) {
        total_energy + new_energy;
        console.log('Produced ', devices, ' kWh of solar energy.');
        // Send tokens to the user
        erc20Contract.methods
          .transfer(userAddress, tokensToSend)
          .send({ from: '0xC4F9239d8dB6D37489fFF9AC0394DC3eb728F162', gas: 100000 })
          .then(receipt => {
            console.log(`Congratulation 🎉💰 you earned ${tokensToSend / 10 ** 18} Solaria tokens for producing electricity.\n`);
            console.log(`Wallet adress: ${userAddress}`);
          })
          .catch(error => {
            console.error(error);
          });
        // Give a reward to the user
        //web3.utils.toBN(wallet_balance) += web3.utils.toBN(tokensToSend);
        // Print the award information
        //console.log("Wallet balance: ", wallet_balance, currency_name, "\n");
        myArray[0] = lastElement;
      }*/
      //let logout = await growatt.logout().catch(e => {console.log(e)})
      await sleep(60000);
    }
  }
}

test();
