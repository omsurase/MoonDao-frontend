import React from "react";
import Modal from "../styleComps/Modal";
import Link from "next/link";

function LoginOptions() {
  return (
    <div className="flex flex-col sm:flex-row my-10 py-10 w-full steps">
      <div className="mx-auto">
        <div className="card w-96 bg-base-300 shadow-xl m-4 ">
          <div className="card-body">
            <h2 className="card-title text-2xl">Create an organization!</h2>
            <div className="ml-9">
              <ul className="list-disc">
                <li className="text-lg">Video conferencing</li>
                <li className="text-lg">In-meet chats</li>
                <li className="text-lg">Live streaming</li>
                <li className="text-lg">Secure file storage</li>
                <li className="text-lg">Creation of internal teams</li>
                <li className="text-lg">Organization chats</li>
                <li className="text-lg">Team chats</li>
                <li className="text-lg">Cross-chain token exchange</li>
                <li className="text-lg">Same chain token exchange</li>
              </ul>
            </div>
            <div className="card-actions justify-end ">
              <Modal
                title={"Create an organization!"}
                clickText={"Create now!"}
                type={"create"}
              />
            </div>
          </div>
        </div>
      </div>
      <div className="mx-auto">
        <div className="card w-96 bg-base-300 shadow-xl m-4">
          <div className="card-body">
            <h2 className="card-title text-2xl">Join as a guest!</h2>
            <div className="ml-9">
              <ul className="list-disc">
                <li className="text-lg">Video conferencing</li>
                <li className="text-lg">In-meet chats</li>
              </ul>
            </div>
            <div className="card-actions justify-end">
              <Modal
                title={"Create a meeting!"}
                clickText={"Generate meeting!"}
                type={"meet"}
              />
            </div>
          </div>
        </div>
      </div>
      <div className="mx-auto">
        <div className="card w-96 bg-base-300 shadow-xl m-4">
          <div className="card-body">
            <h2 className="card-title text-2xl">Join an Organization!</h2>
            <div>
              Invited to an organization? Join now to access all the features!
            </div>
            <div className="card-actions justify-end">
              <Modal
                title={"Join an Organization!"}
                clickText={"Join now!"}
                type={"join"}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default LoginOptions;
