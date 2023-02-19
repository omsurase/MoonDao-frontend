import { getFiles } from "@/api/file.api";
import React, { useEffect } from "react";
import lighthouse from "@lighthouse-web3/sdk";
import Link from "next/link";
import { ethers } from "ethers";

const AllFiles = ({ orgAddress }) => {
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
  const decrypt = async (uid, type, file) => {
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

    console.log(keyObject.data);
    // const fileType = "image/jpeg";
    const mimeTypes = {
      jpg: "image/jpeg",
      jpeg: "image/jpeg",
      png: "image/png",
      gif: "image/gif",
      pdf: "application/pdf",
      mp4: "video/mp4",
      mp3: "audio/mpeg",
      wav: "audio/wav",
      txt: "text/plain",
      html: "text/html",
      css: "text/css",
      js: "text/javascript",
      json: "application/json",
    };
    const decrypted = await lighthouse.decryptFile(
      cid,
      keyObject.data.key,
      mimeTypes[type]
    );
    /*
      Response: blob
    */

    // View File
    const url = URL.createObjectURL(decrypted);
    files.forEach((f) => {
      if (f.cid === uid) {
        f["URL"] = url;
      }
    });
    console.log(url);
    setFileURL(url);
  };
  const [fileURL, setFileURL] = React.useState(null);
  const [files, setFiles] = React.useState([]);
  useEffect(() => {
    const showFiles = async () => {
      if (orgAddress === undefined) return;
      const files = await getFiles(orgAddress);
      console.log(files);
      setFiles(files);
    };
    showFiles();
    console.log(files);
  }, [orgAddress]);

  return (
    <div>
      <div className="flex flex-col">
        <div className="overflow-x-auto sm:-mx-6 lg:-mx-8">
          <div className="py-2 inline-block min-w-full sm:px-6 lg:px-8">
            <div className="overflow-hidden">
              <table className="min-w-full">
                <thead className="bg-white border-b">
                  <tr>
                    <th
                      scope="col"
                      className="text-sm font-medium text-gray-900 px-6 py-4 "
                    >
                      #
                    </th>
                    <th
                      scope="col"
                      className="text-sm font-medium text-gray-900 px-6 py-4 "
                    >
                      Filename
                    </th>
                    <th
                      scope="col"
                      className="text-sm font-medium text-gray-900 px-6 py-4 "
                    >
                      Decryption
                    </th>
                    <th
                      scope="col"
                      className="text-sm font-medium text-gray-900 px-6 py-4 "
                    >
                      Link
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {files &&
                    files
                      .map((file, i) => {
                        return (
                          <tr
                            key={i}
                            className={
                              i % 2 == 0
                                ? `bg-gray-100 border-b`
                                : `bg-white border-b`
                            }
                          >
                            <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                              {files.length - i}
                            </td>
                            <td className="text-sm text-gray-900 font-light px-6 py-4 whitespace-nowrap">
                              {file.name}
                            </td>
                            <td className="text-sm text-gray-900 font-light px-6 py-4 whitespace-nowrap">
                              <button
                                className="btn btn-primary btn-sm"
                                onClick={() => decrypt(file.cid, file.type)}
                              >
                                Decrypt File
                              </button>
                            </td>
                            <td className="text-sm text-gray-900 font-light px-6 py-4 whitespace-nowrap">
                              {file.URL ? (
                                <a
                                  className="link"
                                  href={file.URL}
                                  target="_blank"
                                >
                                  Open your file!
                                </a>
                              ) : (
                                <p>-</p>
                              )}
                            </td>
                          </tr>
                        );
                      })
                      .reverse()}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AllFiles;
