import React from "react";
import { Chat } from "@pushprotocol/uiweb";
import { useState, useEffect } from "react";
import { getethAddress } from "@/hooks/getAddress.hook";
import ChatComp from "@/components/Chat/ChatComp";
import OrgChats from "./OrgChats";

const OrgMembers = ({ members, org }) => {
  const [hidden, setHidden] = useState(true);
  const [hiddenGrpChats, setHiddenGrpChats] = useState(true);
  // console.log(lobbyPeers);
  const [myEthAddress, setMyEthAddress] = useState("");
  const [receiverEthAddress, setReceiverEthAddress] = useState("");
  const [receiverName, setReceiverName] = useState(
    "0x0d75194C804C26912F233A0072A4816DDdcf3173"
  );
  const [receiverPeerId, setReceiverPeerId] = useState("");

  useEffect(() => {
    const getAddress = async () => {
      const ethAddress = await getethAddress();
      setMyEthAddress(ethAddress);
    };
    getAddress();
  }, []);

  return (
    <div>
      <div className="overflow-x-auto m-1 text-white">
        <table className="table w-fit mx-auto h-1/2 overflow-y-auto">
          <thead>
            <tr>
              <th></th>
              <th>Name</th>
              <th>Address</th>
              <th>Team</th>
              <th>Push Chat</th>
            </tr>
          </thead>
          <tbody>
            {members &&
              members.map((member, index) => {
                return (
                  <tr key={index} className={index % 2 === 0 ? `active` : ""}>
                    <th>{index + 1}</th>
                    <td>{member.memberName}</td>
                    <td>{member.memberEthAddress}</td>
                    <td>{member.team}</td>
                    <td
                      onClick={() => {
                        setReceiverEthAddress(member.peerEthAddress);
                        console.log(receiverEthAddress);
                        setReceiverName(member.peerName);
                        console.log(receiverName);
                        setReceiverPeerId(member.peerId);
                        setHidden(!hidden);
                        // console.log(myEthAddress)
                      }}
                    >
                      <div>
                        <ChatComp
                          sender={myEthAddress}
                          receiver="0x0d75194C804C26912F233A0072A4816DDdcf3173" //receiverEthAddress change this at later stage
                          name="Rohan" // change this at later stage
                        />
                      </div>
                      Chat
                    </td>
                  </tr>
                );
              })}

            {/* <tr>
              <th>1</th>
              <td>Team (x)</td>
              <td>Finance</td>
            </tr>
            <tr className="active">
              <th>2</th>
              <td>Team (x)</td>
              <td>Tech</td>
            </tr>
            <tr>
              <th>3</th>
              <td>Team (x)</td>
              <td>Cloud</td>
            </tr> */}
          </tbody>
        </table>
      </div>
      <div>
        <OrgChats orgAddress={org?.orgAddress} />
      </div>
    </div>
  );
};

export default OrgMembers;
