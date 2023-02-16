import { ethers } from "ethers";

const getethAddress = async () => {
  if (!window.ethereum)
    throw new Error("No crypto wallet found. Please install it.");

  await window.ethereum.send("eth_requestAccounts");
  const provider = new ethers.providers.Web3Provider(window.ethereum);
  const signer = provider.getSigner();
  const address = await signer.getAddress();
  return address;
};
const getSigner = async () => {
  if (!window.ethereum)
    throw new Error("No crypto wallet found. Please install it.");

  await window.ethereum.send("eth_requestAccounts");
  const provider = new ethers.providers.Web3Provider(window.ethereum);
  const signer = provider.getSigner();
  const address = await signer.getAddress();
  return signer;
};

const getWalletDetails = async () => {
  if (!window.ethereum)
    throw new Error("No crypto wallet found. Please install it.");

  await window.ethereum.send("eth_requestAccounts");
  const provider = new ethers.providers.Web3Provider(window.ethereum);
  const signer = provider.getSigner();
  const address = await signer.getAddress();
  return { address, signer, provider };
};

export { getethAddress, getSigner, getWalletDetails };
