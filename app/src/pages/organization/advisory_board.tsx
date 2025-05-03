import { useMembers } from "../../context/memberContext";

const AdvisoryMember = ({ member }: { member: any }) => (
  <div className=" card max-w-screen mt-4 bg-base-100 shadow-lg z-[-1]">
    <figure className="px-10 pt-10">
      <img 
        src={member.avatar?.url || "/default-avatar.png"} 
        alt={member.name} 
        className="rounded-xl" 
      />
    </figure>
    <div className="card-body items-center text-center">
      <h2 className="card-title text-3xl font-semibold">{member.name}</h2>
      <p>{member.post}</p>
      {member.about && <p className="mt-2">{member.about}</p>}
    </div>
  </div>
);

function AdvisoryBoard() {
  const { members, loading, error } = useMembers();
  
  // Filter members to only include advisory members
  const advisoryMembers = members.filter(member => member.category === "advisory");

  if (loading) return <div className="text-center py-8">Loading advisory members...</div>;
  if (error) return <div className="text-center py-8 text-red-500">Error: {error}</div>;
  if (advisoryMembers.length === 0) return <div className="text-center py-8">No advisory members found</div>;

  return (
    <main className="m-5">
      <h1 className="text-3xl">Advisory Board</h1>
      <hr className="my-4" />
      <p className="mb-6 font-semibold">
        The Advisory Board contains the list of key professionals and
        academicians who extended their expertise, experience, and guidance to
        the formation of HPLA on a voluntary basis.
      </p>
      <div className="flex flex-col">
        {advisoryMembers.map((member) => (
          <AdvisoryMember key={member._id} member={member} />
        ))}
      </div>
    </main>
  );
}

export default AdvisoryBoard;