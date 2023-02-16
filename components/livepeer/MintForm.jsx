import { useEffect, useState } from "react";
import { mint } from "../../utils/mint";
import fetchStream from "@/api/livepeerstream.api";
import { Link } from "react-router-dom";
import HeroSection from "../org/HeroSection";

const MintForm = ({ setAppState, chainId, setMessage, setNftInfo }) => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [stream, setStream] = useState();
  
  const handleSubmit = (e) => {
      e.preventDefault()
      mint(chainId, title, { nftMetadata: {description, traits: { "author": "Rahat"}}}, setAppState, setMessage, setNftInfo)
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

  return (
    <div>
      <HeroSection orgName='DecaOrg NFT Minting 💎'/>
      
    <div className="flex h-screen justify-center textarea-info items-center box-border  p-4 border-4 ">
      <div className="p-4 m-10 border-2 border-indigo-500 rounded-lg">
      <h1 className='text-bold text-2xl text-center underline '>Previous Stream Recordings:</h1>
        {stream && stream.map((stream) => (
          <div key={stream.id} className="p-2 m-2 border-2 border-indigo-500 rounded-lg " onClick={() => 
            {
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
