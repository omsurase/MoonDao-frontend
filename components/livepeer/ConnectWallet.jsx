import { ethers } from "ethers";

export default function ConnectWallet({ setChainId, setAddress }) {
  const handleWalletConnect = async () => {
    const { ethereum } = window;
    if (ethereum) {
      const provider = new ethers.providers.Web3Provider(ethereum);
      await provider.send("eth_requestAccounts", []);
      const signer = provider.getSigner();
      const address = await signer.getAddress();
      setAddress(address);
      const { chainId } = await provider.getNetwork();
      setChainId(chainId);
    } else {
      alert("No Wallet Detected");
    }
  };
  return (
    <div className="flex h-screen justify-center items-center">
        <button className="btn btn-primary btn-xs sm:btn-sm md:btn-md  "
        onClick={() => handleWalletConnect()}>Connect Wallet</button>
        </div>
  );
}
