import React from "react";

const Loading = () => {
  return (
    <div>
      <div className="flex items-center justify-center p-6 border-t border-solid border-blueGray-200 rounded-b">
        <div className="flex items-center justify-center p-6 border-t border-solid border-blueGray-200 rounded-b">
          <svg
            className="animate-spin -ml-1 mr-3 h-5 w-5 text-white"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
          >
            <circle
              className="opacity-25"
              cx="12"
              cy="12"
              r="10"
              stroke="currentColor"
              stroke-width="4"
            ></circle>
            <path
              className="opacity-75"
              fill="currentColor"
              d="M4 12a8 8 0 018-8v1a7 7 0 00-7 7h1z"
            ></path>
          </svg>
          <h1 className="text-white font-bold">Loading...</h1>
        </div>
      </div>
    </div>
  );
};

export default Loading;
