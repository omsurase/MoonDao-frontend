import React from 'react'
import { useEffect, useState } from "react";
import { huddleClient } from '@/constants/api.constants';
import { useHuddleStore } from "@huddle01/huddle01-client/store";
import PeerVideoAudioElem from "./PeerVideoAudioElem";
import MeVideoElem from "./MeVideoElem";

const Meeting = (props) => {
  // const huddleClient = getHuddleClient(
  //   "78bdd193c8cd9b7d766f37cc640893dea83ef3e1c89c45821fbf7ffa41278709"
  // );
  const [nameArr, setNameArr] = useState([{name: "", address: "", id: ""}]);
  const [name, setName] = useState("");
  const [hostName, setHostName] = useState("");
  const peersKeys = useHuddleStore((state) => Object.keys(state.peers));
  const lobbyPeers = useHuddleStore((state) => state.lobbyPeers);
  const roomState = useHuddleStore((state) => state.roomState);
  const recordingState = useHuddleStore((state) => state.recordingState);
  const recordings = useHuddleStore((state) => state.recordings);
  const roomId = useHuddleStore((state) => state.roomState.roomId);
  const peerId = useHuddleStore((state) => state.peerId);
  const hostId = useHuddleStore((state) => state.hostId);
  // const room = useHuddleStore((state) => state.roomState);
  // const peers = useHuddleStore((state) => state.peers);
  // console.log({ peers });
  const handleToggleRoomLock = async () => {
    if (!huddleClient) return;
    try {
      const res = await huddleClient.toggleRoomLock();
      console.log(res);
    } catch (error) {
      console.log({ error });
    }
  };
  useEffect(() => {
    const setPeerName = (peerId) => {
      let peerName = "";
      nameArr.forEach((peer) => {
        if(peer.id === peerId) {
          peerName = peer.name;
        }
        if (peer.id === hostId) {
          setHostName(peer.name);
        }
      })
      setName(peerName)
    }
    setPeerName(peerId)
  }, [])
  const handleJoin = async () => {
    try {
      await huddleClient.join(props.currentRoomId, {
        address: "0xb17bc8c23e53f463F0332008D518121B74b260d2",
        wallet: "",
        ens: "axit.eth",
      });
      setNameArr([...nameArr, {name: name, address: "0xb17bc8c23e53f463F0332008D518121B74b260d2", id: peerId}])
      console.log("joined");
    } catch (error) {
      console.log({ error });
    }
  };
  // console.log(nameArr)
  const handleLobbyJoin = async () => {
    try {
      const res = huddleClient.addLobbyPeer([
        {
          id: "soham2",
          displayName: "0x0d75194C804C26912F233A0072A4816DDdcf3173",
        },
      ]);
      console.log(lobbyPeers);
      console.log(res);
    } catch (error) {
      console.log({ error });
    }
  };
  //   useEffect(() => {
  //    const handleJoin = async () => {
  //     try {
  //       await huddleClient.join(props.currentRoomId, {
  //         address: "0xb17bc8c23e53f463F0332008D518121B74b260d2",
  //         wallet: "",
  //         ens: "axit.eth",
  //       });
  //       console.log("joined");
  //     } catch (error) {
  //       console.log({ error });
  //     }
  //   };
  //   han
  //   }, []);
  return (
      <div className="container flex flex-col">
        <div>
          <input
            type="text"
            onChange={(e) => {
              setName(e.target.value);
            }}
          />
          <button onClick={handleJoin}>Join Room</button>
          <button onClick={handleLobbyJoin}>Join Lobby</button>
          <h2>Room Id: {roomId}</h2>
          <h2>Host Id: {hostName}</h2>
          <h2>Peer Id: {name}</h2>
          <h2 className={`text-${!roomState.joined ? "red" : "green"}`}>
            Room Joined:&nbsp;{roomState.joined.toString()}
          </h2>

          <button
            onClick={async () => {
              await handleToggleRoomLock();
            }}
          >
            Toggle Room Lock
          </button>
        </div>
        
        <MeVideoElem />
        <div>
          <div className="">
            <button onClick={() => huddleClient.enableWebcam()}>
              Enable Webcam
            </button>
            <button onClick={() => huddleClient.disableWebcam()}>
              Disable Webcam
            </button>
            <button
              onClick={() =>
                console.log(huddleClient.allowAllLobbyPeersToJoinRoom())
              }
            >
              Allow Lobby Peer to join room
            </button>
            <button
              onClick={() =>
                // will not work in localhost
                huddleClient.startRecording({
                  sourceUrl: window.location.href,
                })
              }
            >
              startRecording()
            </button>
            <button onClick={() => huddleClient.stopRecording({ ipfs: true })}>
              stopRecording()
            </button>
            <button
              onClick={() => {
                const res = huddleClient.enableShare();
                console.log(res);
              }}
            >
              Share screen
            </button>
            <button
              onClick={() => {
                const res = huddleClient.disableShare();
                console.log(res);
              }}
            >
              Disable Share screen
            </button>
            <button onClick={() => huddleClient.enableMic()}>Enable mic</button>
            <button onClick={() => huddleClient.disableMic()}>
              Disable mic
            </button>
            <button
              onClick={() => {
                huddleClient.close();
                window.location.reload();
              }}
            >
              End your call
            </button>
            <hr />
            {huddleClient.hostId === peerId && (
              <button onClick={() => huddleClient.closeRoomForEverybody()}>
                End meet
              </button>
            )}
          </div>
          <div onClick={ async () => await huddleClient.muteMic()}>
          <button>
            Mute mic
          </button>
          </div>
          <div>
            <button onClick={async () => await  huddleClient.unmuteMic()}>
              Unmute mic
            </button>
          </div>

          {/* {lobbyPeers[0] && <h2>Lobby Peers</h2>}
          <div>
            {lobbyPeers.map((peer) => (
              <div>{peer.peerId}</div>
            ))}
          </div>
          {huddleClient.lobby}
          {peersKeys[0] && <h2>Peers</h2>} */}

          <div className="peers-grid">
            {peersKeys.map((key) => (
              <PeerVideoAudioElem key={`peerId-${key}`} peerIdAtIndex={key} />
            ))}
          </div>
          <div className="text-blue">
            <h2>Recording State</h2>
            <h3>inProgress: {recordingState.inProgress.toString()}</h3>
            <h3>processing: {recordingState.processing.toString()}</h3>
            <h3>started: {recordingState.started.toString()}</h3>
            <h3>recordings: {JSON.stringify(recordings)}</h3>
          </div>
        </div>
      </div>
  );
};

export default Meeting;


