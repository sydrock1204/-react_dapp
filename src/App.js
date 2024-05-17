import { useState } from "react";
import { ethers } from "ethers";
import CounterContract from "./artifacts/contracts/Counter.sol/Counter.json";
import "./App.css";

const contractAddress = "0x19671D163B76D880ecDBB45b0f836af0373e7600";
const abi = CounterContract.abi;

function App() {
  const [connectButton, setConnectButton] = useState("Connect");
  const [count, setCount] = useState("");

  const handleConnect = async () => {
    if (typeof window.ethereum != "undefined") {
      await window.ethereum.request({ method: "eth_requestAccounts" });
      setConnectButton("Connected!");
    } else {
      setConnectButton("Please install Metamask");
    }
  };

  const getCount = async () => {
    if (typeof window.ethereum != "undefined") {
      // connnect to blockchain to provider
      const provider = new ethers.providers.Web3Provider(window.ethereum);
      // interacting user account/signer - current metamask account
      const signer = provider.getSigner();
      // interacting contract abi and address
      const contract = new ethers.Contract(contractAddress, abi, signer);
      try {
        const data = await contract.get();
        console.log("dat a: ", data.toString());
        setCount(data.toString());
      } catch (err) {
        console.log(err);
      }
    }
  };

  const handleInc = async () => {
    if (typeof window.ethereum != "undefined") {
      // connnect to blockchain to provider
      const provider = new ethers.providers.Web3Provider(window.ethereum);
      // interacting user account/signer - current metamask account
      const signer = provider.getSigner();
      // interacting contract abi and address
      const contract = new ethers.Contract(contractAddress, abi, signer);
      try {
        const tx = await contract.inc();
        await tx.wait();
        // console.log("dat a: ", data.toString());
        getCount();
      } catch (err) {
        console.log(err);
      }
    }
  };

  const handleDec = async () => {
    if (typeof window.ethereum != "undefined") {
      // connnect to blockchain to provider
      const provider = new ethers.providers.Web3Provider(window.ethereum);
      // interacting user account/signer - current metamask account
      const signer = provider.getSigner();
      // interacting contract abi and address
      const contract = new ethers.Contract(contractAddress, abi, signer);
      try {
        const tx = await contract.dec();
        tx.wait();
        // console.log("dat a: ", data.toString());
        getCount();
      } catch (err) {
        console.log(err);
      }
    }
  };

  return (
    <div>
      <button onClick={handleConnect}>{connectButton}</button>
      <button onClick={getCount}>Get count</button>
      <button onClick={handleInc}>Increment</button>
      <button onClick={handleDec}>Decrement</button>
      <hr />
      <h1>Count: {count}</h1>
    </div>
  );
}

export default App;
