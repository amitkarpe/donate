import React, { useEffect, useState } from "react";
import { ethers } from "ethers";
import { abi } from "./abi";

let USDC = "0x2791Bca1f2de4661ED88A30C99A7a9449Aa84174";

function App() {
  const [ethersProvider, setEthersProvider] = useState();
  const [contract, setContract] = useState();
  const [balance, setBalance] = useState(0);
  const [address, setAddress] = useState("");
  const [amount, setAmount] = useState(0);
  const [loading, setLoading] = useState(false);
  const [signer, setSigner] = useState();
  const [selectedMessage, setSelectedMessage] = useState("");

  useEffect(() => {
    (async () => {
      await window.ethereum.enable();
      const provider = new ethers.providers.Web3Provider(window.ethereum, "any");
      const signer = provider.getSigner();
      const contract = new ethers.Contract(
        USDC,
        abi,
        signer
      );
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

  const handleMessageChange = (e) => {
    setSelectedMessage(e.target.value);
  };

  const send = async () => {
    setLoading(true);
    console.log("Sending message:", selectedMessage);
    // Your logic to send the message
    const tx = await contract.transfer(address, ethers.utils.parseUnits(amount, 6));
    await tx.wait();
    setLoading(false);
  };

  return (
    <div className="App">
      <div>Balance: {balance}</div>
      <div>
        <label>Address</label>
        <input
          type="text"
          value={address}
          onChange={(e) => setAddress(e.target.value)}
        />
      </div>
      <div>
        <label>Amount</label>
        <input type="text" value={amount} onChange={(e) => setAmount(e.target.value)} />
      </div>
      <div>
        <label>Message</label>
        <select value={selectedMessage} onChange={handleMessageChange}>
          <option value="">Select a message</option>
          <option value="Invest in Focus 5">Invest in Focus 5</option>
          <option value="Invest in Focus 10">Invest in Focus 10</option>
          <option value="Invest in Focus 20">Invest in Focus 20</option>
          <option value="Invest in Focus 100">Invest in Focus 100</option>
          <option value="Invest best fund">Invest best fund</option>
        </select>
      </div>
      <button onClick={send} disabled={loading}>
        Send
      </button>
    </div>
  );
}

export default App;
