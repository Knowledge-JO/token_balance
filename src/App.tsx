import { client } from "./client";
import {
  ConnectButton,
  useActiveAccount,
  useWalletBalance,
  useReadContract,
} from "thirdweb/react";
import { base } from "thirdweb/chains";
import { getContract } from "thirdweb";
// import { tokenABI } from "./ABI";

// base
const tokenAddress = "0xa8524f873D1bcD0F1AD783416c82E32Bc58fFa77";
const contract = getContract({
  client,
  address: tokenAddress,
  chain: base,
});

function App() {
  const account = useActiveAccount();
  const { data: balance, isLoading } = useWalletBalance({
    client,
    chain: base,
    address: account?.address,
  });

  const { data, isLoading: loadingTokenBalance } = useReadContract({
    contract,
    method: "function balanceOf(address account) returns (uint256)",
    params: [account?.address || ""], // type safe params
  });
  return (
    <div>
      <ConnectButton client={client} />
      <p>
        ETH balance:
        {`${isLoading ? "loading..." : ` ${balance?.displayValue || 0} `}`}
      </p>
      <p>
        Token balance: {`${loadingTokenBalance ? "loading..." : Number(data)}`}{" "}
      </p>
    </div>
  );
}

export default App;
