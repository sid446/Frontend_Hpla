import { useMembers } from "../../context/memberContext";

function OfficeBearers() {
  const { members, loading, error } = useMembers();
  
  // Filter members to only include office bearers
  const officeBearers = members.filter(member => member.category === "office");

  if (loading) return <div className="text-center py-8">Loading office bearers...</div>;
  if (error) return <div className="text-center py-8 text-red-500">Error: {error}</div>;
  if (officeBearers.length === 0) return <div className="text-center py-8">No office bearers found</div>;

  return (
    <main className="m-5">
      <h1 className="text-3xl">Office Bearers</h1>
      <hr className="my-4" />
      
      {officeBearers.map((member) => (
        <div key={member._id} className="card p-4 mt-4 max-w-screen bg-base-100 shadow-lg z-[-1]">
          <h2 className="text-3xl font-bold">
            {member.post} {/* Using 'post' for role/position */}
          </h2>
          <p className="font-semibold text-xl">
            {member.name} {/* Using 'name' for person's name */}
          </p>
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
              <h2 className="text-xl font-semibold text-black">
                {member.about || member.about} {/* Using 'about' for address */}
              </h2>
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
      ))}
    </main>
  );
}

export default OfficeBearers;