import React from "react";
import { useHuddleStore } from "@huddle01/huddle01-client/store";
import { huddleClient } from "@/constants/api.constants";

const GrpChat = () => {
  const roomChats = useHuddleStore((state) => state.chat["mainRoom"]);
  const myPeerId = useHuddleStore((state) => state.peerId);
  const [message, setMessage] = React.useState("");
  const setChat = useHuddleStore((state) => state.setChat);

  const makeMessage = async (message) => {
    await huddleClient.sendDM(message, 'mainRoom', myPeerId);
  };

  return (
    <div>
      <div>Group chat</div>
      {roomChats &&
        roomChats.map((chat, i) => {
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
          makeMessage(message);
        }}
        className="btn btn-primary"
      >
        Send
      </button>
    </div>
  );
};
export default GrpChat;
