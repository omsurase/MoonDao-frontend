import React from "react";
import { useHuddleStore } from "@huddle01/huddle01-client/store";
import { huddleClient } from "@/constants/api.constants";   

function Chat({ roomId, fromPeerId }) {
  //   console.log(roomId);
  const [message, setMessage] = React.useState("");
  const [id, setId] = React.useState("");
  const roomChats = useHuddleStore((state) => state.chat);
  const peers = useHuddleStore((state) => state.peers);
  const myPeerId = useHuddleStore((state) => state.peerId);
  const setChat = useHuddleStore((state) => state.setChat);


  const makeMessage = async (message, id) => {
    // const peer = getPeer();
    // setChat({
    //     id: Math.random(),
    //     peerId: myPeerId,
    //     displayName: 'Soham',
    //     type: 'text',
    //     message: message,
    // }, id);
    await huddleClient.sendDM(message, id, myPeerId);
  };

  console.log(roomChats);

  return (
    <div>
      <div>{/* fromPeerId : {fromPeerId} */}</div>
      {roomChats[fromPeerId]?.map((chat) => (
        <div key={chat?.id}>
          <p>DisplayName: {chat?.displayName}</p>
          <p>Message: {chat?.message}</p>
          <p>ChatId: {chat?.id}</p>
        </div>
      ))}
      <hr />
      Group chat
      {roomChats["mainRoom"]?.map((chat) => (
        <div key={chat?.id}>
          <p>DisplayName: {chat?.displayName}</p>
          <p>Message: {chat?.message}</p>
          <p>ChatId: {chat?.id}</p>
        </div>
      ))}
      <input
        type="text"
        placeholder="Please enter your message"
        onChange={(e) => {
          setMessage(e.target.value);
        }}
        className="input input-bordered input-primary w-full my-2"
      />
      <input
        type="text"
        placeholder="Please enter id"
        onChange={(e) => {
          setId(e.target.value);
        }}
        className="input input-bordered input-primary w-full my-2"
      />
      <button
        onClick={() => {
          makeMessage(message, id);
        }}
        className="btn btn-primary"
      >
        Send
      </button>
    </div>
  );
}

export default Chat;
