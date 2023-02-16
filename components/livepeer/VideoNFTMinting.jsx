import { useState } from 'react';
import ConnectWallet from './ConnectWallet';
import Nft from './Nft';


export default function VideoNFTMinting(){
    const [chainId, setChainId] = useState("");
  const [address, setAddress] = useState("");
  const [appState, setAppState] = useState("Ready to mint");
  console.log({ chainId })
  return (
    <div className="App">
      <header className="App-header">
       {
         !address && (
           <ConnectWallet setChainId={setChainId} setAddress={setAddress} />
         )
       }
       {
         chainId && (
           <Nft 
            appState={appState}
            setAppState={setAppState}
            chainId={chainId}
           />
         )
       }
      </header>
    </div>
  );
}