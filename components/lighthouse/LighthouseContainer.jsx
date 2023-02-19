import React from "react";
import AllFiles from "./AllFiles";
import FileDecrypt from "./FileDecrypt";
import FileEncrypt from "./FileEncrypt";

const LighthouseContainer = ({ orgAddress }) => {
  const [cid, setCid] = React.useState(null);
  return (
    <div className="mt-8 bg-white">
      <br />
      {/* <div className="card w-96 bg-primary text-primary-content mx-auto">
        <div className="card-body">
          <h2 className="card-title">Secure file storage</h2>
          <p>
            Need a place to store files securely? Encrypt your files using
            LightHouse!
          </p>
          <div className="card-actions justify-end m-2">
            <FileEncrypt setCid={setCid} />
          </div>
        </div>
      </div> */}
      <p className="text-black w-fit mx-auto">
        Need a place to store files securely? Encrypt your files using MoonDAO!
      </p>
      <div className="m-2">
        <FileEncrypt orgAddress={orgAddress} />
      </div>
      <div className="m-4 text-center text-black">
        <h1 className="text-xl text-center">Here are your encrypted files! </h1>
        {/* <FileDecrypt /> */}
        <AllFiles orgAddress={orgAddress} />
      </div>
    </div>
  );
};

export default LighthouseContainer;
