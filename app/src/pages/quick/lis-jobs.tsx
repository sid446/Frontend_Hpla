import React from 'react'
import { Link } from 'react-router-dom';

const jobs = [
  {
    "name": "Employment News",
    "link": "http://employmentnews.gov.in/"
  },
  {
    "name": "Government Jobs for Librarian",
    "link": "http://www.sarkari-naukri.in/jobs-by-post/librarian/"
  },
  {
    "name": "Lisjobnet",
    "link": "http://www.lisjobnet.com/"
  },
  {
    "name": "My Sarkari Naukri",
    "link": "http://www.mysarkarinaukri.com/find/librarian-jobs"
  },
  {
    "name": "Naukri.com",
    "link": "http://www.naukri.com/librarian-jobs"
  },
  {
    "name": "The Hindu: Shine Jobs",
    "link": "http://www.thehindu.com/shine-jobs/"
  },
  {
    "name": "TimesJobs.Com",
    "link": "http://www.timesjobs.com/"
  }
]

const renderJobSites = () => {
  return (
    <table className="table-auto w-full mb-8">
      <thead>
        <tr>
          <th className="px-4 py-2 bg-gray-200">S. No.</th>
          <th className="px-4 py-2 bg-gray-200">Job Sites</th>
          <th className="px-4 py-2 bg-gray-200">Links</th>
        </tr>
      </thead>
      <tbody>
        {jobs.map((site, index) => (
          <tr key={index}>
            <td className="border px-4 py-2 text-center">{index + 1}</td>
            <td className="border px-4 py-2 text-center">{site.name}</td>
            <td className="border px-4 py-2 border px-4 py-2 text-teal-600 underline dark:text-teal decoration-indigo-500">
              <Link to={site.link} target="_blank" rel="noopener noreferrer">
                {site.link}
              </Link>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};


function LISJobs() {
  return (
    <div>
      <h1 className="text-3xl mb-4">LIS Jobs</h1>
      <div className="mb-8">
        {renderJobSites()}
      </div>
    </div>
  )
}

export default LISJobs