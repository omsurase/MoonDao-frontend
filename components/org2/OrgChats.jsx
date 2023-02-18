import AxiosJsInstance from "@/hooks/AxiosInstance";
import { getWalletDetails } from "@/hooks/getAddress.hook";
import React, { useEffect } from "react";
// import { getOrganization } from "@/api/org.api";

const OrgChats = ({ orgAddress, orgChatss, orgName }) => {
  const [orgChats, setOrgChats] = React.useState([]);
  const [userChat, setUserChat] = React.useState([]);
  const [myPeerId, setMyPeerId] = React.useState();

  useEffect(() => {
    const setId = async () => {
      const { address } = await getWalletDetails();
      setMyPeerId(address);
    };
    setId();
  }, []);

  useEffect(() => {
    const getChats = async () => {
      if (orgAddress === undefined) return;
      // const org = await getOrganization(orgName);
      // setOrgChats(org?.chats);
      const { data } = await AxiosJsInstance.post("/api/orgChat/getChats", {
        orgAddress: orgAddress,
      });
      setOrgChats(data.chats);
    };
    getChats();
  }, [orgAddress]);
  // useEffect(() => {
  //   if (orgChatss === undefined) return;
  //   setOrgChats(orgChatss);
  // }, [orgChatss]);
  return (
    <div className="my-4 mx-4">
      <div className="flex flex-col bg-base-300 h-3/4 overflow-y-auto m-4 pb-4 mt-10 rounded-2xl">
        <button
          className="text-2xl btn-outline btn-accent mx-auto m-4 p-2 w-fit"
          onClick={() => {
            const getChats = async () => {
              if (orgAddress === undefined) return;
              // const org = await getOrganization(orgName);
              // setOrgChats(org?.chats);
              const { data } = await AxiosJsInstance.post(
                "/api/orgChat/getChats",
                {
                  orgAddress: orgAddress,
                }
              );
              setOrgChats(data.chats);
            };
            getChats();
          }}
        >
          Chatbox ↻
        </button>
        <hr />
        <br />
        {orgChats &&
          orgChats.map((chat, i) => {
            return chat.peerId === myPeerId ? (
              <div key={i} className="chat chat-end  p-2">
                <div className="chat-header">
                  {chat?.displayName}
                  <time className="text-xs opacity-50">
                    {chat?.timestamp?.slice(11, 16)}
                  </time>
                </div>
                <div className="chat-bubble">{chat?.message}</div>
              </div>
            ) : (
              <div key={i} className="chat chat-start p-2">
                <div className="chat-header">
                  {chat?.displayName}
                  <time className="text-xs opacity-50">
                    {chat?.timestamp?.slice(11, 16)}
                  </time>
                </div>
                <div className="chat-bubble">{chat?.message}</div>
              </div>
            );
          })}
      </div>
      <div className="flex mx-5 bg-base-300 p-4 rounded-2xl">
        <input
          type="text"
          placeholder="Type here"
          className="input input-bordered input-primary w-5/6 mx-auto "
          onChange={(e) => setUserChat(e.target.value)}
        />
        <button
          className="btn btn-outline btn-accent mr-2"
          onClick={() => {
            AxiosJsInstance.post("/api/orgChat/addChat", {
              orgAddress: orgAddress,
              message: userChat,
              senderEthAddress: myPeerId,
            });
          }}
        >
          Send
        </button>
      </div>
    </div>
  );
};

export default OrgChats;
