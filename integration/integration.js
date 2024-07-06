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
const contractAddress = '0x267c881934F8083bd3B9a235828adD9dB496C86B'; 
const providerUrl = 'http://localhost:7545'; 

// Initialize web3 instance with provider
const provider = new Web3.providers.HttpProvider(providerUrl);
const web3 = new Web3(provider);

// Set up ERC20 contract instance
const erc20Contract = new web3.eth.Contract(abi, contractAddress);

const userAddress = '0x87b8b979F11F0776Fb5DD44a6c59CeE4a82DfC85'; // Replace with the user's address you want to send tokens to

// Calculate the number of tokens to send
const tokensToSend = web3.utils.toBN('100000000000000000000');

// Set up variables
let total_energy = 0;
let wallet_balance = 0;

function sleep(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}

async function main() {

  // Declare connencted devices(device0, device1, device2 ...)
  const device0 = new api({});


  let login = await device0.login(user, passwort).catch(e => {
    console.log(e);
  });

  if (device0.isConnected()) {
    let myArray = [];

    
    while (true) {
      let options = { plantData: false, deviceData: true, deviceTyp: false, weather: false, chartLastArray: false };

      let getAllPlantData = await device0.getAllPlantData(options);


      //Get data from inverter
      const producedEnergy = getAllPlantData['1444463']['devices']['DMG0B0204E']['totalData'].eToday;


      myArray.push(producedEnergy);
      const lastElement = myArray[myArray.length - 1];
      let firstElement = myArray[0];
      console.log(myArray);
      let new_energy = producedEnergy;

      if (firstElement < lastElement) {
        total_energy + new_energy;
        console.log('Produced ', producedEnergy, ' kWh of solar energy.');
        // Send tokens to the user
        erc20Contract.methods
          .transfer(userAddress, tokensToSend)
          .send({ from: '0xecbEdFaE1549c5664d70F436Ca544DcAC6fA41d8', gas: 100000 })
          .then(receipt => {
            console.log(`Congratulation 🎉💰 you earned ${tokensToSend / 10 ** 18} Solaria tokens for producing electricity.\n`);
            console.log(`Wallet adress: ${userAddress}`);
          })
          .catch(error => {
            console.error(error);
          });
        myArray[0] = lastElement;
      }
      //let logout = await device0.logout().catch(e => {console.log(e)})
      await sleep(60000);
    }
  }
}

main();
