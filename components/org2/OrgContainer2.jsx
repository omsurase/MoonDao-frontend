import React, { useEffect } from "react";
import OrgChat from "./OrgChats";
import Link from "next/link";
import { useRouter } from "next/router";
import { APP_DOMAIN } from "@/constants/app.constants";
import { getOrganization } from "@/api/org.api";
import OrgMembers from "./OrgMembers";
import { getethAddress } from "@/hooks/getAddress.hook";

import Sidebar from "./Sidebar";
import MiddleSection from "./MiddleSection";
import { AiFillHome } from "react-icons/ai";
import { BsPersonPlusFill } from "react-icons/bs";
import { AiFillVideoCamera } from "react-icons/ai";
import { FaLaptopCode } from "react-icons/fa";
import { RiImageAddFill } from "react-icons/ri";
import { BsFolderFill } from "react-icons/bs";

const OrgContainer2 = ({ orgName }) => {
  const [team, setTeam] = React.useState([]);
  const [meetLink, setMeetLink] = React.useState("");
  const router = useRouter();
  const [org, setOrg] = React.useState();
  const [myAddress, setMyAddress] = React.useState();
  const [isOpen, setIsOpen] = React.useState(true);

  const sidebarOptions = [
    {
      title: "Home",
      icon: <AiFillHome />,
      link: "/org/" + orgName,
    },
    {
      title: "Add a member",
      icon: <BsPersonPlusFill />,
      link: "/sbt",
    },
    {
      title: "Start A LiveStream",
      icon: <AiFillVideoCamera />,
      link: "/stream/" + orgName,
    },
    {
      title: "Start a meeting",
      icon: <FaLaptopCode />,
      link: "/meeting/" + orgName,
    },
    {
      title: "Mint Your Video NFT",
      icon: <RiImageAddFill />,
      link: "/mint/" + orgName,
    },
    {
      title: "My Video Assets",
      icon: <BsFolderFill />,
      link: "/upload/" + orgName,
    },
  ];

  const getOrgs = async () => {
    if (orgName) {
      const org = await getOrganization(orgName);
      if (org) {
        setOrg(org);
        setTeam(org.team);
      }
    }
  };
  useEffect(() => {
    getOrgs();
  }, [orgName]);

  useEffect(() => {
    const setAddress = async () => {
      const address = await getethAddress();
      setMyAddress(address);
    };
    setAddress();
  });
  return (
    <div className="bg-white flex flex-row h-max w-screen">
      <div className={`${isOpen ? "w-1/6" : "w-1/12"} bg-[#EAFDFC]`}>
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
      <div className="w-full bg-green">
        <MiddleSection org={org} />
      </div>
      <div className="w-1/3 bg-[#f6f4f6]">
        <OrgMembers members={org?.members} />
      </div>
    </div>
  );
};

export default OrgContainer2;
