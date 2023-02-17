import React from "react";
import HeroSection from "./HeroSection";

const MiddleSection = ({ org }) => {
  return (
    <div>
      <HeroSection orgName={org?.orgName} tagline={org?.orgAddress} />
    </div>
  );
};

export default MiddleSection;
