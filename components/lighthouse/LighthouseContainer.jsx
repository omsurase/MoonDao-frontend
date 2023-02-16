import React from "react";
import FileDecrypt from "./FileDecrypt";
import FileEncrypt from "./FileEncrypt";

const LighthouseContainer = () => {
    const [cid, setCid] = React.useState(null);
  return (
    <div className="mt-8">
      <br />
      <div className="card w-96 bg-primary text-primary-content mx-auto">
        <div className="card-body">
          <h2 className="card-title">Secure file storage</h2>
          <p>Need a place to store files securely? Encrypt your files using LightHouse!</p>
          <div className="card-actions justify-end m-2">
          <FileEncrypt setCid={setCid} />
          </div>
        </div>
      </div>
    <div className="m-4 text-center">
      <h1 className="text-xl text-center">Wanna see all encrypted files?  </h1>
      <FileDecrypt />
    </div>
    </div>
  );
};

export default LighthouseContainer;
