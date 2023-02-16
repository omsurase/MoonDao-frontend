import React from "react";
import { useEffect, useState } from "react";
import { huddleClient } from "@/constants/api.constants";
import { useHuddleStore } from "@huddle01/huddle01-client/store";
import PeerVideoAudioElem from "./PeerVideoAudioElem";
import MeVideoElem from "./MeVideoElem";
import NotJoined from "./NotJoined";
import Joined from "./Joined";
import ShareScreen from "./ShareScreen";
import Recordings from "./Recordings";

const MeetRoom = (props) => {
  const peersKeys = useHuddleStore((state) => Object.keys(state.peers));
  const lobbyPeers = useHuddleStore((state) => state.lobbyPeers);
  const roomState = useHuddleStore((state) => state.roomState);
  const recordingState = useHuddleStore((state) => state.recordingState);
  const recordings = useHuddleStore((state) => state.recordings);
  const roomId = useHuddleStore((state) => state.roomState.roomId);
  const peerId = useHuddleStore((state) => state.peerId);
  const hostId = useHuddleStore((state) => state.hostId);
  const hasJoined = useHuddleStore((state) => state.roomState.joined);

  const [nameArr, setNameArr] = useState([]);
  const [name, setName] = useState(peerId);
  const [hostName, setHostName] = useState("");

  // console.log(props);
  

  useEffect(() => {
    const setPeerName = (peerId) => {
      let peerName = "";
      nameArr.forEach((peer) => {
        if (peer.id === peerId) {
          peerName = peer.name;
        }
        if (peer.id === hostId) {
          setHostName(peer.name);
        }
      });
      setName(peerName);
    };
    setPeerName(peerId);
  }, []);

  const handleJoin = async () => {
    console.log(props);
    try {
      await huddleClient.join(props.currentRoomId, {
        address: props.ethAddress,
        wallet: "",
        ens: "axit.eth",
      });
      setNameArr([
        ...nameArr,
        {
          name: name,
          address: props.ethAddress,
          id: peerId,
        },
      ]);
      console.log("joined");
    } catch (error) {
      console.log({ error });
    }
  };

  return (
    <div className="h-screen w-screen overflow-x-hidden ">
      {!hasJoined && (
        <div>
          <NotJoined
            roomId={props.currentRoomId}
            setName={setName}
            handleJoin={handleJoin}
            ethAddress={props.ethAddress}
            peerId={peerId}
            name={name}
            nameArr={nameArr}
            setNameArr={setNameArr}
          />
        </div>
      )}
      {hasJoined && (
        <div>
          <Joined
            name={name}
            roomId={props.currentRoomId}
            peersKeys={peersKeys}
            nameArr={nameArr}
            ethAddress={props.ethAddress}
          />
          {peersKeys.map((key) => (
            <div
              key={`peer-${key}`}
              style={{ width: "100%" }}
              className="space-between p-2 m-2 bg-base-300 h-fit rounded-lg mx-auto "
            >
              {/* <hr /> */}
              <br />
              <ShareScreen key={`peerId-${key}`} peerId={key} />
            </div>
          ))}
          {peerId === hostId && (
            <div className="mx-auto">
              <Recordings recordings={recordings} />
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default MeetRoom;
