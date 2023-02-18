import React from "react";
import { ethers } from "ethers";
import lighthouse from "@lighthouse-web3/sdk";
import DragDropFiles from "../DragDropFiles";
import { addFile } from "@/api/file.api";

export default function FileEncrypt({ orgAddress }) {
  const [file, setFile] = React.useState(null);
  const [event, setEvent] = React.useState(null);
  const encryptionSignature = async () => {
    const provider = new ethers.providers.Web3Provider(window.ethereum);
    const signer = provider.getSigner();
    const address = await signer.getAddress();
    const messageRequested = (await lighthouse.getAuthMessage(address)).data
      .message;
    const signedMessage = await signer.signMessage(messageRequested);
    return {
      signedMessage: signedMessage,
      publicKey: address,
    };
  };

  const progressCallback = (progressData) => {
    let percentageDone =
      100 - (progressData?.total / progressData?.uploaded)?.toFixed(2);
    console.log(percentageDone);
  };

  /* Deploy file along with encryption */
  const deployEncrypted = async () => {
    /*
           uploadEncrypted(e, publicKey, accessToken, uploadProgressCallback)
           - e: js event
           - publicKey: wallets public key
           - accessToken: your api key
           - signedMessage: message signed by the owner of publicKey
           - uploadProgressCallback: function to get progress (optional)
        */
    const sig = await encryptionSignature();
    const response = await lighthouse.uploadEncrypted(
      event,
      sig.publicKey,
      "33198d2f-5746-4626-8c51-f4a5bbfc3ddb",
      sig.signedMessage,
      progressCallback
    );
    // console.log(response.data.Hash);
    // response.data && setCid(response.data.Hash);
    // const list = localStorage.getItem("list");
    // console.log("list = " + list);
    // if (list) {
    //   const newList = list + "," + response.data.Hash;
    //   localStorage.setItem("list", newList);
    // } else {
    //   localStorage.setItem("list", response.data.Hash);
    // }
    // console.log(localStorage.getItem("list"));
    if (!response || !response.data) {
      window.alert("Error uploading file");
      return;
    }
    const name = response.data.Name;
    const type = response.data.Name.split(".")[1];
    const cid = response.data.Hash;

    const res = await addFile(type, cid, name, orgAddress);
    if (!res) {
      window.alert("Error uploading file");
      return;
    } else {
      window.location.reload();
    }
    /*
          output:
            {
              Name: "c04b017b6b9d1c189e15e6559aeb3ca8.png",
              Size: "318557",
              Hash: "QmcuuAtmYqbPYmPx3vhJvPDi61zMxYvJbfENMjBQjq7aM3"
            }
          Note: Hash in response.data is CID.
        */
  };

  return (
    <div className="App w-full">
      <DragDropFiles setFile={setFile} file={file} setEvent={setEvent} />
      {file && (
        <button
          className="text-white bg-gradient-to-r from-cyan-500 to-blue-500 hover:bg-gradient-to-bl focus:ring-4 focus:outline-none focus:ring-cyan-300 dark:focus:ring-cyan-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center w-fit mx-auto mt-4 flex items-center justify-center"
          onClick={() => {
            deployEncrypted();
          }}
        >
          Encrypt and Upload
        </button>
      )}
    </div>
  );
}
