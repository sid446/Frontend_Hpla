import { Link } from "react-router-dom";
import list from "../assets/hpla-icons/multiple-users-silhouette.png";
import reg from "../assets/hpla-icons/form.png";
import regOff from "../assets/hpla-icons/registered.png";
import Certificate from "../assets/hpla-icons/certificate.png";
import receipt from "../assets/hpla-icons/bill.png";
import lib from "../assets/hpla-icons/library.png";
import notice from "../assets/hpla-icons/notice.png";
import survey from "../assets/hpla-icons/clipboard.png";
import jobs from "../assets/hpla-icons/jobs.png";
import education from "../assets/hpla-icons/education.png";
import doc from "../assets/hpla-icons/doc.png";
import flyer from "../assets/hpla-icons/flyer.png";

//TODO: DOWNLOAD LINKS ARE NOT WORKING

function Home() {
  return (
    <main className="grid grid-cols-1 gap-4  ">
      <div className="InfoBox scrollbar-hide ">
      <h1 className="text-3xl text-center my-4">Membership</h1>
      <hr />
      <div className="flex flex-wrap justify-around m-5 gap-4 ">
        <div className="homeBox text-center font-bold text-blue-600 text-blue-600">
          <div className="transition delay-1500 box hover:bg-teal-500 p-3 lg:m-10"><Link to="https://drive.google.com/file/d/1x3pVuBbkfq9QyyiaECCSWohm73f1itlX/view" target="_blank"><img src={list} alt="" /></Link></div>
          <p className="text-center text-xl">List of Members</p>
        </div>
        <div className="homeBox text-center font-bold text-blue-600 text-blue-600 text-blue-600 text-blue">
          <div className="transition delay-1500 box hover:bg-teal-500 p-3 lg:m-10"><Link to="https://drive.google.com/file/d/1egQ7tEZOdi6kZ0j0Juc0_SgRpCyVeIMi/view?usp=sharing" target="_blank"><img src={regOff} alt="" /></Link></div>
          <p className="text-center text-xl">Registration Offline</p>
        </div>
        <div className="homeBox text-center font-bold text-blue-600 text-blue-600 text-blue-600 text-blue">
          <div className="transition delay-1500 box hover:bg-teal-500 p-3 lg:m-10"><Link to="https://docs.google.com/forms/d/e/1FAIpQLSdY7TwDalbNr_zGz7GlZuCMrYP5flrMsq4kqyaQH7StpwRNKw/viewform" target="_blank"><img src={reg} alt="" /></Link></div>
          <p className="text-center text-xl">Registration Online</p>
        </div>

        <div className="homeBox text-center font-bold text-blue-600 text-blue-600 text-blue-600 text-blue">
          <div className="transition delay-1500 box hover:bg-teal-500 p-3 lg:m-10"><img src={receipt} alt="" /></div>
          <p className="text-center text-xl">E-Receipt</p>
        </div>
      </div>
      </div>
      <div className="InfoBox">
      <h1 className="text-3xl text-center my-4 homeBox">Information Board</h1>
      <hr />
      <div className="flex flex-wrap justify-around m-5 gap-4">
        <div className="homeBox text-center font-bold text-blue-600 text-blue-600 text-blue-600 text-blue">
          <div className="transition delay-1500 box hover:bg-teal-500 p-3 lg:m-10"><Link to="https://docs.google.com/spreadsheets/d/1OONEvTAQQtrNj8uvNG4yoaBy8cPO62s-/edit?usp=sharing&ouid=105426972053263398581&rtpof=true&sd=true" target="_blank"><img src={lib} alt="" /> </Link></div>
          <p className="text-center text-xl">Libraries in HP</p>
        </div>
        <div className="homeBox text-center font-bold text-blue-600 text-blue-600 text-blue-600 text-blue">
          <div className="transition delay-1500 box hover:bg-teal-500 p-3 lg:m-10"> <Link to="../Survey/LibrariesinHP"><img src={survey} alt="" /></Link> </div>
          <p className="text-center text-xl">Surveys</p>
          </div>
          <div className="homeBox text-center font-bold text-blue-600 text-blue-600 text-blue-600 text-blue">
          <div className="transition delay-1500 box hover:bg-teal-500 p-3 lg:m-10"><Link to="../PLA"><img src={doc} alt="" /> </Link></div>
          <p className="text-center text-xl">Public Libray Act</p>
          </div>
          <div className="homeBox text-center font-bold text-blue-600 text-blue-600 text-blue-600 text-blue">
          <div className="transition delay-1500 box hover:bg-teal-500 p-3 lg:m-10"><Link to="../LISEducation"><img src={education} alt="" /> </Link></div>
          <p className="text-center text-xl">LIS Education in HP</p>
          </div>
          <div className="homeBox text-center font-bold text-blue-600 text-blue-600 text-blue-600 text-blue">
          <div className="transition delay-1500 box hover:bg-teal-500 p-3 lg:m-10"><Link to="../LISJobs"><img src={jobs} alt="" /> </Link></div>
          <p className="text-center text-xl">LIS Jobs</p>
        </div>
        </div>
      </div>
      <div className="InfoBox">
      <h1 className="text-3xl text-center my-4 homeBox">Quick Download Links</h1>
      <hr />
      <div className="flex flex-wrap justify-around m-5 gap-4">
        <div className="homeBox text-center font-bold text-blue-600 text-blue-600 text-blue-600 text-blue">
          <div className="transition delay-1500 box hover:bg-teal-500 p-3 lg:m-10"><Link to="https://drive.google.com/file/d/1gEjsMb-0YdJLY6YmssweTK33yuuehmrc/view" target="_blank"><img src={notice} alt="" /></Link></div>
          <p className="text-center text-xl">Circulars and Notices</p>
        </div>
        <div className="homeBox text-center font-bold text-blue-600 text-blue-600 text-blue-600 text-blue">
          <div className="transition delay-1500 box hover:bg-teal-500 p-3 lg:m-10"><img src={Certificate} alt="" /></div>
          <p className="text-center text-xl ">HPLA Certification</p>
        </div>
        <div className="homeBox text-center font-bold text-blue-600 text-blue-600 text-blue-600 text-blue">
        <div className="transition delay-1500 box hover:bg-teal-500 p-3 lg:m-10"><Link to="https://drive.google.com/file/d/16To6BhqkOMEFvCZNzjN4C8YuNNwFaSHI/view" target="_blank"><img src={flyer} alt="" /></Link></div>
          <p className="text-center text-xl">Information Brochure</p>
        </div>
        </div>
        </div>
    </main>
  );
}

export default Home;
