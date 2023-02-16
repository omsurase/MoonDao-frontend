import React from "react";
import { addEmployeeToGroup, createGroup, deployContract } from "@/hooks/SmartContractFunc";
import Loading from "./Loading";
import Router from "next/router";
import { APP_DOMAIN } from "@/constants/app.constants";
import { checkSbtBalance } from "@/hooks/SbtMintHook";
import { addMember } from "@/api/org.api";

export default function Modal(props) {
  const [showModal, setShowModal] = React.useState(false);
  const [orgName, setOrgName] = React.useState("");
  const [joinId, setJoinId] = React.useState("");
  const [name, setName] = React.useState(false);
  const [isLoading, setIsLoading] = React.useState(false);
  const [teamName, setTeamName] = React.useState("");
  const [task, setTask] = React.useState("");
  const [myEthAddress, setMyEthAddress] = React.useState("");

  return (
    <>
      <button
        className="btn bg-[#f71953] m-3 text-white active:bg-pink-600 font-bold uppercase text-sm px-6 py-3 rounded shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
        type="button"
        onClick={() => setShowModal(true)}
      >
        {props.clickText}
      </button>
      {showModal ? (
        <>
          <div className="justify-center items-center flex overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none">
            <div className="relative w-auto my-6 mx-auto max-w-sm">
              {/*content*/}
              <div className="border-0 rounded-lg shadow-lg relative flex flex-col w-full bg-white outline-none focus:outline-none">
                {/*header*/}
                <div className="flex items-start justify-between p-5 border-b border-solid border-blueGray-200 rounded-t">
                  <h3 className="text-3xl font-semibold">{props.title}</h3>
                  <button
                    className="p-1 ml-auto bg-transparent border-0 text-black opacity-5 float-right text-3xl leading-none font-semibold outline-none focus:outline-none"
                    onClick={() => setShowModal(false)}
                  >
                    <span className="bg-transparent text-black opacity-5 h-6 w-6 text-2xl block outline-none focus:outline-none">
                      ×
                    </span>
                  </button>
                </div>
                {/*body*/}
                <div className="relative p-6 flex-auto">
                  <p className="my-4 text-blueGray-500 text-lg leading-relaxed">
                    {props.type === "create" ? (
                      <div>
                        <input
                          type="text"
                          placeholder="Enter your name"
                          onChange={(e) => setName(e.target.value)}
                          className="input input-bordered input-primary w-full max-w-xs m-2"
                        />
                        <input
                          type="text"
                          placeholder="Organization name"
                          onChange={(e) => setOrgName(e.target.value)}
                          className="input input-bordered input-primary w-full max-w-xs m-2"
                        />
                      </div>
                    ) : props.type === "join" ? (
                      <div>
                        <input
                          type="text"
                          placeholder="Enter your name"
                          onChange={(e) => setName(e.target.value)}
                          className="input input-bordered input-primary w-full max-w-xs m-2"
                        />
                        <input
                          type="text"
                          placeholder="Organization name"
                          onChange={(e) => setJoinId(e.target.value)}
                          className="input input-bordered input-primary w-full max-w-xs m-2"
                        />
                      </div>
                    ) : props.type === "createTeam" ? (
                      <div>
                        <input
                          type="text"
                          placeholder="Enter team name"
                          onChange={(e) => setTeamName(e.target.value)}
                          className="input input-bordered input-primary w-full max-w-xs m-2"
                        />
                        <input
                          type="text"
                          placeholder="Enter team task"
                          onChange={(e) => setTask(e.target.value)}
                          className="input input-bordered input-primary w-full max-w-xs m-2"
                        />
                        <input
                          type="text"
                          placeholder="Enter your name"
                          onChange={(e) => setName(e.target.value)}
                          className="input input-bordered input-primary w-full max-w-xs m-2"
                        />
                        <input
                          type="text"
                          placeholder="Your Eth address"
                          onChange={(e) => setMyEthAddress(e.target.value)}
                          className="input input-bordered input-primary w-full max-w-xs m-2"
                        />
                      </div>
                    ) : props.type === "joinTeam" ? (
                      <div>
                        <input
                          type="text"
                          placeholder="Enter team name"
                          onChange={(e) => setTeamName(e.target.value)}
                          className="input input-bordered input-primary w-full max-w-xs m-2"
                        />
                        <input
                          type="text"
                          placeholder="Enter your name"
                          onChange={(e) => setName(e.target.value)}
                          className="input input-bordered input-primary w-full max-w-xs m-2"
                        />
                        <input
                          type="text"
                          placeholder="Your Eth address"
                          onChange={(e) => setMyEthAddress(e.target.value)}
                          className="input input-bordered input-primary w-full max-w-xs m-2"
                        />
                      </div>
                    ) : (
                      <input
                        type="text"
                        placeholder="Enter your wallet address (it will be used as a unique meeting ID)"
                        onChange={(e) => setJoinId(e.target.value)}
                        className="input input-bordered input-primary w-full max-w-xs m-2"
                      />
                    )}
                  </p>
                </div>
                {/*footer*/}
                {isLoading && <Loading />}
                <div className="flex items-center justify-end p-6 border-t border-solid border-blueGray-200 rounded-b">
                  <button
                    className="text-red-500 background-transparent font-bold uppercase px-6 py-2 text-sm outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
                    type="button"
                    onClick={() => setShowModal(false)}
                  >
                    Close
                  </button>
                  <button
                    className="bg-emerald-500 text-white active:bg-emerald-600 font-bold uppercase text-sm px-6 py-3 rounded shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
                    type="button"
                    onClick={async () => {
                      try {
                        if (props.type === "create") {
                          console.log(name);
                          setIsLoading(true);
                          const address = await deployContract(orgName, name);
                          if (address) setIsLoading(false);
                          localStorage.setItem(
                            "orgLink",
                            APP_DOMAIN + `/org/${orgName}`
                          );
                          Router.push(`/org/${orgName}`);
                          console.log(address.address);
                        } else if (props.type === "meet") {
                          Router.push(`/meeting/${joinId}`);
                        } else if (props.type === "createTeam") {
                          const tx = await createGroup(
                            teamName,
                            props.orgAddress,
                            name,
                            myEthAddress,
                            task
                          );
                        } else if (props.type === 'joinTeam') {
                          const tx = await addEmployeeToGroup(
                            teamName,
                            myEthAddress,
                            props.orgAddress,
                            name,
                          );
                          console.log(tx);
                        } else {
                          const res = await checkSbtBalance(joinId, name);
                          console.log(res);
                          if (res) Router.push(`/org/${joinId}`);
                          else
                            alert(
                              "You don't have enough SBT to join this organization"
                            );
                          // if (i.balance >= 1) {
                          //   const memberAdd = addMember(joinId, name, i.address);
                          //   console.log(memberAdd);
                          //   localStorage.setItem(
                          //     "orgLink",
                          //     APP_DOMAIN + `/org/${joinId}`
                          //   );
                          //   Router.push(`/org/${joinId}`);
                          // }
                        }
                        setShowModal(false);
                      } catch (err) {
                        setIsLoading(false);
                        console.log(err);
                      }
                    }}
                  >
                    Save Changes
                  </button>
                </div>
              </div>
            </div>
          </div>
          <div className="opacity-25 fixed inset-0 z-40 bg-black"></div>
        </>
      ) : null}
    </>
  );
}
