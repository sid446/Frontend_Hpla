const CommitteeMembers = [
  {
    address: "YS Parmar University, Nauni",
    name: "Shri Sudesh Sood",
    position: "Retd. Librarian",
  },
  {
    address: " RGM Govt. College Jogindernagar, Mandi",
    name: "Shri Roop Lal Rana",
    position: "Librarian",
  },
  {
    address: "Govt. College NagrotaBagwan, Kangra",
    name: "Shri B S Atwal",
    position: "Librarian",
  },
  {
    address: "SCVB Govt College Palampur, Kangra",
    name: "Shri Mahesh Sood",
    position: "Librarian",
  },
];

function Committees() {
  return (
    <main>
    <h1 className="text-3xl">Committees</h1>
      <hr className="my-4" />
      <h3 className="text-3xl text-blue-600 font-semibold py-3">LIS professionals at par with teachers</h3>
      <h4 className="text-md font-bold py-3">Committee to compile a detailed document of different norms related to LIS professionals in the State and other Indian states.</h4>
      
      {
        CommitteeMembers.map((grp) => (
          <div className="my-2 shadow-sm p-3 border border-1 rounded">
            <ul className="list-inside text-left">
              <li className=" font-semibold"> {grp.name} ({grp.address})
                <div className="font-semibold text-blue-600">{grp.position}</div>
              </li>
            </ul>
          </div>
        ))
      }

      <h3 className="text-3xl text-blue-600 font-semibold py-3">Himachal Pradesh Library Legislation – to compile a draft</h3>
      <div className="my-2">
            <ul className="list-inside text-left">
          <li className=" my-2 shadow-sm p-3 border border-1 font-semibold rounded"> Prof. A S Chandel (DLIS,NEHU) <br/> <div className="font-semibold text-blue-600 ">  Former Professor and head </div></li>
          <li className=" my-2 shadow-sm p-3 border border-1 font-semibold rounded"> Shri T R Sharma (Himachal Pradesh)<br /> <div className="font-semibold text-blue-600 ">  Librarian <br />  Directorate of Higher Education</div></li>
          <li className=" my-2 shadow-sm p-3 border border-1 font-semibold rounded"> Dr. Suresh K Chauhan (JUIT, Waknaghat)<br /> <div className="font-semibold text-blue-600 ">  Dy Librarian</div></li>
            </ul>
          </div>
    </main>
  );
}

export default Committees;
