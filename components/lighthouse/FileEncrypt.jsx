import React from "react";
import { ethers } from 'ethers';
import lighthouse from '@lighthouse-web3/sdk';

export default function FileEncrypt({setCid}){
    const encryptionSignature = async() =>{
        const provider = new ethers.providers.Web3Provider(window.ethereum);
        const signer = provider.getSigner();
        const address = await signer.getAddress();
        const messageRequested = (await lighthouse.getAuthMessage(address)).data.message;
        const signedMessage = await signer.signMessage(messageRequested);
        return({
          signedMessage: signedMessage,
          publicKey: address
        });
      }
    
      const progressCallback = (progressData) => {
        let percentageDone =
          100 - (progressData?.total / progressData?.uploaded)?.toFixed(2);
        console.log(percentageDone);
      };
    
      /* Deploy file along with encryption */
      const deployEncrypted = async(e) =>{
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
          e,
          sig.publicKey,
          "33198d2f-5746-4626-8c51-f4a5bbfc3ddb",
          sig.signedMessage,
          progressCallback
        );
        console.log(response.data.Hash);
        response.data && setCid(response.data.Hash);
        const list = localStorage.getItem('list');
        console.log("list = " + list);
        if(list){
          const newList = list + ',' + response.data.Hash;
          localStorage.setItem('list', newList);
        }else{
          localStorage.setItem('list', response.data.Hash);
        }
        console.log(localStorage.getItem('list'));
        /*
          output:
            {
              Name: "c04b017b6b9d1c189e15e6559aeb3ca8.png",
              Size: "318557",
              Hash: "QmcuuAtmYqbPYmPx3vhJvPDi61zMxYvJbfENMjBQjq7aM3"
            }
          Note: Hash in response.data is CID.
        */
      }
    
      return (
        <div className="App">
          <input className="file-input file-input-bordered w-full max-w-xs" onChange={e=>deployEncrypted(e)} type="file" />
        </div>
      );
}