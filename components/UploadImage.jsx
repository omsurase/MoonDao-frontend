import React, { useEffect } from "react";
import { useState } from "react";
// import { ipfsClient } from "@/constants/api.constants";
import AxiosJsInstance from "@/hooks/AxiosInstance";
import { NFTStorage } from "nft.storage";
import axios from "axios";
import { GATEWAY } from "@/constants/api.constants";
import { mintSBT } from "@/hooks/SbtMintHook";
import { createDeal } from "../utils/creatDeal";
import Link from "next/link";
import { getWalletDetails } from "@/hooks/getAddress.hook";


const UploadImage = () => {
  const [image, setImage] = useState(null);
  const [imgUrl, setImgUrl] = useState(null);
  const [mintUrl, setMintUrl] = useState(null);
  const [name, setName] = useState("");
  const [desc, setDesc] = useState("");
  const [receiverEthAddress, setReceiverEthAddress] = useState("");
  const [provider, setProvider] = useState(null);
  const [signer, setSigner] = useState(null);
  useEffect(() => {
    const getdetails = async () => {
      const { provider, signer } = await getWalletDetails();
      setProvider(provider);
      setSigner(signer);
    };
    getdetails();
  }, []);
  const retrieveFile = (e) => {
    const file = e.target.files[0];
    setImage(file);
    console.log(file);
    e.preventDefault();
  };
  const handleSubmit = async () => {
    console.log(image);
    const client = new NFTStorage({
      token:
        "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiJkaWQ6ZXRocjoweDg0MWI1RGRjMGU4MWI4QUYyZWI0NURBN0QzMTAzNjNjNTk1RTY1MTciLCJpc3MiOiJuZnQtc3RvcmFnZSIsImlhdCI6MTY3NDkwOTY5NDAzMiwibmFtZSI6ImRlY2Etb3JnIn0.GlZgUARw9EP_pA9fin75GdDIlLmk_b6uR-QM5G4bs-k",
    });
    const metadata = await client.store({
      name: name,
      description: desc,
      image: image,
    });
    console.log(provider, signer);
    console.log(metadata);
    const metadataURL = GATEWAY + metadata.ipnft + "/metadata.json";
    const ipfsHash = metadata.ipnft + "/metadata.json";
    let dealId = Math.floor(Math.random() * 10000);
    alert("Creating a storage deal with filecoin...");
    await createDeal(
      provider,
      signer,
      dealId,
      ipfsHash,
      1000_000
    );
    const { data } = await axios.get(metadataURL);
    console.log(data);
    console.log(GATEWAY + data.image.slice(7));
    setImgUrl(GATEWAY + data.image.slice(7));
    setMintUrl(metadata.url);
    await mintSBT(mintUrl, receiverEthAddress);

  };

  return (
    <div>
      <div className="w-full w-3/4 mx-auto mt-5">
        <form className="bg-base-200 shadow-md rounded px-8 pt-6 pb-8 mb-4">
          <div className="mb-4">
            <label
              className="block text-gray-700 text-sm font-bold mb-2"
              htmlFor="username"
            >
              Name of NFT
            </label>
            <input
              className="shadow appearance-none border rounded w-full py-2 px-3 text leading-tight focus:outline-none focus:shadow-outline"
              id="name"
              type="text"
              placeholder="name"
              onChange={(e) => setName(e.target.value)}
            />
          </div>
          <div className="mb-6">
            <label
              className="block text-gray-700 text-sm font-bold mb-2"
              htmlFor="desc"
            >
              Description
            </label>
            <input
              className="shadow appearance-none border rounded w-full py-2 px-3 text leading-tight focus:outline-none focus:shadow-outline"
              placeholder="NFT description"
              onChange={(e) => setDesc(e.target.value)}
            />
            <p className="text-red-500 text-xs italic">
              Enter description for NFT
            </p>
          </div>
          <div className="mb-6">
            <label
              className="block text-gray-700 text-sm font-bold mb-2"
              htmlFor="desc"
            >
              Receiver Eth address
            </label>
            <input
              className="shadow appearance-none border border-red-500 rounded w-full py-2 px-3 text-gray-100 mb-3 leading-tight focus:outline-none focus:shadow-outline"
              placeholder="Receiver address"
              onChange={(e) => setReceiverEthAddress(e.target.value)}
            />
            <p className="text-red-500 text-xs italic">
              Ethereum address of receiver
            </p>
          </div>
          <div className="flex items-center justify-between">
            <input type="file" name="file" onChange={retrieveFile} />
            <button
              onClick={() => {
                handleSubmit();
              }}
              className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
              type="button"
            >
              Mint NFT
            </button>
          </div>
        </form>
      </div>

      {/* <form className="form">
        <input type="file" name="file" onChange={retrieveFile} />
        <button
          type="submit"
          className="btn"
          onClick={() => {
            mintSBT();
          }}
        >
          Upload file
        </button>
      </form> */}
      <div className="w-fit mx-auto">
        {imgUrl && (
          <div className="mx-auto">
            <Link href={imgUrl}>SBT link</Link>
            <img src={imgUrl} alt="uploaded" />
          </div>
        )}
      </div>
    </div>
  );
};

export default UploadImage;
