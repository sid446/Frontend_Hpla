import React from 'react'
import { Link } from 'react-router-dom';

const education = [
  {
    "sno": "1",
    "dept_name": "Department of Library & Information Science",
    "address": "Himachal Pradesh University, Summer Hill, Shimla - 171005",
    "name": "Prof. Umesh Kumar, Chairman",
    "contact": "9418150013",
    "email": "uks.hpu@gmail.com",
    "program": "B.Lib",
    "website": "https://hpuniv.ac.in/university-detail/home.php?library-and-information-science",
  },
  {
    "sno": "2",
    "dept_name": "Department of Library & Information Science",
    "address": "Central University of Himachal Pradesh, Shahpur Parisar, Distt Kangra, HP - 176206",
    "name": "Dr. Shivarama Rao K, Associate Professor & Head",
    "contact": "9552580028",
    "email": "shiva.perla@gmail.com",
    "program": "B.Lib, M.Lib, Ph.D",
    "website": "https://www.cuhimachal.ac.in/index.php/SMCIS/department/dept_library_science",
  },
  {
    "sno": "3",
    "dept_name": "IGNOU Regional Centre",
    "address": "Block No. 9, SDA Complex, Kasumpti, Shimla, HP-171009",
    "name": "Regional Director",
    "contact": "0177-2624612 / 2624613",
    "email": "rcshimla@ignou.ac.in",
    "program": "B.Lib, M.Lib, Ph.D",
    "website": "http://www.ignou.ac.in/ignou/aboutignou/school/soss/programmes/detail/96/1",
  },
  {
    "sno": "4",
    "dept_name": "School of Art & Humanities",
    "address": "Arni University, (Kathgarh),Tehsil Indora, Distt. Kangra,Himachal Pradesh Pin-176401",
    "name": "Mr. Amit Kumar, Assistant Professor",
    "contact": "9418601409",
    "email": "admission@arniuniversity.edu.in",
    "program": "B.Lib, M.Lib, Ph.D",
    "website": "https://arni.in/ArniSchool02/LibraryScience",
  },
  {
    "sno": "5",
    "dept_name": "Department of Library & Information Science",
    "address": "Eternal University, Baru Sahib, Distt. Sirmour, Near Rajgarh, Himachal Pradesh-173101",
    "name": "Dr. Meenakshi Gupta, Dy. Librarian",
    "contact": "9817614914",
    "email": "meenakshilib@eternaluniversity.edu.in",
    "program": "B.Lib",
    "website": "https://eternaluniversity.edu.in/courses/b-lib",
  }
];


const rendercentral = () => {
  return (
    <table className="table-auto w-full mb-8 mr-3">
      <thead>
        <tr>
          <th className="px-3 py-2 bg-gray-200">S. No.</th>
          <th className="px-3 py-2 bg-gray-200">Dept name</th>
          <th className="px-3 py-2 bg-gray-200">Address</th>
          <th className="px-3 py-2 bg-gray-200">Program</th>
          <th className="px-3 py-2 bg-gray-200">Website</th>
        </tr>
      </thead>
      <tbody>
        {education.map((item, index) => (
          <tr key={index}>
            <td className="border px-3 py-2">{item.sno}</td>
            <td className="border px-3 py-2">{item.dept_name}</td>
            <td className="border px-3 py-2">{item.address}</td>
            <td className="border px-3 py-2">{item.program}</td>
            <td className="border px-2.5 py-2"><Link to={item.website} target='_blank' className='text-teal-600 underline decoration-indigo-500' rel="noreferrer">Open Site</Link></td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};


function LISEducation() {
  return (
    <div>
      <h1 className="text-3xl mb-4">LIS Education</h1>
      <div className="mb-8">
        <div>
          {rendercentral()}
        </div>
      </div>
    </div>
  )
}

export default LISEducation