import React from "react";
import {ethers} from 'ethers';
import lighthouse from '@lighthouse-web3/sdk';

export default function AccessControl() {

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
  const lighthouse = require('@lighthouse-web3/sdk');
    const uploads =  lighthouse.getUploads('0x487fc2fE07c593EAb555729c3DD6dF85020B5160');
    console.log("ECHK", uploads);

  const applyAccessConditions = async(e) =>{
    const cid = "QmZoGG5xzdpavB59M2wfRF3ADL16qEoaZR1WXqMWArhfdz";

    // Conditions to add
    const conditions = [
      {
        id: 1,
        chain: "Optimism",
        method: "getBlockNumber",
        standardContractType: "",
        returnValueTest: {
          comparator: ">=",
          value: "13349"
        },
      },
    ];

    const aggregator = "([1])";
    const {publicKey, signedMessage} = await encryptionSignature();

    /*
      accessCondition(publicKey, cid, signedMessage, conditions, aggregator)
        Parameters:
          publicKey: owners public key
          CID: CID of file to decrypt
          signedMessage: message signed by owner of publicKey
          conditions: should be in format like above
          aggregator: aggregator to apply on conditions
    */
    const response = await lighthouse.accessCondition(
      publicKey,
      cid,
      signedMessage,
      conditions,
      aggregator
    );

    console.log(response);
    /*
      {
        data: {
          cid: "QmZkEMF5y5Pq3n291fG45oyrmX8bwRh319MYvj7V4W4tNh",
          status: "Success"
        }
      }
    */
  }

  return (
    <div className="App">
      <button onClick={()=>{applyAccessConditions()}}>Apply Access Conditions</button>
    </div>
  );
}

