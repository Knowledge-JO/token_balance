import { ethers } from "ethers";
import { tokenABI } from "./ABI";
import { useEffect, useState } from "react";
const tokenAddress = "0xa8524f873D1bcD0F1AD783416c82E32Bc58fFa77";

function App() {
  const [ETHBal, setETHBal] = useState<number | null>(null);
  const [tokenBal, setTokenBal] = useState<number | null>(null);

  useEffect(() => {
    const getBalances = async () => {
      //
    };

    getBalances();
  }, []);
  return (
    <div>
      <p>ETH balance: {ETHBal == null ? "Loading..." : ETHBal}</p>
      <p>Token balance: {tokenBal == null ? "Loading..." : tokenBal}</p>
    </div>
  );
}

export default App;
