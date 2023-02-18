import Sidebar from "@/components/org2/Sidebar";
import UploadImage from "@/components/UploadImage";
import React from "react";
import { AiFillHome } from "react-icons/ai";
import { BsPersonPlusFill } from "react-icons/bs";
import { AiFillVideoCamera } from "react-icons/ai";
import { FaLaptopCode } from "react-icons/fa";
import { RiImageAddFill } from "react-icons/ri";
import { BsFolderFill } from "react-icons/bs";
import { BsCardList } from "react-icons/bs";

const SbtUpload = () => {
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
    <div className="flex flex-row">
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
      <UploadImage />
    </div>
  );
};

export default SbtUpload;
