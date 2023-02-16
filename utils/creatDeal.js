import MarketAPI from "../contracts/MarketAPI.json";

import { ethers } from "ethers";

import { getMaxPriorityFeePerGas } from "./getMaxPriorityFeePerGas";

export async function createDeal(provider, signer, id, ipfsHash, endBlock) {
  let maxPriorityFee = await getMaxPriorityFeePerGas(provider);
  //   const { provider, signer } = getWalletDetails();
  const contract = new ethers.Contract(
    "0x94933a70ccffb17e9f41ac36e6fe4f5f70c9cbcb",
    MarketAPI,
    signer
  );
  console.log("contract", contract);
  await contract.create_mock(id, ipfsHash, endBlock, {
    gasLimit: 1000000000,
    maxPriorityFeePerGas: maxPriorityFee?.toString(),
  });
}
