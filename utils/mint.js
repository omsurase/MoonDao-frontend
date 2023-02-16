import { videonft } from "@livepeer/video-nft";

const apiOpts = {
    auth: { apiKey: 'b8793269-4a3b-4da1-a424-097f2c64f7d5'},
    endpoint: videonft.api.prodApiEndpoint,
}

export const mint = async(chainId, title, nftMetadata, setAppState, setMessage, setNftInfo) => {
    const { ethereum } = window
    const minter = new videonft.minter.FullMinter(apiOpts, { ethereum, chainId});
    const file = await minter.uploader.pickFile();

    //Todo: update app state
    
    setAppState("Minting")
    setMessage("Creating asset")
    let asset = await minter.api.createAsset(title, file);
    setMessage("Export to IPFS")
    const ipfs = await minter.api.exportToIPFS(asset.id, nftMetadata);
    setMessage("Minting NFT")
    const tx = await minter.web3.mintNft(ipfs.nftMetadataUrl);
    setMessage("Getting NFT Info")
    const nftInfo = await minter.web3.getMintedNftInfo(tx);
    setNftInfo({...nftInfo, ...ipfs})
    setAppState("Minted")
    return nftInfo
}