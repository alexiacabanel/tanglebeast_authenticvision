import React, { useEffect } from 'react';
import Web3 from 'web3';

const Metamask = () => {
  const testnet = false;
  const rpcUrl = testnet ? 'https://json-rpc.evm.testnet.shimmer.network' : 'https://json-rpc.evm.shimmer.network';
  let web3;
  let account;

  const shimmerNetwork = {
    chainId: testnet ? '0x431' : '0x94', // Example chainId, you should replace it with the correct one
    chainName: testnet ? 'Shimmer Testnet' : 'Shimmer Mainnet',
    rpcUrls: [rpcUrl],
    nativeCurrency: {
      name: 'Shimmer',
      symbol: 'SMR',
      decimals: 18,
    },
    blockExplorerUrls: [testnet ? 'https://explorer.testnet.shimmer.network' : 'https://explorer.shimmer.network'],
  };

  useEffect(() => {
    const initializeWeb3 = async () => {
      web3 = new Web3(rpcUrl);

      const savedAccount = localStorage.getItem('connectedAccount');
      if (savedAccount) {
        account = savedAccount;
        web3 = new Web3(window.ethereum);
        document.getElementById('connect-button').textContent = `Connected: ${account}`;
        document.getElementById('disconnect-button').style.display = 'inline-block'; // Show button
        loadNFTs();
      }

      document.getElementById('connect-button').addEventListener('click', connectMetamask);
      document.getElementById('disconnect-button').addEventListener('click', disconnectWallet);
      document.getElementById('filter-select').addEventListener('change', filterNFTs);

      if (!savedAccount) {
        loadNFTs();
      }
    };

    initializeWeb3();
  }, []);

  const connectMetamask = async () => {
    if (window.ethereum) {
      try {
        await window.ethereum.request({
          method: 'wallet_addEthereumChain',
          params: [shimmerNetwork]
        });

        await window.ethereum.request({ method: 'eth_requestAccounts' });
        web3 = new Web3(window.ethereum);
        const accounts = await web3.eth.getAccounts();
        account = accounts[0];
        localStorage.setItem('connectedAccount', account);
        document.getElementById('connect-button').textContent = `Connected: ${account}`;
        document.getElementById('disconnect-button').style.display = 'inline-block'; // Show button
        loadNFTs();
      } catch (error) {
        console.error('Error connecting to Metamask:', error);
      }
    } else {
      alert('Metamask not found. Please install Metamask.');
    }
  };

  const disconnectWallet = () => {
    account = null;
    localStorage.removeItem('connectedAccount');
    document.getElementById('connect-button').textContent = 'Connect wallet';
    document.getElementById('disconnect-button').style.display = 'none'; // Hide button
    alert('Wallet disconnected');
  };

  const filterNFTs = () => {
    const filterSelect = document.getElementById('filter-select');
            const filterValue = filterSelect.value;

            const nftItems = document.getElementsByClassName('nft-item');

            for (const nftItem of nftItems) {
                const ownerText = nftItem.querySelector('p:nth-child(5)').textContent;
                const isMine = ownerText.includes(shortenAddress(account));
                nftItem.style.display = (filterValue === 'mine' && isMine) || filterValue === 'all' ? 'block' : 'none';
            }
  };

  return (
    <div>
      <button id="connect-button">Connect wallet</button>
      <button id="disconnect-button" style={{ display: 'none' }}>Disconnect wallet</button>
      <select id="filter-select">
        <option value="">Select filter</option>
        {/* Add more filter options as needed */}
      </select>
      {/* Add more UI elements as needed */}
    </div>
  );
};

export default Metamask;
