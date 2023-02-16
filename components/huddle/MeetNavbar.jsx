import React from 'react'
import { APP_NAME } from '@/constants/app.constants'
import { useHuddleStore } from '@huddle01/huddle01-client/store'

const MeetNavbar = (props) => {
    // console.log(props);
  const peerId = useHuddleStore((state) => state.peerId);
  return (
    <div>
      <div className="drawer text-lg h-fit bg-base-200">
          <input id="my-drawer-3" type="checkbox" className="drawer-toggle" />
          <div className="drawer-content flex flex-col">
            <div className="w-full navbar bg-neutral">
              <div className="flex-none lg:hidden">
                <label
                  htmlFor="my-drawer-3"
                  className="btn btn-square btn-ghost"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    className="inline-block w-6 h-6 stroke-current"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M4 6h16M4 12h16M4 18h16"
                    ></path>
                  </svg>
                </label>
              </div>
              <div className="flex-1 px-2 mx-2 text-2xl">{APP_NAME}</div>
              <div className="flex-none hidden lg:block">
                <ul className="menu menu-horizontal">
                  <li>
                    <a>Meet ID: {props.roomId}</a>
                  </li>
                  <li>
                    <a>User: {props.name}</a>
                  </li>
                  <li>
                    <a>Peer ID: {peerId}</a>
                  </li>
                </ul>
              </div>
            </div>
          </div>
          {/* <div className="inline-block sm:hidden drawer-side">
            <label htmlFor="my-drawer-3" className="drawer-overlay"></label>
            <ul className="menu p-4 w-80 bg-base-100">
              <li>
                <a>Sidebar Item 1</a>
              </li>
              <li>
                <a>Sidebar Item 2</a>
              </li>
            </ul>
          </div> */}
        </div>
    </div>
  )
}

export default MeetNavbar
