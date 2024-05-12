async function getWalletBalance() {
  // Check if Web3 has been injected by the browser (Mist/MetaMask)
  if (typeof window.ethereum !== 'undefined' || typeof window.web3 !== 'undefined') {
    // Use MetaMask's provider
    const web3 = new Web3(window['ethereum'] || window.web3.currentProvider);

    try {
      // Request account access if needed
      await window.ethereum.enable();

      // Acccounts now exposed
      const accounts = await web3.eth.getAccounts();

      if (accounts.length === 0) {
        console.log('No account found! Make sure MetaMask is logged in.');
        return;
      }

      const account = accounts[0];
      console.log('Account:', account);

      // Get wallet balance
      web3.eth.getBalance(account, (err, balance) => {
        if (err) {
          console.error('Error getting balance:', err);
        } else {
          let balanceInEther = web3.utils.fromWei(balance, 'ether');
          console.log('Balance:', balanceInEther);
          // You can update the UI with the balance here
        }
      });
    } catch (error) {
      console.error('Could not connect to wallet:', error);
    }
  } else {
    console.log('MetaMask is not installed!');
  }
}

// Call the function
getWalletBalance();
