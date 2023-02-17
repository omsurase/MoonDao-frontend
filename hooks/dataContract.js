import { GATEWAY } from "@/constants/api.constants.jsx";
import { BigNumber, ethers } from "ethers";
import { DATAMARKET_CONTRACT } from "../contracts/listingContract.js";
import { getWalletDetails } from "./getAddress.hook.js";

// const getSigner = async () => {
//     await window.ethereum.enable();
//     const provider = new ethers.providers.Web3Provider(window.ethereum);
//     const signer = provider.getSigner();
//     return signer;
// };

// https://dapp-world.com/smartbook/how-to-use-ethers-with-fevm-k5Hn
export async function deployContract(
  signer,
  title,
  description,
  dataUrl,
  priceEVM,
  keywords,
  size
) {
  //   https://dev.to/yosi/deploy-a-smart-contract-with-ethersjs-28no

  const provider = new ethers.providers.Web3Provider(window.ethereum, "any");

  // Create an instance of a Contract Factory
  const factory = new ethers.ContractFactory(
    DATAMARKET_CONTRACT.abi,
    DATAMARKET_CONTRACT.data.bytecode,
    signer
  );

  // const validatedAddress = ethers.utils.getAddress(signerAddress);
  const priceWei = ethers.utils.parseUnits(priceEVM.toString(), "ether");

  // Start deployment, returning a promise that resolves to a contract object
  const contract = await factory.deploy(
    title,
    description,
    dataUrl,
    priceWei,
    new Date().toISOString(),
    keywords,
    size || ""
  );
  await contract.deployed();
  console.log(
    "Contract deployed to address:",
    contract.address,
    title,
    description,
    dataUrl,
    priceWei
  );
  console.log(GATEWAY + dataUrl);
  return contract;
}

export const validAddress = (addr) => {
  try {
    ethers.utils.getAddress(addr);
    return true;
  } catch (e) {
    return false;
  }
};

export const purchaseDataset = async (signer, contractAddress, price) => {
  if (!contractAddress) {
    throw Error("No contract address provided");
  }

  const dataContract = new ethers.Contract(
    contractAddress,
    DATAMARKET_CONTRACT.abi,
    signer
  );

  if (price < 1) {
    price = ethers.utils.parseUnits(price.toString(), "ether").toString();
  }
  console.log("purchase", price);

  const result = await dataContract.purchaseData({
    gasLimit: 1000000000,
    value: price,
  });
  return result;
};

export const getMetadata = async (signer, contractAddress) => {
  if (!contractAddress) {
    throw Error("No contract address provided");
  }

  if (signer) {
    const provider = new ethers.providers.Web3Provider(window.ethereum, "any");
    signer = provider.getSigner();
  }

  const dataContract = new ethers.Contract(
    contractAddress,
    DATAMARKET_CONTRACT.abi,
    signer
  );
  console.log("getMetadata", contractAddress);
  const result = await dataContract.getMetadataString();
  return result;
};

export const flagDataset = async (signer, contractAddress, reason) => {
  if (!contractAddress) {
    throw Error("No contract address provided");
  }

  if (!reason) {
    throw Error("reason is required");
  }

  const dataContract = new ethers.Contract(
    contractAddress,
    DATAMARKET_CONTRACT.abi,
    signer
  );
  const result = await dataContract.flagDataset(reason);
  return result;
};
