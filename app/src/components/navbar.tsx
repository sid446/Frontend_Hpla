import React, { useState } from "react";
import { FiAlignJustify } from "react-icons/fi";
import { Link } from "react-router-dom";
import Carousel from "../utils/Carousel";
import headerImage from "../assets/banner.png";
const navLinks = [
  {
    label: `Home`, subLinks: [
    {route: "/", name: "Home"}
  ] },
  {
    label: "About Us",
    subLinks: [
      { route: "/AboutHPLA", name: "About HPLA" },
      { route: "/PresidentMessage", name: "President Message" },
      { route: "/AimAndObjectives", name: "Aims And Objectives" },
      { route: "/Constitution", name: "Constitution" },
      { route: "/AnnualReport", name: "Annual Report", nestedLinks: [
      ] },
    ],
  },
  {
    label: "Organization",
    subLinks: [
      { route: "/AdvisoryBoard", name: "Advisory Board" },
      { route: "/OfficeBearers", name: "Office Bearers" },
      { route: "/ExecutiveMembers", name: "Executive Members" },
      { route: "/PROOfficeCoordinators", name: "PRO Office Coordinators" },
      { route: "/FocusGroups", name: "Focus Groups" },
      { route: "/Committees", name: "Committees" },
      { route: "/HplaElection", name: "HPLA Election" },
    ],
  },
  {
    label: "Membership",
    subLinks: [
      { route: "/AboutMembership", name: "About Membership" },
      {
        route: "/ApplicationForMembership",
        name: "Application For Membership",
      },
      { route: "/ListOfMembership", name: "Life Members" },
      {route:"/OrdinaryMembers", name:"Ordinary Members"},
      {route:"/StudentMembers", name:"Student Members"},
    ],
  },
  {
    label: "Activities",
    subLinks: [
      { route: "/Association", name: "Associations", nestedLinks: [
        { route: "/Association/Meetings", name: "Meetings" },
      ] },
      { route: "/Professional", name: "Professional", nestedLinks: [
        { route: "/Workshops", name: "Workshops" },
        { route: "/Seminars", name: "Seminars/Conferences" },
        { route: "/Lectures", name: "Lecture Series" },
      ] },
      { route: "/Survey", name: "Surveys", nestedLinks: [
        { route: "/Survey/LibrariesinHP", name: "Directories" },
        { route: "/Survey/Others", name: "Others" },
      ]},
      { route: "/Digitization", name: "Digitization", nestedLinks: [
        { route: "/Digitization/Thesis", name: "Thesis published on HP" },
        { route: "/Digitization/Literature", name: "Litrature published on HP" },
        { route: "/Digitization/Books", name: "Books published on HP" },
      ] },
    ],
  },
  {
    label: "HPLA News",
    subLinks: [
      { route: "/HplaRepresentation", name: "Newsletter" },
      { route: "/Association/Representation", name: "HPLA Represention" },
    ],
  },
  {
    label: "Awards & Recognitions",
    subLinks: [
      { route: "/LibraryAwards", name: "Library Awards" },
    ],
  },
  {
    label: "Gallery",
    subLinks: [
      { route: "/Photo", name: "Photo" },
      { route: "/Video", name: "Video" },
      { route: "/NewsClips", name: "News Clips" },
    ],
  },
  { label: "Contact Us", subLinks: [{ route: "/Contact", name: "Contact" }] },
];

function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <nav className="flex flex-col z-30 justify-between">
      <Link to="/">
        <div className=" rounded-lg w-full h-full ">
          <img
            src={headerImage}
            alt="HPLA"
            className="w-[100%] h-[105%] object-fill"
          />
        </div>
      </Link>
      <Carousel />
      <div
        className={`nav-links-container nav ${isMenuOpen ? "show-menu" : ""}`}
      >
        <FiAlignJustify className="hamburger-icon" onClick={toggleMenu} />
        <ul className="nav-links justify-evenly py-2 bg-[#060123]/90 text-quaternary rounded-lg">
          {navLinks.map((navLink) => (
            <li
              key={navLink.label}
              className="nav-link p-1.5 px-4 hover:bg-blue-100 dark:hover:bg-teal-600 duration-300 rounded-md text-base"
            >
              <div className="sub-link">
                {navLink.label}
                {navLink.subLinks && (
                  <ul className="sub-links">
                    {navLink.subLinks.map((subLink) => (
                      <li
                        key={subLink.route}
                        className="sub-links-li dropdown-content z-[1] menu p-2 shadow rounded-box w-52 flex flex-row my-auto text-base duration-300 top-[0%] left-[100%]"
                      >
                        <Link to={subLink.route}>{subLink.name}</Link>
                        {subLink.nestedLinks && (
                          <div className="dropdown dropdown-right ">
                            <div tabIndex={0}  className=""> ❯ </div>
                            <ul className="dropdown-content z-[2] menu p-2 shadow rounded-box bg-base-100 w-52">
                            {subLink.nestedLinks.map((nestedLink) => (
                              <li key={nestedLink.route} className="">
                                <Link to={nestedLink.route}>
                                  {nestedLink.name}
                                </Link>
                              </li>
                            ))}
                          </ul>
                          </div>
                          
                        )}
                      </li>
                    ))}
                  </ul>
                )}
              </div>
            </li>
          ))}
        </ul>
      </div>
    </nav>
  );
}

export default Navbar;
