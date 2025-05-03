import React from 'react';
import { Link } from 'react-router-dom';

const states2 = [
  {
    "id": 1,
    "state": "Assam",
    "link": "N/A"
  },
  {
    "id": 2,
    "state": "Sikkim",
    "link": "N/A"
  },
  {
    "id": 3,
    "state": "Nagaland",
    "link": "N/A"
  },
  {
    "id": 4,
    "state": "Meghalaya",
    "link": "N/A"
  },
  {
    "id": 5,
    "state": "Madhya Pradesh",
    "link": "N/A"
  },
  {
    "id": 6,
    "state": "Jharkhand",
    "link": "N/A"
  },
  {
    "id": 7,
    "state": "Himachal Pradesh",
    "link": "N/A"
  },
  {
    "id": 8,
    "state": "Punjab",
    "link": "N/A"
  }
]

const states = [
  {
    "id": 1,
    "state": "Andhra Pradesh Library Act",
    "link": "https://drive.google.com/file/d/1P_AYsQjw4RpLr3TRJmKvhYezobEvuM5k/view?usp=sharing"
  },
  {
    "id": 2,
    "state": "Arunachal Pradesh Library Act",
    "link": "https://drive.google.com/file/d/16Ck53-YZHnmn-baZbwLIlmFt-_6TPxPQ/view?usp=sharing"
  },
  {
    "id": 3,
    "state": "Bihar Library Act",
    "link": "https://drive.google.com/file/d/1WIZnLJMMyaLBHSUOya1SvTw41pS7G_yK/view?usp=sharing"
  },
  {
    "id": 4,
    "state": "Chattishgarh Library Act",
    "link": "https://drive.google.com/file/d/1VpdARQIgFsVYBlhK74lBr4okMUCPMCXm/view?usp=sharing"
  },
  {
    "id": 5,
    "state": "Goa Library Act",
    "link": "https://drive.google.com/file/d/1eYOaNMFF6sIjVl1onSg-Cwk5uegM8Qoc/view?usp=sharing"
  },
  {
    "id": 6,
    "state": "Gujrat Library Act",
    "link": "https://drive.google.com/file/d/1eYOaNMFF6sIjVl1onSg-Cwk5uegM8Qoc/view?usp=sharing"
  },
  {
    "id": 7,
    "state": "Haryana Libray Bill",
    "link": "https://drive.google.com/file/d/1XzN4vc95snT_naeH9KS0hBJWHTfnz3pl/view?usp=sharing"
  },
  {
    "id": 8,
    "state": "Karnataka Public Libraries Act",
    "link": "https://drive.google.com/file/d/1ttdsdmw7SGWl5czYu7v9BM-Sz5ALd_gk/view?usp=sharing"
  },
  {
    "id": 9,
    "state": "Kerala Public Library Act",
    "link": "https://drive.google.com/file/d/1G7uj3ZghInqUbHYhYijz8jIIHiL_j8O7/view?usp=sharing"
  },
  {
    "id": 10,
    "state": "The Madras Public Library Act",
    "link": "https://drive.google.com/file/d/1dockWPTHgk7i1uPzkwug_Rgxp-NpMJld/view?usp=sharing"
  },
  {
    "id": 11,
    "state": "Maharastra Public Libraries Act",
    "link": "https://drive.google.com/file/d/1WqAuDOx2-6zw-ZSwJ2O9tKsE8AvLSMkx/view?usp=sharing"
  },
  {
    "id": 12,
    "state": "Manipur Public Libraries Act",
    "link": "https://drive.google.com/file/d/1Al7l3hWux6bO2TmYFBRgqoImSCequLFp/view?usp=sharing"
  },
  {
    "id": 13,
    "state": "Mizoram Public Libraries Act",
    "link": "https://drive.google.com/file/d/1Kwg54RmAZ01AIqyqG12FESrcE68iWjnW/view?usp=sharing"
  },
  {
    "id": 14,
    "state": "Odisha Public Libraries Act",
    "link": "https://drive.google.com/file/d/1ig8PLKVA5aqzbnT4MjIxBaKyzYtGuHaT/view?usp=sharing"
  },
  {
    "id": 15,
    "state": "Rajasthan Public Libraries Act",
    "link": "https://drive.google.com/file/d/1Dsq-7eiixvxAyZiSp3PlrejdcxP6zrmm/view?usp=sharing"
  },
  {
    "id": 16,
    "state": "The Uttar Pradesh Public Libraries Act",
    "link": "https://drive.google.com/file/d/1a8tRBwvHWEOwZ1N2cHLxFDoNifF7a0fm/view?usp=sharing"
  },
  {
    "id": 17,
    "state": "Uttaranchal Public Libraries Act",
    "link": "https://drive.google.com/file/d/1Gf334dzm8tIYSRPBt_3M8gcbATe73-Ds/view?usp=sharing"
  },
  {
    "id": 18,
    "state": "The West Bengal Public Libraries Act",
    "link": "https://drive.google.com/file/d/1W9zVhZPDnMdWj4TvwX0IgHLVSrKIBqVl/view?usp=sharing"
  },
  {
    "id": 19,
    "state": "Telengana Public Libraries Act",
    "link": "https://drive.google.com/file/d/18hG_xGZEkLpZqFlR8k3P57nJlGMNJsX3/view?usp=sharing"
  }

];

function PublicLibraryAct() {
  const renderTable = () => {
    return (
      <table className="table-auto">
        <thead>
          <tr>
            <th className="border px-4 py-2 text-2xl font-bold text-gray-900 dark:text-black">S. No.</th>
            <th className="border px-8 py-2 text-2xl font-bold text-gray-900 dark:text-black">States</th>
            <th className="border px-4 py-2 text-2xl font-bold text-gray-900 dark:text-black">Links</th>
          </tr>
        </thead>
        <tbody>
          {states.map((state) => (
            <tr key={state.id}>
              <td className="border px-4 py-2 text-center">{state.id}.</td>
              <td className="text-center border px-40 py-2">{state.state}</td>
              <td className="border px-2 py-2 text-teal-600 text-center underline dark:text-teal decoration-indigo-500"><Link to={state.link} target="_blank" rel="noopener noreferrer">View</Link></td>
            </tr>
          ))}
        </tbody>
      </table>
    );
  };

  const renderTable2 = () => {
    return (
      <table className="table-auto">
        <thead>
          <tr>
            <th className="border px-4 py-2 text-2xl font-bold text-gray-900 dark:text-black">S. No.</th>
            <th className="border px-8 py-2 text-2xl font-bold text-gray-900 dark:text-black">States</th>
            <th className="border px-4 py-2 text-2xl font-bold text-gray-900 dark:text-black">Links</th>
          </tr>
        </thead>
        <tbody>
          {states2.map((state) => (
            <tr key={state.id}>
              <td className="border px-4 py-2 text-center">{state.id}.</td>
              <td className="text-center border px-40 py-2">{state.state}</td>
              <td className="border px-2 py-2 text-teal-600 text-center dark:text-teal decoration-indigo-500">N/A</td>
            </tr>
          ))}
        </tbody>
      </table>
    );
  };

  return (
    <div>
      <h1 className="text-3xl mb-4">Public Library Acts</h1>
      <hr className='p-3' />
      <div className="flex items-center justify-center flex-col">
        <div className='mb-8'>{renderTable()}</div>
        <h2 className="text-2xl text-rose-400 font-semibold mb-4">Public Library Act has not been passed in the following states</h2>
        <hr className='p-3' />
        <div className="flex justify-start">{renderTable2()}</div>
      </div>
    </div>
  );
}

export default PublicLibraryAct;
