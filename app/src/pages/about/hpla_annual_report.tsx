import React from "react";

const reports = [
  {
    id: 1,
    name: '2019-2020',
    slug : 'https://drive.google.com/file/d/1VniBqfGTVcZJGR4MFEDxmqj3kzJX89c_/view',
  },
  {
    id: 2,
    name: '2020-2021',
    slug : 'https://drive.google.com/file/d/1e-fYyXXGeb0tZhv4SOK0gdPq8grkDmY2/view',
  },
  {
    id: 3,
    name: '2021-2022',
    slug : 'https://drive.google.com/file/d/1RokO8H31SLtSfSsN7aOCqN3LrsH1n1qT/view',
  },
  {
    id: 4,
    name: '2022-2023',
    slug : 'https://drive.google.com/file/d/1e7ADqqJ9BJ2I8166yfRF3DJu7mVtVqBg/view',
  },
  {
    id: 5,
    name: '2023-2024',
    slug : '',
  },
]

function HplaAnnualReport() {
  return (
    <main>
      <h1 className="text-3xl">Annual Reports</h1>
      <hr className="mb-8" />
      <div className="sm:grid grid-cols-3 gap-4 ">
      {
        reports.map((report) => {
          return (
            <a href={report.slug}>
              <div key={report.id} className="flex text-xl justify-center shadow-md rounded p-8 my-4 gap-4 bg-teal-500 hover:bg-teal-700 transition delay-150">
                <p className="text-white font-semibold">{report.name} report</p>
              </div>
            </a>
              
            )
        })
        }
        </div>
    </main>
  );
}

export default HplaAnnualReport;
