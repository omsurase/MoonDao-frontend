import { useState, useRef, useEffect, useContext } from "react";
import { ethers } from "ethers";
import ErrorMessage from "../components/authentication/ErrorMessage";
import SuccessMessage from "../components/authentication/SuccessMessage";
import Web3 from "web3";
import LoginOptions from "@/components/authentication/LoginOptions";
import Link from "next/link";

const verifyMessage = async ({ message, address, signature }) => {
  try {
    const signerAddr = ethers.utils.verifyMessage(message, signature);
    if (signerAddr !== address) {
      return false;
    }

    return true;
  } catch (err) {
    console.log(err);
    return false;
  }
};

export default function VerifyMessage() {
  const [error, setError] = useState();
  const [successMsg, setSuccessMsg] = useState();
  const [isConnected, setIsConnected] = useState(false);
  const [ethabcAddress, setethAddress] = useState();
  const [orgLink, setOrgLink] = useState();

  useEffect(() => {
    if (localStorage) {
      setOrgLink(localStorage?.getItem("orgLink"));
    }
  }, []);

  const detectCurrentProvider = () => {
    let provider;
    if (window.ethereum) {
      provider = window.ethereum;
    } else if (windows.web3) {
      provider = window.web3.currentProvider;
    } else {
      console.log(
        "Non-Ethereum browser detected. You should consider trying MetaMask!"
      );
    }
    return provider;
  };

  useEffect(() => {
    getethAddress();
  }, []);

  const getethAddress = async () => {
    if (!window.ethereum)
      throw new Error("No crypto wallet found. Please install it.");

    await window.ethereum.send("eth_requestAccounts");
    const provider = new ethers.providers.Web3Provider(window.ethereum);
    const signer = provider.getSigner();
    const address = await signer.getAddress();
    setethAddress(address);
  };

  const handleVerification = async (e) => {
    e.preventDefault();
    const data = new FormData(e.target);
    setSuccessMsg();
    setError();
    const isValid = await verifyMessage({
      setError,
      message: data.get("message"),
      address: ethabcAddress,
      signature: data.get("signature"),
    });

    if (isValid) {
      const currentProvider = detectCurrentProvider();
      if (currentProvider) {
        await currentProvider.request({ method: "eth_requestAccounts" });
        const web3 = new Web3(currentProvider);
        const userAccount = await web3.eth.getAccounts();
        const account = userAccount[0];

        setIsConnected(true);
      }

      setSuccessMsg("Signature is valid!");
    } else {
      setError("Invalid signature");
    }
  };

  return (
    <div>
      {/* <form className="m-4" onSubmit={handleVerification}>
        <div className="credit-card w-full shadow-lg mx-auto rounded-xl bg-base-200">
          <main className="mt-4 p-4">
            <h1 className="text-xl font-semibold text-white text-center">
              Verify signature
            </h1>
            <div className="">
              <div className="my-3">
                <textarea
                  required
                  type="text"
                  name="message"
                  className="textarea w-full h-24 textarea-bordered focus:ring focus:outline-none"
                  placeholder="Message"
                />
              </div>
              <div className="my-3">
                <textarea
                  required
                  type="text"
                  name="signature"
                  className="textarea w-full h-24 textarea-bordered focus:ring focus:outline-none"
                  placeholder="Signature"
                />
              </div>
              <div className="text-black">{ethabcAddress}</div>
            </div>
          </main>
          <footer className="p-4">
            <button
              type="submit"
              className="btn btn-primary submit-button focus:ring focus:outline-none w-full"
            >
              Verify signature
            </button>
          </footer>
          <div className="p-4 mt-4">
            <ErrorMessage message={error} />
            <SuccessMessage message={successMsg} />
          </div>
        </div>
      </form> */}
      {orgLink && <Link href={orgLink}>Your organization link: {orgLink}</Link>}
      <LoginOptions />
    </div>
  );
}
