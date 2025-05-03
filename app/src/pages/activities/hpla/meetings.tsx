import React from "react";
import { Link } from "react-router-dom";

const meetings = [
  {
    "name" : "Minutes of the Governing Body and General Body meeting of HPLA held at Zurich Resorts, Kandaghat on 07, 2024",
    "link" : "https://drive.google.com/file/d/1a_pJ3n8J4PIiDuVTjGIlC1Bf77iGpMC4/view",
  },
  {
    "name" : "Minutes of the Governing Body and General Body meeting of HPLA held at IIAS, Shimla on Nov 27, 2022",
    "link" : "https://hplas.org/MINUTES_27.11.2022.pdf",
  },
  {
    "name" : "Minutes of the 1st GB meeting of HPLA held at JUIT Waknaghat on January 19, 2020",
    "link" : "https://drive.google.com/file/d/1Za4V186Juh6_q-nvJ_BjgVBSxhvokm1Q/view?usp=sharing",
  },
  {
    "name" : "Minutes of HPLA Ad-hoc committee meeting held at JUIT Waknaghat on April 21, 2019",
    "link" : "https://hplas.org/minutes21-04-19.pdf",
  },
  {
    "name" : "Minutes of the 1st preliminary meeting of HPLA held at IIAS, Shimla on October 19, 2018",
    "link" : "https://hplas.org/minutes19-10-2018.pdf",
  },
  
]

const rendermeetings = () => {
  return (
    <table className="table-auto w-full mb-8">
      <thead>
      </thead>
      <tbody>
        {meetings.map((item, index) => (
          <tr key={index}>
            <li className="list-disc mt-1"></li>
            <td className="border px-4 py-2 text-teal-500">
              <Link to={item.link} target="_blank" rel="noopener noreferrer">
                {item.name}
              </Link>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};

function Meetings() {
  return(
    <div>
      <h1 className="text-3xl mb-4">Meetings</h1>
      <hr className="my-4" />
      <div className="mb-8">
        <div>
          {rendermeetings()}
        </div>
      </div>
    </div>
  );
}

export default Meetings;
