const MyToken = artifacts.require('MyToken');
const { ethers } = require('ethers');

module.exports = function (deployer) {
  const initialSupply = ethers.utils.parseUnits('1000000000000', 18); // set the initial supply of tokens
  const name = 'Solaria'; // set the name of the token
  const symbol = 'SLIA'; // set the symbol of the token
  const decimals = 18; // set the number of decimal places used to represent the token

  deployer.deploy(MyToken, initialSupply, name, symbol, decimals);
};

// SPDX-License-Identifier: MIT
/*
// SPDX-License-Identifier: MIT
const SendEth = artifacts.require("EtherSender");

module.exports = function (deployer) {
  // Deploy the contract
  deployer.deploy(SendEth);
};*/
