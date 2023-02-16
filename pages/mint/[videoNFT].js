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


const livepeerClient = createReactClient({
  provider: studioProvider({
    apiKey: 'bf8c946f-2112-4226-bca7-075a2221564b',
  }),
});
   

export default function livepeervideoNft() {
    return (
      <LivepeerConfig client={livepeerClient} >
            <VideoNFTMinting />
      </LivepeerConfig>
      
    );
  }
