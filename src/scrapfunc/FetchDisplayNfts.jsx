// src/components/FetchDisplayNfts.jsx

import React, { useEffect, useRef } from 'react';
import Web3 from 'web3';
import { useParams, useLocation, useNavigate } from 'react-router-dom';

const FetchDisplayNfts = () => {
  const { contractAddress } = useParams(); // Get contract address from the URL
  const location = useLocation();
  const loadedRef = useRef(false);
  const navigate = useNavigate();

  useEffect(() => {
    if (loadedRef.current) return; // Prevent duplicate loading
    loadedRef.current = true;

    const testnet = true;
    const rpcUrl = testnet ? 'https://json-rpc.evm.testnet.shimmer.network' : 'https://json-rpc.evm.shimmer.network';
    const web3 = new Web3(rpcUrl);
    const { abi } = location.state || {}; // ABI from location state
    const contract = new web3.eth.Contract(abi, contractAddress);

    const nftContainer = document.getElementById('nft-container');

    // Function to clear the container
    const clearNFTs = () => {
      while (nftContainer.firstChild) {
        nftContainer.removeChild(nftContainer.firstChild);
      }
    };

    const convertIpfsUrl = (ipfsUrl) => {
      if (ipfsUrl.startsWith('ipfs://')) {
        return ipfsUrl.replace('ipfs://', 'https://ipfs.io/ipfs/');
      }
      return ipfsUrl;
    };

    const loadNFTs = async () => {
      clearNFTs(); // Clear the container before adding new elements

      const totalSupply = await contract.methods.totalSupply().call();

      for (let i = 0; i < totalSupply; i++) {
        try {
          const tokenId = await contract.methods.tokenByIndex(i).call();
          const tokenURI = await contract.methods.tokenURI(tokenId).call();
          const owner = await contract.methods.ownerOf(tokenId).call();
          const httpURI = convertIpfsUrl(tokenURI);

          const metadataResponse = await fetch(httpURI);
          if (!metadataResponse.ok) {
            console.error(`Failed to fetch metadata for token ${tokenId}: ${metadataResponse.status}`);
            continue; // Skip this token and continue with the next one
          }
          const metadata = await metadataResponse.json();

          displayNFT({ tokenId, metadata, owner });
        } catch (error) {
          console.error(`Error loading NFT with index ${i}:`, error);
          // Optionally continue to the next iteration in case of an error
          continue;
        }
      }
    };

    const displayNFT = ({ tokenId, metadata, owner }) => {
      // Create an element for the NFT
      const nftItem = document.createElement('div');
      nftItem.className = 'nft-item';

      // Create and add the NFT information elements
      nftItem.innerHTML = `
        <img src="${convertIpfsUrl(metadata.image)}" alt="${metadata.name}" />
        <h3>${metadata.name}</h3>
        <p>${metadata.description}</p>
        <p>Token ID: ${tokenId}</p>
        <p>Owner: ${owner}</p>
      `;

      // Add click handler to navigate to the NFT detail page
      nftItem.onclick = () => {
        navigate(`/collections/${contractAddress}/${tokenId}`, { state: { metadata, owner, contractAddress } });
      };

      // Add the NFT to the container
      nftContainer.appendChild(nftItem);
    };

    loadNFTs();
  }, [contractAddress, location.state, navigate]);

  return (
    <>
      <div id="nft-container"></div>
    </>
  );
};

export default FetchDisplayNfts;
