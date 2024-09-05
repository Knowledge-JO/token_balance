import { ethers } from "ethers";
import { tokenABI } from "./ABI";
import { useEffect, useState } from "react";
const tokenAddress = "0xa8524f873D1bcD0F1AD783416c82E32Bc58fFa77";

function App() {
  const [ETHBal, setETHBal] = useState<number | null>(null);
  const [tokenBal, setTokenBal] = useState<number | null>(null);
  const [userAddr, setUserAddr] = useState<string>();
  useEffect(() => {
    const getBalances = async () => {
      const provider = await handleConnect();
      if (!provider) return alert("Could not connect");
      const userAddress = (await provider.signer).address;
      setUserAddr(userAddress);
      const ethbalance = await provider.provider.getBalance(userAddress);
      setETHBal(Number(ethbalance));
      const contract = new ethers.Contract(
        tokenAddress,
        tokenABI,
        provider.provider
      );

      const tokenBalance = await contract.balanceOf(userAddress);
      console.log("token balance", tokenBalance);
      setTokenBal(Number(tokenBalance));
    };

    getBalances();
  }, []);

  const handleConnect = async () => {
    if (window.ethereum) {
      const provider = new ethers.BrowserProvider(window.ethereum);
      await provider.send("eth_requestAccounts", []);
      const signer = provider.getSigner();
      return { provider, signer };
    } else {
      alert("Install metamask");
    }
  };

  function truncAddr(addr: string) {
    const firstPart = addr.slice(0, 5);
    const secondPart = addr.slice(addr.length - 5, addr.length);
    return `${firstPart}...${secondPart}`;
  }
  return (
    <div>
      <button onClick={handleConnect}>
        {userAddr ? truncAddr(userAddr) : "Connect wallet"}
      </button>
      <p>ETH balance: {ETHBal == null ? "Loading..." : ETHBal}</p>
      <p>Token balance: {tokenBal == null ? "Loading..." : tokenBal}</p>
    </div>
  );
}

export default App;
