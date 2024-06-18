import React from 'react';
import { useParams, useLocation } from 'react-router-dom';

const NFTDetail = () => {
  const { tokenId, contractAddress } = useParams(); // Get contract address and tokenId from URL
  const location = useLocation();
  
  // Vérifiez si location.state et location.state.metadata sont définis
  if (!location.state || !location.state.metadata) {
    return <div>Metadata not found</div>;
  }

  const { metadata, owner } = location.state;

  const convertIpfsUrl = (ipfsUrl) => {
    if (ipfsUrl.startsWith('ipfs://')) {
      return ipfsUrl.replace('ipfs://', 'https://ipfs.io/ipfs/');
    }
    return ipfsUrl;
  };

  const createBlockExplorerLink = (contractAddress, tokenId) => {
    const testnet = true; // Adjust this based on your environment
    const baseUrl = testnet ? 'https://explorer.evm.testnet.shimmer.network/token/' : 'https://explorer.evm.shimmer.network/token/';
    return `${baseUrl}/${contractAddress}/instance/${tokenId}`;
  };

  return (
    <div>
      <h2>NFT Detail</h2>
      <img src={convertIpfsUrl(metadata.image)} alt={metadata.name} />
      <h3>{metadata.name}</h3>
      <p>{metadata.description}</p>
      <p>Token ID: {tokenId}</p>
      <p>Owner: {owner}</p>
      <p>Contract Address: {contractAddress}</p> {/* Display contract address */}
      <p>
        <a href={createBlockExplorerLink(contractAddress, tokenId)} target="_blank" rel="noopener noreferrer">
          View on Block Explorer
        </a>
      </p>
    </div>
  );
};

export default NFTDetail;
