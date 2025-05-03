const objectives = [
  "To initiate the education awareness, improve the habit of reading in libraries in the region and conduct events, meetings, workshops, etc to fulfill this objective.",
  "To arrange awareness programme of digital and print resources to the citizens of the Himachal Pradesh.",
  "To undertake charitable activities as defined and permissible under Himachal Pradesh Society Act, 2006.",
  "To advance practices of library and information science in the state.",
  "To promote library co-operation, resource sharing and networking among all kinds of libraries within and out of the state.",
  "To take necessary action of society upliftment by conducting educational and learning workshops, etc.",
  "To promote modern and quality methods of information handling, processing and servicing.",
  "To make appropriate recommendations to Government and authorities and organizations for development of the profession.",
  "To provide professional advisory services and undertake surveys and R & D projects, etc.",
  "To organize lectures, seminars, symposia, conferences, workshops, meetings and other programmes to exchange quality ideas in all areas coming under the preview of library and information science.",
  "To publish books, monographs, occasional papers, journals, bulletins, newsletters etc on topic of interest to the library and information professionals and users of the libraries.",
  "To raise funds, acquire property, accept endowment etc, conducive to the achievement of the above objectives.",
  "To encourage the use of library and information resources, reading materials and services etc.",
  "To encourage the exchange of ideas and techniques between different types of libraries and information users.",
  "To develop relationship (networking) with other professional associations and collaborate with local, national and international homogeneous organizations for achieving the goals and objectives of the HPLA.",
  "To encourage the formation and development of local library associations in the State of Himachal Pradesh and serve as their apex body and to establish various chapters in the districts of Himachal Pradesh.",
  "To work for the promotion of legislation conducive to or necessary for the establishment, development, maintenance, regulation and management of the public library system and of the other library systems in the State.",
  "Any other activity subservient to the aims and objectives of the Association.",
];

function Objectives() {
  return (
    <main style={{ margin: "20px" }}>
      <h1 className="text-4xl">Aims and Objectives</h1>
      <hr style={{ padding: "2rem" }} />
      <ul style={{ listStyleType: "disc", paddingLeft: "20px" }}>
        <p>
          {objectives.map((objective, index) => (
            <li key={index}>{objective}</li>
          ))}
        </p>
      </ul>
    </main>
  );
}

export default Objectives;
