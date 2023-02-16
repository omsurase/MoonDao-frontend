import { Player, useCreateStream } from '@livepeer/react';

import { useMemo, useState } from 'react';

import { useEffect } from 'react';

import stream from '../../public/stream.jpg';

import Image from 'next/image';

import HeroSection from '../org/HeroSection';

const PosterImage = () => {
  return (
    <Image
      src={stream}
      
      placeholder="blur"
    />
  );
};

export default function LiveStream() {
  const [streamName, setStreamName] = useState('');
  const [playbackId, setPlaybackId] = useState('');
  const {
    mutate: createStream,
    data: stream,
    status,
  } = useCreateStream(streamName ? { name: streamName } : null);

  const isLoading = useMemo(() => status === 'loading', [status]);

  useEffect(() => {
    setPlaybackId('a2fb3rpgxc1oxiwl');
  }, []);

  return (
    <div>
      <div className= "flex flex-col justify-center">
      <HeroSection orgName=" 🔴 DecaOrg Live Streaming" />
      <div className='flex flex-row p-4 m-4'>
     <h1 className='m-4 underline'>Streamed Using:</h1>  <img  src="../images/Livepeer.png" className='object-center' alt="livepeer" width="50" height="50" />
     </div>
     </div>
      <div className="border-4 border-sky-500 ">


        <Player
          title={stream?.name}
          playbackId={playbackId}
          autoPlay
          muted
          poster={<PosterImage />}
        />
      </div>


    </div>
  );
}