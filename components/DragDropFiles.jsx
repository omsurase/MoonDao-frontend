import { useRef, useState } from "react";

const DragDropFiles = ({ setFile, setEvent }) => {
  // const [files, setFile] = useState(null);
  const inputRef = useRef();
  const handleDragOver = (event) => {
    event.preventDefault();
  };
  const handleDrop = (event) => {
    event.preventDefault();
    setEvent(event);
    setFile(event.dataTransfer.files);
  };

  return (
    <>
      {
        <div
          className="dropzone bg-white items-center flex px-6 py-12 flex-col  border-2 border-dashed border-black rounded w-3/4  mx-auto"
          onDragOver={handleDragOver}
          onDrop={handleDrop}
        >
          <p className="text-xl text-gray-700">Drag and Drop files to upload</p>
          <p className="mb-2">or</p>
          <input
            type="file"
            multiple
            onChange={(event) => {
              setFile(event.target.files[0]);
              setEvent(event);
              console.log(event.target.files[0]);
            }}
            hidden
            ref={inputRef}
          />
          <label className="bg-white  px-4 h-9 inline-flex items-center rounded border border-grey-300 shadow-sm text-sm font-medium text-grey-700 focus-within:ring-2 focus-within:ring-offset-2 focus:focus-within:ring-indigo-500">
            <button onClick={() => inputRef.current.click()}>
              <p className="text-gray-700">Select Files</p>
            </button>
          </label>
        </div>
      }
    </>
  );
};

export default DragDropFiles;
