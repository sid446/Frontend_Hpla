import PremChand from "../../assets/Prem Chand.jpg";
import TRSharma from "../../assets/trsharma.jpg";
import Suresh from "../../assets/Suresh Chauhan.jpg";
import Arun from "../../assets/Arun Bala.jpg";
import Poonam from "../../assets/poonam.jpg";
import Yoshoda from "../../assets/Yoshodha.jpg";

const OfficeBearerMembers = [
  {
    image: PremChand,
    name: "President",
    position: "Sh. Prem Chand",
    address:
      "Indian Institute of Advanced Studies, Shimla - 171005(Address for Correspondence:Red Stone, IIAS Shimla - 171005)",
    mobile: "9816016593",
    email: "chanprem@gmail.com",
  },
  {
    image: TRSharma,
    name: "Vice President",
    position: "Sh. T.R. Sharma",
    address: "Directorate of Higher Education Shimla, Himachal Pradesh",
    mobile: "9816467875",
    email: "trssharma5135@gmail.com",
  },
  {
    image: Suresh,
    name: "General Secretary",
    position: "Dr. Suresh Kumar",
    address:
      "Jaypee University of Information Technology, Wakanghat, Solan, Himachal Pradesh - 173234",
    mobile: "9555626161",
    email: "sureshbabal@gmail.com",
  },
  {
    image: Arun,
    name: "Treasurer",
    position: "Mrs. Arun Bala",
    address: "Government College Arki, Solan, Himachal Pradesh",
    mobile: "9418474511",
    email: "arunsanjay.99@gmail.com",
  },
  {
    image: Poonam,
    name: "Joint Secretary I",
    position: "Mrs. Poonam Sharma",
    address:
      "Rajkiya Kanya Maha Vidyalaya (RKMV) Longwood Rd, Longwood, Shimla, Himachal Pradesh 171001",
    mobile: "9418038274",
    email: "poonamshrm02@gmail.com",
  },
  {
    image: Yoshoda,
    name: "Joint Secretary II",
    position: "Mrs. Yoshodha Negi",
    address:
      "Dr. YS Parmar University of Horticulture and Forestry, Nauni, Solan, Himachal Pradesh 173230",
    mobile: "9418434826",
    email: "yashodha_40@rediffmail.com",
  },
];

function OfficeBearers() {
  return (
    <main style={{ margin: "20px" }}>
      <h1 className="text-3xl">Office Bearers</h1>
      <hr style={{ padding: "2rem" }} />
      {OfficeBearerMembers.map((member) => {
        return (
          <div className="card p-4 mt-4 max-w-screen bg-base-100 shadow-lg z-[-1]">
            <h2 className="text-3xl" style={{ fontWeight: "bold" }}>
              {member.name}
            </h2>
            <p className="font-semibold text-xl">
              {member.position}
            </p>
            <hr className="p-[1.2rem]" />
            <div>
              <img
                style={{ maxBlockSize: "100px" }}
                src={member.image}
                alt="placeholder"
              />
              <span>
                <h2 className="text-xl font-semibold text-black">{member.address}</h2>
                <p className="text-md font-semibold text-gray-500">Phone Number : {member.mobile}</p>
                <p className="text-md font-semibold text-gray-500">Email : {member.email}</p>
              </span>
            </div>
          </div>
        );
      })}
    </main>
  );
}

export default OfficeBearers;
