import React, { useEffect, useState } from 'react';
import { fetchNFTs } from './fetchNFTs';
import { useNavigate } from 'react-router-dom';

const NFTList = () => {
  const [nfts, setNfts] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const loadNFTs = async () => {
      const nfts = await fetchNFTs();
      setNfts(nfts);
    };

    loadNFTs();
  }, []);

  const handleClick = (abi, contractAddress) => {
    navigate(`/collections/${contractAddress}`, { state: { abi, contractAddress } });
  };

  return (
    <div>
      {nfts.map((nft) => (
        <div key={nft.id} onClick={() => handleClick(nft.attributes.abi, nft.attributes.contractadress)}>
          <h3>{nft.attributes.Name}</h3>
          <p>{nft.attributes.contractadress}</p>
          {nft.attributes.banner && (
            <img src={`${nft.attributes.banner}`} alt={nft.attributes.Name} />
          )}
        </div>
      ))}
    </div>
  );
};

export default NFTList;
