// // src/components/Home.js

// import React, { useState } from 'react';
// import NFTList from './Collections';
// import FetchDisplayNfts from '../scrapfunc/FetchDisplayNfts';

// const collectionsAdress = () => {
//   const [selectedCollection, setSelectedCollection] = useState(null);

//   const handleSelectCollection = (abi, contractAddress) => {
//     setSelectedCollection({ abi, contractAddress });
//   };

//   return (
//     <div>
//       <h1>Home</h1>
//       {!selectedCollection ? (
//         <NFTList onSelectCollection={handleSelectCollection} />
//       ) : (
//         <FetchDisplayNfts abi={selectedCollection.abi} contractAddress={selectedCollection.contractAddress} />
//       )}
//     </div>
//   );
// };

// export default collectionsAdress;
