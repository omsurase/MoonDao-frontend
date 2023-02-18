import React from "react";
import LighthouseContainer from "../lighthouse/LighthouseContainer";
import HeroSection from "./HeroSection";
import OrgChats from "./OrgChats";

const MiddleSection = ({ org }) => {
  return (
    <div className="h-full min-h-screen bg-whoi">
      <HeroSection orgName={org?.orgName} tagline={org?.orgAddress} />
      <LighthouseContainer orgAddress={org?.orgAddress} />
      {/* <hr /> */}
      <OrgChats orgAddress={org?.orgAddress} />
    </div>
  );
};

export default MiddleSection;
