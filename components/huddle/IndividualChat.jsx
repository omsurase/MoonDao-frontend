import React from "react";
import { useHuddleStore } from "@huddle01/huddle01-client/store";
import { huddleClient } from "@/constants/api.constants";

const IndividualChat = ({ otherPeerId }) => {
  const peerRoomChats = useHuddleStore((state) => state.chat);
  const myPeerId = useHuddleStore((state) => state.peerId);
  const peers = useHuddleStore((state) => state.peers);
  const otherPeer = peers[otherPeerId];
  const [message, setMessage] = React.useState("");
  const setChat = useHuddleStore((state) => state.setChat);

  const makeMessage = async (message, id) => {
    console.log(message, id, myPeerId)
    await huddleClient.sendDM(message, id, myPeerId);
  };

  return (
    <div>
      <div>{otherPeer && otherPeer.displayName}</div>
      {peerRoomChats[otherPeerId] &&
        peerRoomChats[otherPeerId].map((chat, i) => {
          return chat.peerId === myPeerId ? (
            <div key={i} className="chat chat-end">
              <div className="chat-header">
                {chat?.displayName}
                <time className="text-xs opacity-50">
                  {chat?.timestamp.slice(11, 16)}
                </time>
              </div>
              <div className="chat-bubble">{chat?.message}</div>
            </div>
          ) : (
            <div key={i} className="chat chat-start">
              <div className="chat-header">
                {chat?.displayName}
                <time className="text-xs opacity-50">
                  {chat?.timestamp.slice(11, 16)}
                </time>
              </div>
              <div className="chat-bubble">{chat?.message}</div>
            </div>
          );
        })}
      <input
        type="text"
        placeholder="Please enter your message"
        onChange={(e) => {
          setMessage(e.target.value);
        }}
        className="input input-bordered input-primary w-full my-2"
      />
      <button
        onClick={() => {
          makeMessage(message, otherPeerId);
        }}
        className="btn btn-primary"
      >
        Send
      </button>
    </div>
  );
};

export default IndividualChat;
