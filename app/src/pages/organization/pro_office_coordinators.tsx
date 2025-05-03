import suresh from "../../assets/sudeshsood.jpg";
import anil from "../../assets/aniltomar.jpg";

const ProOfficeCoordinatorsList = [
  {
    image: suresh,
    name: "Mr. Suresh Sood",
    position: "Librarian (retd.)",
    address:
      "Dr. Y S Parmar University of Horticulture and Forestry , Solan, Himachal Pradesh - 173223",
    mobile: "9418490033",
    email: "sudeshsood@gmail.com",
  },
  {
    image: anil,
    name: "Dr. Anil Kumar",
    position: "Sr. Professional Assistant",
    address:
      "Jaypee University of Information Technology, Wakanghat, Solan, Himachal Pradesh – 173234",
    mobile: "9816508308",
    email: "anilkumar1965@gmail.com",
  },
];

const ProOfficeCoordinator = ({ member }: { member: any }) => (
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
      <p className="text-md font-semibold text-gray-500">Phone Number : {member.mobile}</p>
      <p className="text-md font-semibold text-gray-500">Email : {member.email}</p>
      </span>
    </div>
  </div>
);

function ProOfficeCoordinators() {
  return (
    <main className="m-5">
      <h1 className="text-3xl">Public Relations Office Coordinators</h1>
      <hr className="my-8" />
      {ProOfficeCoordinatorsList.map((member, index) => (
        <ProOfficeCoordinator key={index} member={member} />
      ))}
    </main>
  );
}

export default ProOfficeCoordinators;
