import React from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import NFTList from './components/Collections';
import NFTDetail from './scrapfunc/NFTDetail';
import FetchDisplayNfts from './scrapfunc/FetchDisplayNfts';
import './App.css';

const App = () => {
  return (
    <Router>
      <div>
        <nav>
          <ul>
            <li>
              <Link to="/collections">Home</Link>
            </li>
          </ul>
        </nav>

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
