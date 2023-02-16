import { Player } from '@livepeer/react';
 
import Image from 'next/image';
 
const playbackId =
  '15c47d94r1lv8znq';


export default function VideoPlayer(){
    return (
        <Player
          title="Waterfalls"
          playbackId={playbackId}
          showPipButton
          showTitle={false}
          aspectRatio="16to9"
          controls={{
            autohide: 3000,
          }}
          
        />
      );
}

