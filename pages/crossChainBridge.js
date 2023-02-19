import CrossChainBridge from "@/components/crosschainbridge/CrossChainBridge";
import DragDropFiles from "@/components/DragDropFiles";
import React from "react";
import { useState, useEffect } from "react";
import { getWalletDetails } from "@/hooks/getAddress.hook";
import { NFTStorage } from "nft.storage";
import { GATEWAY } from "@/constants/api.constants";
import axios from "axios";
import { deployContract } from "../hooks/dataContract";
import Link from "next/link";
import { AiFillHome } from "react-icons/ai";
import { BsPersonPlusFill } from "react-icons/bs";
import { AiFillVideoCamera } from "react-icons/ai";
import { FaLaptopCode } from "react-icons/fa";
import { RiImageAddFill } from "react-icons/ri";
import { BsFolderFill } from "react-icons/bs";
import { BsCardList } from "react-icons/bs";
import Sidebar from "@/components/org2/Sidebar";

const SbtUpload = () => {
  const [image, setImage] = useState(null);
  const [file, setFile] = useState(null);
  const [event, setEvent] = React.useState(null);
  const [fileUrl, setFileUrl] = useState(null);
  const [mintUrl, setMintUrl] = useState(null);
  const [name, setName] = useState("");
  const [desc, setDesc] = useState("");
  const [Keywords, setKeywords] = useState("");
  const [receiverEthAddress, setReceiverEthAddress] = useState("");
  const [provider, setProvider] = useState(null);
  const [signer, setSigner] = useState(null);
  const [price, setPrice] = useState(0);
  const [contract, setContract] = useState();

  useEffect(() => {
    const getdetails = async () => {
      const { provider, signer } = await getWalletDetails();
      setProvider(provider);
      setSigner(signer);
    };
    getdetails();
  }, []);

  const handleSubmit = async () => {
    //console.log(image);
    const client = new NFTStorage({
      token:
        "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiJkaWQ6ZXRocjoweDg0MWI1RGRjMGU4MWI4QUYyZWI0NURBN0QzMTAzNjNjNTk1RTY1MTciLCJpc3MiOiJuZnQtc3RvcmFnZSIsImlhdCI6MTY3NDkwOTY5NDAzMiwibmFtZSI6ImRlY2Etb3JnIn0.GlZgUARw9EP_pA9fin75GdDIlLmk_b6uR-QM5G4bs-k",
    });
    const metadata = await client.store({
      name: name,
      description: desc,
      image: file,
    });
    //console.log(provider, signer);
    console.log(metadata);
    const metadataURL = GATEWAY + metadata.ipnft + "/metadata.json";
    const ipfsHash = metadata.ipnft + "/metadata.json";
    console.log(metadataURL);
    const { data } = await axios.get(metadataURL);
    console.log(data);
    console.log(GATEWAY + data.image.slice(7));
    setFileUrl(GATEWAY + data.image.slice(7));
    setMintUrl(metadata.url);
    console.log(metadata.url);
    //await mintSBT(mintUrl, receiverEthAddress);
    const contract1 = await deployContract(
      signer,
      name,
      desc,
      metadata.url.slice(6),
      price,
      Keywords
    );
    setContract(contract1);
  };
  const [isOpen, setIsOpen] = React.useState(true);
  const sidebarOptions = [
    {
      title: "Home",
      icon: <AiFillHome />,
      link: "/org/" + "my_org",
    },
    {
      title: "Add a member",
      icon: <BsPersonPlusFill />,
      link: "/sbt",
    },
    {
      title: "Start A LiveStream",
      icon: <AiFillVideoCamera />,
      link: "/stream/" + "my_org",
    },
    {
      title: "Start a meeting",
      icon: <FaLaptopCode />,
      link: "/meeting/" + "my_org",
    },
    {
      title: "Mint Your Video NFT",
      icon: <RiImageAddFill />,
      link: "/mint/" + "my_org",
    },
    {
      title: "My Video Assets",
      icon: <BsFolderFill />,
      link: "/upload/" + "my_org",
    },
    {
      title: "Create listing",
      icon: <BsCardList />,
      link: "/crossChainBridge",
    },
  ];

  return (
    <div className="flex flex-row h-full">
      <div
        className={`min-h-screen h-max ${
          isOpen ? "w-1/6" : "w-1/12"
        } bg-[#EAFDFC]`}
      >
        {" "}
        {isOpen ? (
          // close button
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="btn w-fit mx-auto my-2 flex flex-row justify-center items-center"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-8 w-8 text-white"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M6 18L18 6M6 6l12 12"
              />
            </svg>
          </button>
        ) : (
          // open button
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="btn w-fit mx-auto my-2 flex flex-row justify-center items-center"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-8 w-8 text-white"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M4 6h16M4 12h16M4 18h16"
              />
            </svg>
          </button>
        )}
        <Sidebar
          options={sidebarOptions}
          isOpen={isOpen}
          setIsOpen={setIsOpen}
        />{" "}
      </div>
      <div className="bg-gray-100 h-screen w-screen">
        <div className="min-h-3/4 bg-gray-100 py-6 flex flex-col justify-center sm:py-12">
          <div className="relative py-3 sm:max-w-xl sm:mx-auto">
            <div className="absolute inset-0 bg-gradient-to-r from-blue-300 to-blue-600 shadow-lg transform -skew-y-6 sm:skew-y-0 sm:-rotate-6 sm:rounded-3xl"></div>
            <div className="relative px-4 py-10 bg-white shadow-lg sm:rounded-3xl sm:p-20">
              <div className="max-w-md mx-auto">
                <div>
                  <h1 className="text-2xl font-semibold text-black">
                    Enter the following details
                  </h1>
                </div>
                <div className="divide-y divide-gray-200">
                  <div className="py-8 text-base leading-6 space-y-4 text-white sm:text-lg sm:leading-7">
                    <div className="relative">
                      <input
                        autocomplete="off"
                        id="name"
                        name="name"
                        type="text"
                        className="peer placeholder-transparent h-10 w-full border-b-2 border-gray-300 text-white focus:outline-none focus:borer-rose-600"
                        placeholder="Your name"
                        onChange={(e) => {
                          setName(e.target.value);
                        }}
                      />
                      <label
                        for="email"
                        className="absolute left-0 -top-3.5 text-gray-200 mx-2 text-sm peer-placeholder-shown:text-base peer-placeholder-shown:text-gray-440 peer-placeholder-shown:top-2 transition-all peer-focus:-top-3.5 peer-focus:text-gray-200 mx-2 peer-focus:text-sm"
                      >
                        Your name
                      </label>
                    </div>
                    <div className="relative">
                      <input
                        autocomplete="off"
                        id="description"
                        name="description"
                        type="description"
                        className="peer placeholder-transparent h-10 w-full border-b-2 border-gray-300 text-white focus:outline-none focus:borer-rose-600"
                        placeholder="description"
                        onChange={(e) => {
                          setDesc(e.target.value);
                        }}
                      />
                      <label
                        for="description"
                        className="absolute left-0 -top-3.5 text-gray-200 mx-2 text-sm peer-placeholder-shown:text-base peer-placeholder-shown:text-gray-440 peer-placeholder-shown:top-2 transition-all peer-focus:-top-3.5 peer-focus:text-gray-200 mx-2 peer-focus:text-sm"
                      >
                        description
                      </label>
                    </div>
                    <div className="relative">
                      <input
                        autocomplete="off"
                        id="Price"
                        name="Price"
                        type="Price"
                        className="peer placeholder-transparent h-10 w-full border-b-2 border-gray-300 text-white focus:outline-none focus:borer-rose-600"
                        placeholder="Price"
                        onChange={(e) => {
                          setPrice(e.target.value);
                        }}
                      />
                      <label
                        for="Price"
                        className="absolute left-0 -top-3.5 text-gray-200 mx-2 text-sm peer-placeholder-shown:text-base peer-placeholder-shown:text-gray-440 peer-placeholder-shown:top-2 transition-all peer-focus:-top-3.5 peer-focus:text-gray-200 mx-2 peer-focus:text-sm"
                      >
                        Price
                      </label>
                    </div>
                    <div className="relative">
                      <input
                        autocomplete="off"
                        id="description"
                        name="description"
                        type="description"
                        className="peer placeholder-transparent h-10 w-full border-b-2 border-gray-300 text-white focus:outline-none focus:borer-rose-600"
                        placeholder="description"
                        onChange={(e) => {
                          setKeywords(e.target.value);
                        }}
                      />
                      <label
                        for="Keywords"
                        className="absolute left-0 -top-3.5 text-gray-200 mx-2 text-sm peer-placeholder-shown:text-base peer-placeholder-shown:text-gray-440 peer-placeholder-shown:top-2 transition-all peer-focus:-top-3.5 peer-focus:text-gray-200 mx-2 peer-focus:text-sm"
                      >
                        Keywords
                      </label>
                    </div>
                    <div className="relative">
                      <button
                        className="bg-blue-500 text-white rounded-md px-2 py-1"
                        onClick={handleSubmit}
                      >
                        Submit
                      </button>
                    </div>
                  </div>
                  <DragDropFiles
                    setFile={setFile}
                    file={file}
                    setEvent={setEvent}
                  />
                  <div className="m-4">
                    <hr />
                    {contract && (
                      <Link
                        href={
                          contract.address
                            ? "listings/" + contract.address
                            : "/"
                        }
                        className="link my-2 text-center text-success font-bold"
                      >
                        {" "}
                        Checkout your listing here!
                      </Link>
                    )}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SbtUpload;
