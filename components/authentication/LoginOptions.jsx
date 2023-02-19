import React from "react";
import Modal from "../styleComps/Modal";
import Link from "next/link";

function LoginOptions() {
  return (
    <div className="flex flex-col sm:flex-row pt-10 py-10 w-full steps">
      <div className="mx-auto">
        <div className="card w-96 bg-white shadow-xl m-4 ">
          <div className="card-body">
            <h2 className="card-title text-2xl">Create an organization!</h2>
            <div className="ml-9">
              <ul className="list-disc">
                <li className="text-lg">Video conferencing</li>

                <li className="text-lg ">Live streaming</li>
                <li className="text-lg">Secure file storage</li>

                <li className="text-lg">chats</li>

                <li className="text-lg">Cross-chain token exchange</li>
                <li className="text-lg">Same chain token exchange</li>
                <li className="text-lg">Create Listings</li>
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
        <div className="card w-96 bg-white shadow-xl m-4">
          <div className="card-body">
            <h2 className="card-title text-black text-2xl">
              Join an Organization!
            </h2>
            <div className="text-black">
              You should have an invitational Soul Bound Token to join an
              organisation.
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
