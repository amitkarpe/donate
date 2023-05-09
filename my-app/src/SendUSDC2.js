import React, { useEffect, useState } from "react";
import { ethers } from "ethers";
import { abi } from "./abi";

let USDC = "0x2791Bca1f2de4661ED88A30C99A7a9449Aa84174";

const options = [
  { label: "Invest in Focus 5", address: "0x22dA1eEdeBC60C1b8c3a0c48f5C81BBE2b943dD9" },
  { label: "Invest in Focus 10", address: "0xbc63219a3a5453db9ccd7096c6009c1ed4e69b45" },
];

function App() {
  const [ethersProvider, setEthersProvider] = useState();
  const [contract, setContract] = useState();
  const [balance, setBalance] = useState(0);
  const [amount, setAmount] = useState(0);
  const [loading, setLoading] = useState(false);
  const [signer, setSigner] = useState();
  const [selectedOption, setSelectedOption] = useState(options[0]);

  useEffect(() => {
    (async () => {
      await window.ethereum.enable();
      const provider = new ethers.providers.Web3Provider(window.ethereum, "any");
      const signer = provider.getSigner();
      const contract = new ethers.Contract(USDC, abi, signer);
      setEthersProvider(provider);
      setContract(contract);
      setSigner(signer);
    })();
  }, []);

  useEffect(() => {
    (async () => {
      if (contract && signer) {
        const connectedWalletAddress = await signer.getAddress();
        const balance = await contract.balanceOf(connectedWalletAddress);
        const newbalance = parseFloat(balance) / Math.pow(10, 6);
        setBalance(newbalance.toString());
      }
    })();
  }, [contract, signer]);

  const send = async () => {
    setLoading(true);
    const tx = await contract.transfer(selectedOption.address, ethers.utils.parseUnits(amount, 6));
    await tx.wait();
    setLoading(false);
  };

  const handleOptionChange = (e) => {
    const selected = options.find((option) => option.label === e.target.value);
    setSelectedOption(selected);
  };

  return (
    <div className="App">
      <div>Balance: {balance}</div>
      <div>
        <label>Investment Option</label>
        <select value={selectedOption.label} onChange={handleOptionChange}>
          {options.map((option, index) => (
            <option key={index} value={option.label}>
              {option.label}
            </option>
          ))}
        </select>
      </div>
      <div>
        <label>Amount</label>
        <input type="text" value={amount} onChange={(e) => setAmount(e.target.value)} />
      </div>
      <button onClick={send} disabled={loading}>
        Send
      </button>
    </div>
  );
}

export default App;
