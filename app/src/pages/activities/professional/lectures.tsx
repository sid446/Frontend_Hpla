import React from "react";

const sessions = [
  { sessionNo: 1, topic: "National Digital Library (NDL)", date: "16 Nov 2023 (11:00 – 12:00)", deliveredBy: "Mr. Ashok Bhatt" },
  { sessionNo: 2, topic: "Serials Module (KOHA)", date: "17 Nov 2023 (11:00 – 12:00)", deliveredBy: "Dr. Anil Tomar" },
  { sessionNo: 3, topic: "Acquisition Module (KOHA)", date: "18 Nov 2023 (11:00 – 12:00)", deliveredBy: "Dr. Vipin Sharma" },
];


function Lectures() {
  return (
    <div className="p-3">
    <h1 className="text-3xl">Lectures</h1>
      <hr className="my-5" />
      <div className="flex flex-col gap-8">
        <p>The aim of our lecture sessions is to educate our library professionals on recent advancements in the field of library science for making use of technology, networking and collaboration among library professionals. The details of arranged session as under:-   </p>
        <table className="table-auto w-full text-left">
      <thead>
        <tr className="bg-gray-100 text-gray-700 font-medium">
          <th className="px-4 py-2">Session No</th>
          <th className="px-4 py-2">Topic</th>
          <th className="px-4 py-2">Time & Date</th>
          <th className="px-4 py-2">Delivered By</th>
        </tr>
      </thead>
      <tbody>
        {sessions.map((session) => (
          <tr key={session.sessionNo} className="border-b border-gray-200">
            <td className="px-4 py-2">{session.sessionNo}</td>
            <td className="px-4 py-2">{session.topic}</td>
            <td className="px-4 py-2">{session.date}</td>
            <td className="px-4 py-2">{session.deliveredBy}</td>
          </tr>
        ))}
      </tbody>
    </table>
      </div>
    </div>
  );
}

export default Lectures;
