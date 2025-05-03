import Sudhir from "../../assets/sudhirgupta.jpg";
import sonali from "../../assets/sonali.jpg";
import shail from "../../assets/shaildeen.jpg";
import meenu from "../../assets/Meenu.jpg";
import vipan from "../../assets/vipinsharma.jpg";
import lamborghini from "../../assets/Lambodara.jpg";
import bsatwal from "../../assets/BS Atwal.jpg";
import sanjeev from "../../assets/Sanjeev Kumar.jpg";
import arun from "../../assets/Arun Kumar.jpg";

const ExecutiveMembersList = [
  {
    image: Sudhir,
    name: "Sh. Sudhir Gupta",
    position: "Assistant Librarian (retd.)",
    address:
      "Dr. Y S Parmar University of Horticulture and Forestry , Solan, Himachal Pradesh - 173223",
    mobile: "9418459260",
    email: "gupta_sud@rediffmail.com",
  },
  {
    image: vipan,
    name: "Mr. Vipan Kumar Sharma",
    position: "Assistant Librarian",
    address:
      "Jaypee University of Information Technology, Wakanghat, Solan, Himachal Pradesh - 173234",
    mobile: "9418460594",
    email: "vipin.sharma@juit.ac.in",
  },
  {
    image: lamborghini,
    name: "Mr. Lambodata Parabhoi",
    position: "Professional Assistant (LS)",
    address: "Indian Institute of Advanced Studies, Shimla - 171005",
    mobile: "8988105595",
    email: "suresh19871987@gmail.com",
  },
  {
    image: bsatwal,
    name: "Mr. B.S. Atwal",
    position: "Librarian",
    address: "Government College Nagrota Bagwan, Kangra, Himachal Pradesh",
    mobile: "9418291202",
    email: "atwalbs2109@gmail.com",
  },
  {
    image: sanjeev,
    name: "Mr. Sanjeev Kumar",
    position: "Assitant Librarian",
    address: "Central State Library, Solan, Himachal Pradesh",
    mobile: "8988195208",
    email: null,
  },
  {
    image: arun,
    name: "Mr. Arun Kumar",
    position: "Assistant Librarian",
    address:
      "HP National Law University, P.O. Shakrah, Sub Teh.- Dhami, Distt. Shimla (H.P.) - 171014",
    mobile: "8894390909",
    email: "hpnlu.arun@gmail.com",
  },
  {
    image: meenu,
    name: "Mrs. Meenu",
    position: "Assistant Librarian",
    address: "Government Degree College, Kandaghat, Solan, Himachal Pradesh",
    mobile: "9418478598",
    email: "anu.com19@gmail.com",
  },
  {
    image: shail,
    name: "Mr. Shail Deen",
    position: "Senior Professional Assistant",
    address: "NIIT University, Rajasthan",
    mobile: "8233481017",
    email: "shaildeen8@gmail.com",
  },
  {
    image: sonali,
    name: "Mrs. Sonali Malhotra",
    position: "Sr. Library Information Assistant",
    address:
      "Indian Institute of  Technology, Mandi, Himachal Pradesh - 175001",
    mobile: "9916178363",
    email: "sonali81malhotra@gmail.com",
  },
];

const ExecutiveMember = ({ member }: { member: any }) => (
          <div className="card p-4 mt-4 max-w-screen bg-base-100 shadow-lg z-[-1]">
    <h2 className="text-2xl" style={{ fontWeight: "bold" }}>
      {member.name}
    </h2>
    <p style={{ fontWeight: "unset", color: "GrayText" }}>{member.position}</p>
    <hr style={{ padding: "1.2rem" }} />
    <div>
      <img
        style={{ maxBlockSize: "100px" }}
        src={member.image}
        alt="placeholder"
      />
      <span>
      <h2 className="text-xl font-semibold text-black">{member.address}</h2>
      <p className="text-md font-thin">Phone Number : {member.mobile}</p>
      <p className="text-md font-thin">Email : {member.email}</p>
      </span>
    </div>
  </div>
);

function ExecutiveMembers() {
  return (
    <main className="m-5">
      <h1 className="text-3xl">Executive Members</h1>
      <hr className="my-8" />
      {ExecutiveMembersList.map((member, index) => (
        <ExecutiveMember key={index} member={member} />
      ))}
    </main>
  );
}

export default ExecutiveMembers;
