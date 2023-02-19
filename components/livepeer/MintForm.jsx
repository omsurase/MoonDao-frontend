import { useEffect, useState } from "react";
import { mint } from "../../utils/mint";
import fetchStream from "@/api/livepeerstream.api";
import { Link } from "react-router-dom";
import HeroSection from "../org2/HeroSection";
import React from "react";
import { AiFillHome } from "react-icons/ai";
import { BsPersonPlusFill } from "react-icons/bs";
import { AiFillVideoCamera } from "react-icons/ai";
import { FaLaptopCode } from "react-icons/fa";
import { RiImageAddFill } from "react-icons/ri";
import { BsFolderFill } from "react-icons/bs";
import { BsCardList } from "react-icons/bs";
import Sidebar from "@/components/org2/Sidebar";


const MintForm = ({ setAppState, chainId, setMessage, setNftInfo }) => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [stream, setStream] = useState();

  const handleSubmit = (e) => {
    e.preventDefault()
    mint(chainId, title, { nftMetadata: { description, traits: { "author": "Rahat" } } }, setAppState, setMessage, setNftInfo)
  }
  useEffect(() => {
    const fetchStreamUpload = async () => {
      const stream = await fetchStream();
      setStream(stream);
    };
    fetchStreamUpload();
    // console.log(stream);
  }, [stream]);

  const downloadStream = (stream) => {
    console.log(stream);
    stream.mp4Url && window.open(stream.mp4Url, "_blank");
  }
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
    <div>

      <HeroSection orgName='DecaOrg NFT Minting 💎' />

      <div className="flex bg-[#EAFDFC] text-black h-screen justify-center textarea-info items-center box-border  p-4 border-4 ">
        <div className={` ${isOpen ? "w-1/6" : "w-1/12"} bg-[#EAFDFC]`}>
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
        <div className="p-4 m-10 border-2 border-indigo-500 rounded-lg">
          <h1 className='text-bold text-2xl text-center underline '>Previous Stream Recordings:</h1>
          {stream && stream.map((stream) => (
            <div key={stream.id} className="p-2 m-2 border-2 border-indigo-500 rounded-lg " onClick={() => {
              downloadStream(stream);
            }


            }>

              <h1>{stream.createdAt}</h1>

            </div>
          ))}
        </div>
        <form onSubmit={(e) => handleSubmit(e)}>
          <div className='flex flex-row p-4 m-4'>
            <h1 className="p-4 underline">Minted Using:</h1> <img src="../images/Livepeer.png" className='object-center' alt="livepeer" width="50" height="50" />
          </div>
          <div className="flex-column p-2" >
            <label>NFT Title</label>
            <input
              className="m-2 textarea textarea-info"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              type="text"
              name="title"
              required
            />
          </div>
          <div className="flex-column">
            <label className="align-top">Description</label>
            <textarea
              className="m-2 textarea textarea-info"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              type="text"
              name="description"
              rows="4"
              cols="50"
              required
            />
          </div>
          <button type="submit" className="file-input file-input-bordered file-input-primary w-full max-w-xs m-10">Choose Video and Mint</button>
        </form>
      </div>
    </div>
  );
};

export default MintForm;
