import React from "react";
import Link from "next/link";

const Recordings = ({ recordings }) => {
  return (
    <div>
      <h1>Recordings</h1>
      <table className="table w-fit">
        <thead>
          <tr>
            <th></th>
            <th>Sr. No.</th>
            <th>Download now</th>
            <th>Duration</th>
            <th>Size</th>
          </tr>
        </thead>
      </table>
      {recordings.map((recording, i) => {
        return (
            <tr key={i}>
              <th>{i + 1}</th>
              <td>
                <Link href={recording.url}> Download now! </Link>{" "}
              </td>
              <td>{recording.duration / 1000}s</td>
              <td>{recording.size} Mb</td>
            </tr>
        );
      })}
    </div>
  );
};

export default Recordings;
