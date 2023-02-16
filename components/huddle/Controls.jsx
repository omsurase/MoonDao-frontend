import React, { useEffect, useState } from "react";
import { huddleClient } from "@/constants/api.constants";
import { useHuddleStore } from "@huddle01/huddle01-client/store";
import Image from "next/image";
import { getethAddress } from "@/hooks/getAddress.hook";
import { removeParticipant } from "@/api/room.api";

const Controls = (props) => {
  const btnStyles = {
    btnActive:
      "btn btn-primary mx-2 bg-primary text-white rounded-lg flex flex-row",
    btnInactive:
      "btn bg-black mx-2  text-white rounded-lg flex flex-row opacity-50",
  };

  const peerId = useHuddleStore((state) => state.peerId);
  const hostId = useHuddleStore((state) => state.hostId);

  const peers = useHuddleStore((state) => state.peers);
  // console.log(peers);
  const [mic, setMic] = useState(true);
  const [cam, setCam] = useState(true);
  const [share, setShare] = useState(false);

  const roomState = useHuddleStore((state) => state.roomState);
  const recordingState = useHuddleStore((state) => state.recordingState);
  const recordings = useHuddleStore((state) => state.recordings);

  const getActiveMicPeer = () => {
    let activePeer = null;
    for (const peer in peers) {
      if (peers[peer].isMicPaused === true) {
        activePeer = peer;
      }
    }
    return activePeer;
  };

  const getActiveSharePeer = () => {
    let activePeer = null;
    for (const peer in peers) {
      if (peers[peer].isScreenSharePaused === true) {
        activePeer = peer;
      }
    }
    return activePeer;
  };

  const [lobbypeer, setLobbyPeer] = useState("");

  return (
    <div className="w-fit flex flex-row mx-auto justify-apart">
      <button
        onClick={() => {
          setMic(!mic);
        }}
      >
        {mic ? (
          <button
            className={btnStyles.btnInactive}
            onClick={() => huddleClient.muteMic()}
          >
            <span>Mute</span>
            <Image
              alt=""
              className="m-2"
              src="/icons/mute.png"
              width={20}
              height={20}
            />
          </button>
        ) : (
          <button
            className={btnStyles.btnInactive}
            onClick={() => huddleClient.unmuteMic()}
          >
            <span>Unmute</span>
            <Image
              alt=""
              className="m-2"
              src="/icons/unmute.png"
              width={20}
              height={20}
            />
          </button>
        )}
      </button>

      <button
        onClick={() => {
          setCam(!cam);
        }}
      >
        {cam ? (
          <button
            className={btnStyles.btnInactive}
            onClick={() => huddleClient.disableWebcam()}
          >
            <span>Stop Video</span>
            <Image
              alt=""
              className="m-2"
              src="/icons/nocamera.png"
              width={20}
              height={20}
            />
          </button>
        ) : (
          <button
            className={btnStyles.btnInactive}
            onClick={() => huddleClient.enableWebcam()}
          >
            <span>Start Video</span>
            <Image
              alt=""
              className="m-2"
              src="/icons/camera.png"
              width={20}
              height={20}
            />
          </button>
        )}
      </button>

      <button
        className={btnStyles.btnInactive}
        onClick={async () => {
          const ethAddress = await getethAddress()
          const resp = await removeParticipant(props.roomId, ethAddress)
          huddleClient.close();
          window.location.reload();
        }}
      >
        <span>Leave Room</span>
        <Image
          alt=""
          className="m-2"
          src="/icons/close.png"
          width={20}
          height={20}
        />
      </button>
      <button
        onClick={() => {
          setShare(!share);
        }}
      >
        {!share ? (
          <button
            className={btnStyles.btnInactive}
            onClick={() => huddleClient.enableShare()}
          >
            <span>Share Screen</span>
            <Image
              alt=""
              className="m-2"
              src="/icons/share.png"
              width={20}
              height={20}
            />
          </button>
        ) : (
          <button
            className={btnStyles.btnInactive}
            onClick={() => huddleClient.disableShare()}
          >
            <span>Stop Share</span>
            <Image
              alt=""
              className="m-2"
              src="/icons/noshare.png"
              width={20}
              height={20}
            />
          </button>
        )}
      </button>
      {hostId === peerId &&
        (recordingState.inProgress === true ? (
          <button
            className={btnStyles.btnInactive}
            onClick={async () => await huddleClient.stopRecording({ ipfs: true })}
          >
            <span>Stop Recording</span>
          </button>
        ) : (
          <button
            className={btnStyles.btnInactive}
            onClick={() =>
              huddleClient.startRecording({
                sourceUrl: window.location.href,
              })
            }
          >
            <span>Start Recording</span>
          </button>
        ))}
    </div>
  );
};

export default Controls;
