import ASChandel from "../../assets/ASChandel_advisory.jpg";
import PKAlhuwalia from "../../assets/PKAhluwalia_Advisory.jpg";
import Jitender from "../../assets/Jitender Sharma_Advisory.jpg";

const AdvisoryBoardMembers = [
  {
    index: 1,
    image: ASChandel,
    name: "Prof. A.S. Chandel",
    position: "Former Professor and head, DLIS, NEHU",
    bio: "Prof. A S Chandel is a former Professor & Head, Department of Library & Information Science, North Eastern Hill University, Shillong. Currently, he is serving Sikkim University, Sikkim as Librarian. His previous assignments were, OSD (Library) of Mizoram University, Chairman, Library Digitization UGC project under UPE (University with Potential for Excellence) NEHU, Shillong, Adviser Digitization, Central University of Jharkhand, Ranchi, University Librarian-cum-Head, Computer and Instrumentation Centre. He was UGC Emeritus Fellow during 2012-13 and also served as a member of the Advisory Board for NCERT and National Library of India. In-charge ARIS Cell (ICAR) of Dr. Y S Parmar University of Horticulture and Forestry, Nauni, Solan, Himachal Pradesh. He was also selected and nominated for SAARC nations to represent India as Deputy Director (Information) to SAARC Agricultural Information Centre Dhaka (1994-1997). He has been a member of various Boards, Committees, Councils of national importance. He is a recipient of PLA (Punjab Library Association) award, Prof.Satija Award for Professional Excellence (2011) and Award of Honour by Association of Agricultural Librarians and Documentarists of India (2011). The establishment of HPLA was one of his long awaited-dreams and voluntarily extended his expertise in drafting bye-laws of the Association.  ",
  },
  {
    index: 2,
    image: PKAlhuwalia,
    name: "Dr. P.K. Ahluwalia (Educationist)",
    position:
      "Former Professor, Department of Physics, Himachal Pradesh University, Shimla (HPU)",
    bio: "Dr. P.K. Ahluwalia, former Professor, Department of Physics, Himachal Pradesh University, Shimla (HPU). He had also served the university as Dean Planning and Teachers Matters. He was a recipient of the ‘best teacher and academic administrator award’ by the HPU in 2012 for his active contribution to the university. At the national front, for his active contribution to Indian education, he was also elected for the position of Vice President, Indian Association of Physics Teachers during 2013 -15. He has a rich teaching experience spanning over 40 years. He has been involved in the popularization of science, among young minds, through radios and live talks in various academic institutions for the last four decades.  He was instrumental to install first solar energy plant in the Himachal Pradesh University, Shimla and nearby places. He was conferred with the ‘Himachal Pradesh Environment Leadership Award’ by the Department of Environment, Science & Technology, Government of Himachal Pradesh in 2017 under individual category. His love for books and libraries are well known to all. His guidance in the establishment of HPLA is being highly acknowledged.",
  },
  {
    index: 3,
    image: Jitender,
    name: "Mr. Jitender Sharma",
    position:
      "Senior Librarian at Jaipuria Institute of Management, Noida Treasurer MANLIBNET",
    bio: "Mr. Jitender Sharma is working as a Senior Librarian at Jaipuria Institute of Management, Noida. He has over 25 years of quality experience in library management. He is among the founder members of the Management Libraries Network (MANLIBNET) and holding the position of Treasurer of MANLIBNET since its establishment. He has been playing a pivotal role in MANLIBNET’s success. He was the first person who supported the formation of HPLA and put in his best experiences, of managing MANLIBNET, in drafting the bye-laws. The HPLA whole heartily pays its gratitude for the support he has extended.  ",
  },
];

const AdvisoryMember = ({ member }: { member: any }) => (
  <div className="card max-w-screen mt-4 bg-base-100 shadow-lg z-[-1]">
  <figure className="px-10 pt-10">
    <img src={member.image} alt="memberphoto" className="rounded-xl" />
  </figure>
  <div className="card-body items-center text-center">
      <h2 className="card-title text-3xl font-semibold">{member.name}</h2>
      <p>{member.bio}</p>
  </div>
</div>
);

function AdvisoryBoard() {
  return (
    <main className="m-5">
      <h1 className="text-3xl">Advisory Board</h1>
      <hr className="my-4" />
      <p className="mb-6 font-semibold">
        The Advisory Board contains the list of key professionals and
        academicians who extended their expertise, experience, and guidance to
        the formation of HPLA on a voluntary basis.
      </p>
      {AdvisoryBoardMembers.map((member, index) => (
        <AdvisoryMember key={index} member={member} />
      ))}
    </main>
  );
}

export default AdvisoryBoard;
