import React, { useEffect, useState } from "react";
import Controls from "./Controls";
import MeetNavbar from "./MeetNavbar";
import MeVideoElem from "./MeVideoElem";
import PeerVideoAudioElem from "./PeerVideoAudioElem";
import { useHuddleStore } from "@huddle01/huddle01-client/store";
import { huddleClient } from "@/constants/api.constants";
import { getParticipants, updateParticipant } from "@/api/room.api";
import { getethAddress } from "@/hooks/getAddress.hook";
import ChatComp from "../Chat/ChatComp";
import Chat from "./Chat";
import GrpChat from "./GrpCHat";
import IndividualChat from "./IndividualChat";
import Transcript from "./Transcript";
import { themeChange } from "theme-change";

const Joined = (props) => {
  const peerId = useHuddleStore((state) => state.peerId);
  const hostId = useHuddleStore((state) => state.hostId);
  const lobbyPeers = useHuddleStore((state) => state.lobbyPeers);
  const peers = useHuddleStore((state) => state.peers);
  const activeSpeakerPeerId = useHuddleStore((state) => state.activeSpeaker);
  const [activeMicPeer, setActiveMicPeer] = React.useState(null);
  const isMicPaused = useHuddleStore(
    (state) => state.peers[peerId]?.isCamPaused
  );
  const [members, setMembers] = useState([]);

  const [hidden, setHidden] = useState(true);
  const [hiddenGrpChats, setHiddenGrpChats] = useState(true);
  // console.log(lobbyPeers);
  const [myEthAddress, setMyEthAddress] = useState("");
  const [receiverEthAddress, setReceiverEthAddress] = useState("");
  const [receiverName, setReceiverName] = useState(
    "0x0d75194C804C26912F233A0072A4816DDdcf3173"
  );
  const [receiverPeerId, setReceiverPeerId] = useState("");

  const updatePeer = async (peerId, peerName, roomId) => {
    console.log("updatePeer");
    console.log(peerId, peerName, roomId);
    const resp = await updateParticipant(roomId, peerId, peerName);
    console.log(resp);
    // setPeerName(peerId, peerName);
    return resp;
  };

  useEffect(() => {
    themeChange(false);
    // 👆 false parameter is required for react project
  }, []);
  useEffect(() => {
    const updateHost = async () => {
      if (peerId === hostId) {
        const response = await updatePeer(hostId, props.name, props.roomId);
        console.log(response);
      }
    };
    updateHost();
  }, []);

  useEffect(() => {
    const getMembers = async () => {
      const response = await getParticipants(props.roomId);
      setMembers(response.room);
    };
    getMembers();
  }, [peers]);

  useEffect(() => {
    const getAddress = async () => {
      const ethAddress = await getethAddress();
      setMyEthAddress(ethAddress);
    };
    getAddress();
  }, []);

  const getFactor = (num) => {
    if (num == 0) return 1;
    if (num === 1) return 1.2;
    if (num === 2) return 0.2;
    if (num === 3) return -0.8;
    return -1;
  };
  const videoWidth =
    ((window.innerWidth / 4) * 3) /
    (props.peersKeys.length + getFactor(props.peersKeys.length));
  // console.log(videoWidth);

  const getActiveMicPeer = () => {
    let activePeer = null;
    for (const peer in peers) {
      if (!peers[peer].isMicPaused) {
        activePeer = peer;
      }
    }
    setActiveMicPeer(activePeer);
  };

  useEffect(() => {
    if (lobbyPeers.length > 0 && hostId === peerId) {
      alert("Peer entered the lobby");
    }
  }, [lobbyPeers]);

  const getActiveSharePeer = () => {
    let activePeer = null;
    for (const peer in peers) {
      if (peers[peer].isScreenSharePaused === true) {
        activePeer = peer;
      }
    }
    return activePeer;
  };

  useEffect(() => {
    getActiveMicPeer();
    // console.log("acive peer id = " + activeMicPeer);
  }, [peers, activeMicPeer]);

  return (
    <div className="h-full w-screen ">
      <div className="top-bar w-screen">
        <MeetNavbar name={props.name} roomId={props.roomId} />
      </div>
      <div className="flex h-full w-screen overflow-x-hidden">
        <div className="video-rendering basis-3/4 bg-base-300 h-full overflow-y-auto">
          {props.peersKeys.length >= 0 && (
            <div className="flex flex-row flex-wrap max-h-3/4 overflow-y-auto">
              {props.peersKeys.map((key) => (
                <div
                  key={`peer-${key}`}
                  style={{ width: videoWidth }}
                  className={`space-between p-2 m-2 ${
                    activeMicPeer == key
                      ? activeSpeakerPeerId === key
                        ? "bg-warning"
                        : "bg-primary"
                      : `bg-base-200`
                  } h-fit rounded-lg mx-auto `}
                >
                  <PeerVideoAudioElem
                    key={`peerId-${key}`}
                    peerIdAtIndex={key}
                  />
                </div>
              ))}
              <div
                style={{ width: videoWidth }}
                className={`my-video p-2 m-2 ${
                  activeMicPeer?.peerId == peerId ? "bg-accent" : `bg-base-200`
                } h-fit rounded-lg mx-auto`}
              >
                <MeVideoElem />
              </div>
            </div>
          )}
          <br />
          <div className="controls">
            <Controls roomId={props.roomId} ethAddress={props.ethAddress} />
          </div>
          <div className="transcript">
            <Transcript />
          </div>
          <div className="flex items-center p-2 m-2">
            <select data-choose-theme className="select select-info w-full max-w-xs mx-auto">
              <option disabled selected value="">Change theme</option>
              <option value="dark">Dark</option>
              <option value="halloween">Halloween</option>
              <option value="aqua">Aqua</option>
              <option value="cupcake">Cupcake</option>
              <option value="light">Light</option>
            </select>
          </div>
        </div>
        <div className="bg- w-1/4 mx-2 h-screen ">
          <div className="participants bg-base-300 max-h-1/3 overflow-y-auto">
            <div className="p-2 bg-base-200 rounded-lg mx-auto">
              <h1 className="text-center text-white text-lg">Participants</h1>
              <div className="participants-list">
                <ul>
                  {/* <li>
                    <span>1.</span>
                    <span className="p-1">{props.name}</span>
                  </li> */}
                  {/* {props.nameArr.map((key, i) => (
                    <li key={i}>
                      <span>{i + 2}.</span>
                      <span className="p-1">{key.name}</span>
                    </li>
                  ))} */}
                  {/* {props.peersKeys.map((key, i) => (
                    <div className="p-2" key={`peerId${i}`}>
                      <li key={i}>
                        <span>{i + 2}.</span>
                        <span className="p-1">{key}</span>
                      </li>
                    </div>
                  ))} */}
                  <br />
                  <table className="table w-full">
                    <thead>
                      <tr>
                        {/* <th>Sr. no.</th> */}
                        <th>Name</th>
                        <th>Eth Address</th>
                        <th>PeerId</th>
                      </tr>
                    </thead>
                    {members &&
                      members.map((member, i) => (
                        <tr
                          className={i % 2 === 0 ? "active" : "p-4"}
                          key={`peerId${i}`}
                        >
                          {/* <td>{i + 1}.</td> */}
                          <td className="p-1">{member.peerName}</td>
                          <td className="p-1">
                            {member.peerEthAddress.slice(0, 5)}...
                            {member.peerEthAddress.slice(-2)}
                          </td>
                          <td>{member.peerId}</td>
                          <td
                            onClick={() => {
                              setReceiverEthAddress(member.peerEthAddress);
                              setReceiverName(member.peerName);
                              setReceiverPeerId(member.peerId);
                              setHidden(!hidden);
                            }}
                            className="p-1"
                          >
                            {member.peerId != peerId && (
                              <button className="btn-info btn">Chat</button>
                            )}
                          </td>
                        </tr>
                      ))}
                  </table>
                </ul>
              </div>
            </div>
          </div>
          <div className="participants bg-base-300 max-h-1/3 overflow-y-auto">
            <div className="p-2 bg-base-200 rounded-lg mx-auto">
              {peerId === hostId && (
                <h1 className="text-center text-white text-lg">
                  <hr />
                  Lobby Participants
                </h1>
              )}
              <br />
              <div className="lobby-list">
                {peerId === hostId &&
                  lobbyPeers?.map((peer, i) => (
                    <div
                      className="flex flex-row justify-between"
                      key={`${peerId}_${i}`}
                    >
                      <span className="p-1"> {i + 1}. </span>
                      <span className="p-2">{peer.peerId}</span>

                      <button
                        className="btn btn-success btn-xs	"
                        onClick={async () => {
                          await huddleClient.allowLobbyPeerToJoinRoom(
                            peer.peerId
                          );
                          const update = await updatePeer(
                            peer.peerId,
                            peer.displayName,
                            props.roomId
                          );
                          console.log(update);
                        }}
                      >
                        Accept
                      </button>
                      <button
                        className="btn btn-warning btn-xs"
                        onClick={async () =>
                          await huddleClient.disallowLobbyPeerFromJoiningRoom(
                            peer.peerId
                          )
                        }
                      >
                        Reject
                      </button>
                    </div>
                  ))}
              </div>
            </div>
          </div>
          <hr />
          <div className="participants bg-base-300 max-h-1/3 overflow-y-auto">
            <div className="p-2 bg-base-200 rounded-lg mx-auto">
              <h1 className="text-center text-white text-lg">Chats</h1>
              {/* {props.peersKeys.map((key, i) => {
                return (
                  <div key={i}>
                    <Chat roomId={props.roomId} fromPeerId={key} />;
                  </div>
                );
              })} */}
              {/* <Chat roomId={props.roomId} /> */}
              <div className={hidden ? "hidden" : "flex"}>
                {/* <ChatComp
                  sender={myEthAddress}
                  receiver={receiverEthAddress}
                  name={receiverName}
                /> */}
                <IndividualChat otherPeerId={receiverPeerId} />
              </div>
              <div className="w-full flex justify-center p-4">
                <button
                  onClick={() => setHiddenGrpChats(!hiddenGrpChats)}
                  className="btn btn-accent relative w-3/4 text-md"
                >
                  Group chats
                </button>
              </div>
              {!hiddenGrpChats && (
                <div>
                  <GrpChat />
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Joined;
