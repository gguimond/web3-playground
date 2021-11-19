function detectMetaMask() {
  if (typeof window.ethereum !== 'undefined') {                
      return true
  } else {                
      return false
  }
}

function connect() {
  console.log('Calling connect()')
  ethereum
  .request({ method: 'eth_requestAccounts' })
  .then(handleAccountsChanged)
  .catch((err) => {
  if (err.code === 4001) {
      // EIP-1193 userRejectedRequest error
      // If this happens, the user rejected the connection request.
      console.log('Please connect to MetaMask.');
      $('#status').html('You refused to connect Metamask')
  } else {
      console.error(err);
  }
  });
}

function handleAccountsChanged(accounts) {
  console.log('Calling HandleChanged')

  if (accounts.length === 0) {
      console.log('Please connect to MetaMask.');
      $('#enableMetamask').html('Connect with Metamask')
  } else if (accounts[0] !== window.currentAccount) {
      window.currentAccount = accounts[0];
      $('#enableMetamask').html(window.currentAccount)
      $('#status').html('')
  }
  console.log('WalletAddress in HandleAccountChanged ='+window.currentAccount)
}

$( document ).ready(function() {
  m = detectMetaMask()
  console.log(m)
  if(m) {
      $('#metaicon').removeClass('meta-gray')
      $('#metaicon').addClass('meta-normal')
      $('#enableMetamask').attr('disabled',false)
      connect() // Make sure the connected wallet is being returned
  } else {
      $('#enableMetamask').attr('disabled',true)
      $('#metaicon').removeClass('meta-normal')
      $('#metaicon').addClass('meta-gray')
  }

  $('#enableMetamask').click(function() {
      connect()
  });
})