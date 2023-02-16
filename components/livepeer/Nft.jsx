import { useState } from "react";
import Loader from "./Loader";
import MintForm from "./MintForm";

const Nft = ({ appState, setAppState, chainId }) => {
  const [message, setMessage] = useState("");
  const [nftInfo, setNftInfo] = useState(null);
  return (
    <div>
      {appState === "Ready to mint" && (
        <MintForm
          setAppState={setAppState}
          setNftInfo={setNftInfo}
          chainId={chainId}
          setMessage={setMessage}
        />
      )}
      {appState === "Minting" && <Loader message={message} />}
      {appState === "Minted" && nftInfo && (
        <>
          <h2>Contract Address: {nftInfo.contractAddress}</h2>
          <div className="flex-column">
            <a href={nftInfo.opensea.tokenUrl}>View on Opensea</a>
            <video width="640" height="480" controls>
              <source src={nftInfo.videoFileGatewayUrl} />
            </video>
          </div>
        </>
      )}
    </div>
  );
};

export default Nft;
