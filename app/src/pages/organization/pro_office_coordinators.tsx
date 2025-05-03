import { useMembers } from "../../context/memberContext";

const ProOfficeCoordinator = ({ member }: { member: any }) => (
  <div className="card p-4 mt-4 max-w-screen bg-base-100 shadow-lg z-[-1]">
    <h2 className="text-2xl font-bold">
      {member.name}
    </h2>
    <p className="text-gray-500">{member.post}</p>
    <hr className="my-4" />
    <div className="flex flex-col md:flex-row gap-4">
      {member.avatar?.url && (
        <img
          className="max-h-[100px] rounded-lg"
          src={member.avatar.url}
          alt={member.name}
        />
      )}
      <div>
        <h2 className="text-xl font-semibold text-black">{member.about}</h2>
        {member.phoneNumber && (
          <p className="text-md font-semibold text-gray-500">
            Phone Number: {member.phoneNumber}
          </p>
        )}
        {member.email && (
          <p className="text-md font-semibold text-gray-500">
            Email: {member.email}
          </p>
        )}
      </div>
    </div>
  </div>
);

function ProOfficeCoordinators() {
  const { members, loading, error } = useMembers();
  
  // Filter members to only include professional office coordinators
  const proCoordinators = members.filter(member => 
    member.category === "pro" 
  );

  if (loading) return <div className="text-center py-8">Loading coordinators...</div>;
  if (error) return <div className="text-center py-8 text-red-500">Error: {error}</div>;
  if (proCoordinators.length === 0) return (
    <div className="text-center py-8">No professional office coordinators found</div>
  );

  return (
    <main className="m-5">
      <h1 className="text-3xl">Public Relations Office Coordinators</h1>
      <hr className="my-8" />
      {proCoordinators.map((member) => (
        <ProOfficeCoordinator key={member._id} member={member} />
      ))}
    </main>
  );
}

export default ProOfficeCoordinators;