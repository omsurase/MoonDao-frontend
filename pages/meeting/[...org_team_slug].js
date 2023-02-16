import Meeting from "@/components/huddle/Meeting";
import MeetRoom from "@/components/huddle/MeetRoom";
import { useRouter } from "next/router";
import { ethers } from "ethers";
import { useEffect, useState} from "react";
import 'regenerator-runtime/runtime';


import React from "react";

const MeetingPage = () => {

  const [ethAddress, setethAddress] = useState('');

  const getAddress = async () => {
    if (!window.ethereum)
      throw new Error("No crypto wallet found. Please install it.");

    await window.ethereum.send("eth_requestAccounts");
    const provider = new ethers.providers.Web3Provider(window.ethereum);
    const signer = provider.getSigner();
    const address = await signer.getAddress();
    setethAddress(address);
  };
  useEffect(() => {
    getAddress();
  }, []);
  
 
  
  const router = useRouter();
  const meetId = router.query.org_team_slug?.join("_");
  return <div className="flex flex-col  bg-base-300  min-h-screen py-2">
    <h1>
        {/* {meetId} */}
        {/* <Meeting currentRoomId={meetId} /> */}
        <MeetRoom currentRoomId={meetId} ethAddress={ethAddress} />
        
    </h1>
  </div>;
};

export default MeetingPage;
