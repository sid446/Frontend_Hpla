const FocusGroup = [
  {
    title: "University Libraries",
    content: "Focus Group President",
    address: "HPU, Shimla",
    name: "Shri Dinesh Sharma",
    position: "Dy Librarian",
  },
  {
    title: "College Libraries",
    content: "Focus Group President",
    address: "SCVB Govt College, Palampur",
    name: "Shri Mahesh Sood",
    position: "Dy Librarian",
  },
  {
    title: "Technical Libraries",
    content: "Focus Group President",
    address: "IIT, Mandi",
    name: "Shri Naresh S Bhandari",
    position: "Dy Librarian",
  },
];

function FocusGroups() {
  return (
    <main>
    <h1 className="text-3xl">Focus Groups</h1>
      <hr className="my-4" />
      <h3 className="text-3xl font-semibold mb-3">Focus Group Presidents</h3>
      <div className=" sm:grid grid-cols-3 gap-4">
        {
          FocusGroup.map((grp) => (
            <div className="p-3 my-3 shadow-md border border-gray-100 rounded">
              <ul className="list-inside text-left">
                <li>
                  <span className="text-2xl font-semibold text-blue-500 inline-block">{grp.title}</span>
                  <hr />
                  <div className="text-inside font-bold inline-block">{grp.name} ({grp.address})</div>
                  <div className="font-normal">{grp.position}</div>
                </li>
              </ul>
              </div>
          ))
        }
      </div>
    </main>
  );
}

export default FocusGroups;
