import { useHuddleStore } from "@huddle01/huddle01-client/store";
import React, { useCallback, useEffect, useRef } from "react";


const PeerVideoAudioElem = ({ peerIdAtIndex }) => {
  const videoRef = useRef(null);
  const audioRef = useRef(null);
  const shareScreenRef = useRef(null);

  const isSharePaused = useHuddleStore((state) => state.peers[peerIdAtIndex].isSharePaused);

  const peerCamTrack = useHuddleStore(
    useCallback(
      (state) => state.peers[peerIdAtIndex]?.consumers?.cam,
      [peerIdAtIndex]
    )
  )?.track;

  const peerMicTrack = useHuddleStore(
    useCallback(
      (state) => state.peers[peerIdAtIndex]?.consumers?.mic,
      [peerIdAtIndex]
    )
  )?.track;
  
  const peerShareScreen = useHuddleStore(
    useCallback(
      (state) => state.peers[peerIdAtIndex]?.consumers?.share,
      [peerIdAtIndex]
    )
  )?.track;

  const getStream = (_track) => {
    const stream = new MediaStream();
    stream.addTrack(_track);
    console.log({ ...stream });
    return stream;
  };


  useEffect(() => {
    const videoObj = videoRef.current;

    if (videoObj && peerCamTrack) {
      videoObj.load();
      videoObj.srcObject = getStream(peerCamTrack);
      videoObj.play().catch((err) => {
        console.log({
          message: "Error playing video",
          meta: {
            err,
          },
        });
      });
    }

    return () => {
      if (videoObj) {
        videoObj?.pause();
        videoObj.srcObject = null;
      }
    };
  }, [peerCamTrack]);

  useEffect(() => {
    if (peerMicTrack && audioRef.current) {
      audioRef.current.srcObject = getStream(peerMicTrack);
    }
    console.log({ peerMicTrack });
  }, [peerMicTrack]);

  useEffect(() => {
    if (peerShareScreen && shareScreenRef.current) {
      shareScreenRef.current.srcObject = getStream(peerShareScreen);
    }
    console.log("share screen ref - " + shareScreenRef.current);
  }, [peerShareScreen]);

  return (
    <div>
      <video
        ref={videoRef}
        muted
        autoPlay
        playsInline
        style={{ width: "100%" }}
      />
      <audio ref={audioRef} autoPlay playsInline controls={false}></audio>
      {/* <div>{peerIdAtIndex}</div> */}
      {/* { isSharePaused && <video
        ref={shareScreenRef}
        muted
        autoPlay
        style={{ width: "100%" }}
  
      />} */}
    </div>
  );
};

export default PeerVideoAudioElem;
