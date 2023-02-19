import React from "react";
import { useState } from "react";
import BridgeABI from "../../contracts/filecoin-maticBridge/ABI/TokenBridge.json";
import TokenABI from "../../contracts/filecoin-maticBridge/ABI/TokenABI.json";
import { MATIC_CHAIN_ID } from "@/constants/chainId.constants";
import { ethers } from "ethers";
import Web3 from "web3";
import { getWalletDetails } from "@/hooks/getAddress.hook";
const CrossChainBridge = () => {
  const [TokenAmount, setTokenAmount] = useState("");
  let a;
  const [nonce, setNonce] = useState(0);

  const changeNetwork = async () => {
    if (window?.ethereum.networkVersion !== MATIC_CHAIN_ID) {
      try {
        await window.ethereum.request({
          method: "wallet_switchEthereumChain",
          params: [{ chainId: Web3.utils.toHex(MATIC_CHAIN_ID) }],
        });
      } catch (err) {
        // This error code indicates that the chain has not been added to MetaMask
        console.log(err.code);
        if (err.code === 4902) {
          await window.ethereum.request({
            method: "wallet_addEthereumChain",
            params: [
              {
                chainName: "Polygon Mainnet",
                chainId: Web3.utils.toHex(MATIC_CHAIN_ID),
                nativeCurrency: {
                  name: "MATIC",
                  decimals: 18,
                  symbol: "MATIC",
                },
                rpcUrls: ["https://polygon-rpc.com/"],
              },
            ],
          });
        }
      }
    }
  };

  const crosschain = async () => {
    console.log(TokenAmount);
    const { address, signer } = await getWalletDetails();
    try {
      const bridgeContractFC = new ethers.Contract(
        "0x6dFA65048C6013378a122544224980789f96542E",
        BridgeABI,
        signer
      );

      //console.log(bridgeContractMATIC);

      const burn = await bridgeContractFC.burn(address, TokenAmount);
      console.log(burn.nonce);
      setTimeout(() => {
        const a = async () => {
          // await changeNetwork();

          setNonce(burn.nonce);
          console.log(address, burn.nonce);
        };
        a();
      }, 120000);
    } catch (error) {
      console.log(error);
    }
  };
  const crosschainmint = async () => {
    const { address, signer } = await getWalletDetails();

    console.log("hi");

    //console.log(bridgeContractFC);
    const bridgeContractMATIC = new ethers.Contract(
      "0xAd3EDd9eB29Cc351988C45C524f743EccE9aEabA",
      BridgeABI,
      signer
    );
    const mint2 = await bridgeContractMATIC.mint(address, TokenAmount, nonce);
    console.log(mint2);
  };

  return (
    <div>
      <input
        type="text"
        placeholder="Token amount"
        className="input input-bordered input-secondary w-full"
        onChange={(e) => setTokenAmount(e.target.value)}
      />
      <div class="text-sm breadcrumbs mx-auto w-fit mt-5 text-white mt-4">
        <ul>
          <li>
            <button
              className="btn btn-active btn-primary"
              onClick={() => {
                crosschain();
              }}
            >
              Submit tokens
            </button>
          </li>
          <li>
            <button
              className="btn btn-active btn-primary"
              onClick={() => {
                changeNetwork();
              }}
            >
              Change network
            </button>
          </li>
          <li>
            <button
              className="btn btn-active btn-primary"
              onClick={() => {
                crosschainmint();
              }}
            >
              Mint tokens
            </button>
          </li>
        </ul>
      </div>

      {/* <button
        className="btn btn-active btn-primary"
        onClick={() => {
          crosschain();
        }}
      >
        Button
      </button>
      <button
        className="btn btn-active btn-primary"
        onClick={() => {
          crosschainmint();
        }}
      >
        Button2
      </button> */}
    </div>
  );
};

export default CrossChainBridge;
