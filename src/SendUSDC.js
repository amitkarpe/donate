// SendUSDC.js
import React, { useState } from 'react';
// import { ethers, Contract, providers, utils } from 'ethers';
// import { ethers, Contract, providers, utils } from 'ethers';
import { ethers } from "ethers";


const IERC20_ABI = [
  {
    "constant": true,
    "inputs": [
      {
        "name": "_owner",
        "type": "address"
      }
    ],
    "name": "balanceOf",
    "outputs": [
      {
        "name": "balance",
        "type": "uint256"
      }
    ],
    "payable": false,
    "stateMutability": "view",
    "type": "function"
  },
  {
    "constant": false,
    "inputs": [
      {
        "name": "_to",
        "type": "address"
      },
      {
        "name": "_value",
        "type": "uint256"
      }
    ],
    "name": "transfer",
    "outputs": [
      {
        "name": "",
        "type": "bool"
      }
    ],
    "payable": false,
    "stateMutability": "nonpayable",
    "type": "function"
  }
];

const USDC_ADDRESS = '0x2791Bca1f2de4661ED88A30C99A7a9449Aa84174'; // USDC on Polygon
const RECIPIENT_ADDRESS = '0x6f5c9993c98C7a0171BD3EF0E6EeEB9d64DCB39F';

const SendUSDC = () => {
  const [status, setStatus] = useState('');

  const sendUSDC = async () => {
    if (typeof window.ethereum === 'undefined') {
      setStatus('MetaMask is not installed!');
      return;
    }
    try {
      // Request account access if needed
      await window.ethereum.request({ method: 'eth_requestAccounts' });
    } catch (err) {
      setStatus('MetaMask connection failed!');
      console.error(err);
      return;
    }

    const provider = new ethers.providers.Web3Provider(window.ethereum);
    const signer = provider.getSigner();

    const erc20Token = new ethers.Contract(USDC_ADDRESS, IERC20_ABI, signer);

    const decimals = 6;
    const amount = ethers.utils.parseUnits('1', decimals);

    setStatus('Sending transaction...');
    try {
      const tx = await erc20Token.transfer(RECIPIENT_ADDRESS, amount);
      await tx.wait();
      setStatus('Transaction sent!');
    } catch (err) {
      console.error(err);
      setStatus('Transaction failed!');
    }
  };

  return (
    <div>
      <button onClick={sendUSDC}>Send 1 USDC</button>
      <p>{status}</p>
    </div>
  );
};

export default SendUSDC;
