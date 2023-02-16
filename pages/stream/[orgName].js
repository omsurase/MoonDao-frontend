import {
    LivepeerConfig,
    ThemeConfig,
    createReactClient,
    studioProvider,
  } from '@livepeer/react';
  import * as React from 'react';
import LiveStream from '@/components/livepeer/LiveStream';


const livepeerClient = createReactClient({
  provider: studioProvider({
    apiKey: 'bf8c946f-2112-4226-bca7-075a2221564b',
  }),
});
   

export default function livepeerStream() {
    return (
      <LivepeerConfig client={livepeerClient} >
        <LiveStream />
      </LivepeerConfig>
      
    );
  }
