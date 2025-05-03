import { useMembers } from "../../context/memberContext";

const ExecutiveMember = ({ member }: { member: any }) => (
  <div className="card p-4 mt-4 max-w-screen bg-base-100 shadow-lg z-[-1]">
    <h2 className="text-2xl font-bold">
      {member.name}
    </h2>
    <p className="text-gray-500">{member.post}</p> {/* Using 'post' for position */}
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
        <h2 className="text-xl font-semibold text-black">{member.about}</h2> {/* Using 'about' for address */}
        {member.phoneNumber && (
          <p className="text-md font-thin">Phone Number: {member.phoneNumber}</p>
        )}
        {member.email && (
          <p className="text-md font-thin">Email: {member.email}</p>
        )}
      </div>
    </div>
  </div>
);

function ExecutiveMembers() {
  const { members, loading, error } = useMembers();
  
  // Filter members to only include executive members
  const executiveMembers = members.filter(member => member.category === "executive");

  if (loading) return <div className="text-center py-8">Loading executive members...</div>;
  if (error) return <div className="text-center py-8 text-red-500">Error: {error}</div>;
  if (executiveMembers.length === 0) return <div className="text-center py-8">No executive members found</div>;

  return (
    <main className="m-5">
      <h1 className="text-3xl">Executive Members</h1>
      <hr className="my-8" />
      {executiveMembers.map((member) => (
        <ExecutiveMember key={member._id} member={member} />
      ))}
    </main>
  );
}

export default ExecutiveMembers;