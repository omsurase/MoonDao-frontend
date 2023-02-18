import React, { useEffect } from "react";
import { ethers } from "ethers";
import lighthouse from "@lighthouse-web3/sdk";
import Link from "next/link";

export default function FileDecrypt({ uid }) {
  const [fileURL, setFileURL] = React.useState(null);
  const [fileUrlArray, setFileUrlArray] = React.useState([]);

  const sign_auth_message = async () => {
    const provider = new ethers.providers.Web3Provider(window.ethereum);
    const signer = provider.getSigner();
    const publicKey = (await signer.getAddress()).toLowerCase();
    const messageRequested = (await lighthouse.getAuthMessage(publicKey)).data
      .message;
    const signedMessage = await signer.signMessage(messageRequested);
    return { publicKey: publicKey, signedMessage: signedMessage };
  };

  /* Decrypt file */
  const decrypt = async () => {
    // Fetch file encryption key
    const cid = uid; //replace with your IPFS CID
    const { publicKey, signedMessage } = await sign_auth_message();
    console.log(signedMessage);
    /*
      fetchEncryptionKey(cid, publicKey, signedMessage)
        Parameters:
          CID: CID of the file to decrypt
          publicKey: public key of the user who has access to file or owner
          signedMessage: message signed by the owner of publicKey
    */
    const keyObject = await lighthouse.fetchEncryptionKey(
      cid,
      publicKey,
      signedMessage
    );

    // Decrypt file
    /*
      decryptFile(cid, key, mimeType)
        Parameters:
          CID: CID of the file to decrypt
          key: the key to decrypt the file
          mimeType: default null, mime type of file
    */
    console.log("key object = " + keyObject.data);
    const fileType = "image/jpeg";
    const decrypted = await lighthouse.decryptFile(
      cid,
      keyObject.data.key,
      keyObject.data.mimeType
    );
    console.log(decrypted);
    /*
      Response: blob
    */

    // View File
    const url = URL.createObjectURL(decrypted);
    console.log(url);
    setFileURL(url);
  };

  const decryptAll = async () => {
    const list = localStorage.getItem("list");
    console.log(list);
    if (!list) return;
    const cids = list.split(",");
    for (let i = 0; i < cids.length; i++) {
      const cid = cids[i];
      if (cid === "" || !cid) continue;
      const { publicKey, signedMessage } = await sign_auth_message();
      const keyObject = await lighthouse.fetchEncryptionKey(
        cid,
        publicKey,
        signedMessage
      );
      const fileType = "image/jpeg";
      const decrypted = await lighthouse.decryptFile(
        cid,
        keyObject.data.key,
        fileType
      );
      const url = URL.createObjectURL(decrypted);
      console.log(url);
      setFileURL(url);
      // const temp = fileUrlArray;
      // temp.push(url);
      // setFileUrlArray(temp);
    }
  };
  useEffect(() => {
    if (!fileURL) return;
    let temp = fileUrlArray;
    if (temp.includes(fileURL)) return;
    temp.push(fileURL);
    setFileUrlArray(temp);
  }, [fileURL]);
  return (
    <div className="App">
      {/* <button className="btn" onClick={()=>decrypt()}>decrypt</button>
      {
        fileURL?
          <a href={fileURL} >viewFile</a>
        :
          null
      } */}
      <button
        className="btn"
        onClick={() => {
          decryptAll();
        }}
      >
        {" "}
        Decrypt all files
      </button>
      {/* The button to open modal */}
      <label htmlFor="my-modal-6" className="btn m-4">
        See decrypted files!
      </label>

      {/* Put this part before </body> tag */}
      <input type="checkbox" id="my-modal-6" className="modal-toggle" />
      <div className="modal modal-bottom sm:modal-middle">
        <div className="modal-box">
          <h3 className="font-bold text-lg">Links to decrypted files are:</h3>
          <ul className="list-disc">
            {fileUrlArray &&
              fileUrlArray.map((url, index) => {
                return (
                  url && (
                    <li key={index}>
                      <a href={url}>Link to an item</a>
                    </li>
                  )
                );
              })}
          </ul>
          <div className="modal-action">
            <label htmlFor="my-modal-6" className="btn">
              Close!
            </label>
          </div>
        </div>
      </div>
      {/* {fileUrlArray &&
        fileUrlArray.map((url, index) => {
          return (
            url && (
              <div key={index}>
                <div className="modal modal-bottom sm:modal-middle">
                  <a href={url}>Link to an item</a>
                </div>
              </div>
            )
          );
        })} */}
    </div>
  );
}
