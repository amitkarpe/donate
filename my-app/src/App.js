// https://www.coingecko.com/en/coins/usd-coin
// USDC Polygon Token address: 0x2791bca1f2de4661ed88a30c99a7a9449aa84174
// https://polygonscan.com/address/0x2791bca1f2de4661ed88a30c99a7a9449aa84174#code
import React from 'react';
import './App.css';
// import SendUSDC from './SendUSDC';
import SendUSDC from './SendUSDC2';

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <SendUSDC />
      </header>
    </div>
  );
}

export default App;
