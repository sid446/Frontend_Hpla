import { BrowserRouter, Route, Routes } from "react-router-dom";
import Layout from "../components/layout";
//Pages
import Home from "../pages/home";

//About
import About from "../pages/about/about";
import HplaAnnualReport from "../pages/about/hpla_annual_report";
import Objectives from "../pages/about/objectives";
import PresidentMessage from "../pages/about/president_message";
import Constitution from "../pages/about/constitution";

//Organization
import AdvisoryBoard from "../pages/organization/advisory_board";
import Committees from "../pages/organization/committees";
import ExecutiveMembers from "../pages/organization/executive_members";
import OfficeBearers from "../pages/organization/office_bearers";
import ProOfficeCoordinators from "../pages/organization/pro_office_coordinators";

//HPLA Activities
import FocusGroups from "../pages/activities/hpla/focus_groups";
import HplaElection from "../pages/activities/hpla/hpla_election";
import HplaNews from "../pages/activities/hpla/hpla_news";
import Meetings from "../pages/activities/hpla/meetings";
import RepresentGovt from "../pages/activities/hpla/reprentgovt";
import LibrariesInHp from "../pages/activities/hpla/librariesinhp";
import Books from "../pages/activities/hpla/digitalization/books";

//Professional Activities
import Awards from "../pages/activities/professional/awards";
import Conferences from "../pages/activities/professional/conferences";
import Lectures from "../pages/activities/professional/lectures";
import Seminars from "../pages/activities/professional/seminars";
import Workshops from "../pages/activities/professional/workshops";

//Membership
import AboutMembership from "../pages/membership/about_membership";
import ApplicationForMembership from "../pages/membership/membership_application";

//Others
import ContactUs from "../pages/miscellaneous/contact_us";
import PhotoGallery from "../pages/miscellaneous/photogallery";
import NewsClips from "../pages/miscellaneous/newsClips";

//QuickLinks
import LISEducation from "../pages/quick/lis-education";
import LISJobs from "../pages/quick/lis-jobs";
import PublicLibraryActs from "../pages/quick/public-library-act";
import LifeMembers from "../pages/membership/lifemembers";
import Videos from "../pages/miscellaneous/videos";


function Router() {
  return (
    <BrowserRouter>
      <Layout>
        <Routes>
          {/* Home path */}
          <Route path="/" element={<Home />} />

          {/* About paths */}
          <Route path="/AboutHPLA" element={<About />} />
          <Route path="/PresidentMessage" element={<PresidentMessage />} />
          <Route path="/AimAndObjectives" element={<Objectives />} />
          <Route path="/Constitution" element={<Constitution/>} />
          <Route path="/AnnualReport" element={<HplaAnnualReport />} />

          {/* Organisation paths */}
          <Route path="/AdvisoryBoard" element={<AdvisoryBoard />} />
          <Route path="/OfficeBearers" element={<OfficeBearers />} />
          <Route path="/ExecutiveMembers" element={<ExecutiveMembers />} />
          <Route
            path="/ProOfficeCoordinators"
            element={<ProOfficeCoordinators />}
          />
          <Route path="/Committees" element={<Committees />} />

          {/* HPLA Activites paths */}
          <Route path="/FocusGroups" element={<FocusGroups />} />
          <Route path="/Association/Meetings" element={<Meetings />} />
          <Route path="/Association/Representation" element={<RepresentGovt />} />
          <Route path="/Survey/LibrariesinHP" element={<LibrariesInHp />} />
          <Route path="/Digitization/Books" element={<Books/> } />
          <Route path="/HplaElection" element={<HplaElection />} />
          <Route path="/HplaRepresentation" element={<HplaNews />} />

          {/* Professional Activities paths */}
          <Route path="/Conferences" element={<Conferences />} />
          <Route path="/Workshops" element={<Workshops />} />
          <Route path="/Seminars" element={<Seminars />} />
          <Route path="/Lectures" element={<Lectures />} />

          {/* Membership paths */}
          <Route path="/AboutMembership" element={<AboutMembership />} />
          <Route path="/ApplicationForMembership" element={<ApplicationForMembership />} />
          <Route path="/ListOfMembership" element={<LifeMembers />} />

          <Route path="/LibraryAwards" element={<Awards/>} />

          {/* Misc Paths */}
          <Route path="/Photo" element={<PhotoGallery />} />
          <Route path="/Video" element={<Videos />} />
          <Route path="/NewsClips" element={<NewsClips />} />

          {/* Quick Links path */}
          <Route path="/LISJobs" element={<LISJobs />} />
          <Route path="/LISEducation" element={<LISEducation />} />
          <Route path="/PLA" element={<PublicLibraryActs />} />

          <Route path="/Contact" element={<ContactUs />} />
        </Routes>
      </Layout>
    </BrowserRouter>
  );
}

export default Router;
