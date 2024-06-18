import React from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import NFTList from './components/Collections';
import NFTDetail from './scrapfunc/NFTDetail';
import FetchDisplayNfts from './scrapfunc/FetchDisplayNfts';
import Metamask from './components/Metamask';
import Navbar from './components/Navbar';
import './App.css';

const App = () => {
  return (
    <Router>
      <div>
        <Navbar />
        <Routes>
          <Route path="/collections" element={<NFTList />} />
          <Route path="/collections/:contractAddress" element={<FetchDisplayNfts />} />
          <Route path="/collections/:contractAddress/:tokenId" element={<NFTDetail />} />
        </Routes>
      </div>
    </Router>
  );
};

export default App;
