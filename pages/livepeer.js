import {
    LivepeerConfig,
    ThemeConfig,
    createReactClient,
    studioProvider,
  } from '@livepeer/react';
  import * as React from 'react';
  import VideoPlayer from '@/components/livepeer/Player';
import LiveStream from '@/components/livepeer/LiveStream';
import UploadVideoAsset from '@/components/livepeer/UploadVideoAsset';
import VideoNFTMinting from '@/components/livepeer/VideoNFTMinting';
import axios from 'axios';
import { useEffect, useState } from 'react';
import fetchAssets from '@/api/livepeervideo.api';

  const livepeerClient = createReactClient({
    provider: studioProvider({
      apiKey: 'bf8c946f-2112-4226-bca7-075a2221564b',
    }),
  });


  

  

  
   

export default function livepeer() {

  const [assets, setAssets] = useState([]);

  
  
    useEffect(() => {
      
      const fetchVideo = async () => {
        const x = await fetchAssets();
        setAssets(x);
      }
      
      fetchVideo();
      console.log(assets);


    }, [assets]);


    return (
      <LivepeerConfig client={livepeerClient} >
        {/* <VideoPlayer /> */}
        {/* <LiveStream /> */}
        {/* <UploadVideoAsset />  */}
            {/* <VideoNFTMinting /> */}
        {assets && assets.map((asset) => (
          <div key={asset.id}>
            <h1>{asset.name}</h1>
            <p>{asset.id}</p>
            <p>{asset.createdAt}</p>
            <p>{asset.streamKey}</p>
            <p>{asset.streamUrl}</p>
            <p>{asset.streamPlaybackId}</p>
            </div>
        ))
}


      </LivepeerConfig>
      
    );
  }
