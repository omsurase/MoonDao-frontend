import React from "react";
import { Chat } from "@pushprotocol/uiweb";

const ChatComp = (props) => {
  return (
    <div>
      <Chat
        account={props.sender} //user address
        supportAddress={props.receiver} //support address
        apiKey='iDRMswdehJG7NpHDiECIHwYMMv6k2KzkPJscFIDyW8TtSnk4blYnGa8DIkfuacU0'
        env="staging"
        modalTitle={`Chat with ${props.name}`}
      />
    </div>
  );
};

export default ChatComp;
