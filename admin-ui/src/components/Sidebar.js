import React, { useState } from "react";
import "../styles/main.scss";
import { IoHomeOutline } from "react-icons/io5";
import { TbBrandGoogleAnalytics } from "react-icons/tb";
import { HiOutlineBuildingOffice2 } from "react-icons/hi2";
import { MdOutlinePeopleAlt } from "react-icons/md";
import { RiUserSettingsLine } from "react-icons/ri";
import { GrUserManager } from "react-icons/gr";
import { MdOutlinePhone } from "react-icons/md";
import { IoIosLogOut } from "react-icons/io";
import Icon from "../Images/eventflow_color.svg";
import Profile from "../Images/profile.png";
import { useLocation } from "react-router-dom";

const Sidebar = () => {
    const location = useLocation();

    return (
        <div className="sidebar">
            <div className="logoContainer">
                <img src={Icon} alt="profile" className="eventflowicon" />
            </div>

            <div className="profileContainer" >
                <img src={Profile} alt="profile" className="profile" />
                <div className="profileContents">
                    <p className="name">John  Smith</p>
                    <p>johnsmith@gmail.com</p>
                </div>
            </div>

            <div className="contentsContainer">
                <div className="mainT1"> Menu</div>
                <ul>
                    {/* <li className={location.pathname === "/" ? "active" : ""}>
                        <img src={Dashboard} alt="dashboard" />
                        <a href="/">dashboard</a>
                    </li> */}
                    <li className={location.pathname === "/ConferenceRooms" ? "active" : ""}>
                        <HiOutlineBuildingOffice2 className=" sidebaricons" />
                        <a href="/ConferenceRooms">Conference Rooms</a>
                    </li>

                    {/* <li className ={location.pathname === "/Attendees" ? "active" : ""}>
                        <img src={Support} alt="Attendees" />
                        <a href="/Attendees ">Attendees</a>
                    </li> */}

                    <li className={location.pathname === "/Overview" ? "active" : ""}>
                        <IoHomeOutline className=" sidebaricons" />
                        <a href="/Overview">Overview </a>
                    </li>

                    <li className={location.pathname === "/Attendees" ? "active" : ""}>
                        <MdOutlinePeopleAlt className=" sidebaricons" />
                        <a href="/Attendees">Attendees</a>
                    </li>

                    <li className={location.pathname === "/Analytics" ? "active" : ""}>
                        <TbBrandGoogleAnalytics className=" sidebaricons" />
                        <a href="/Analytics">Analytics</a>
                    </li>

                    <div className="mainT2"> Settings</div>
                    <li className={location.pathname === "/Analytics" ? "active" : ""}>
                        <RiUserSettingsLine className=" sidebaricons" />
                        <a href="/Analytics">Profile</a>
                    </li>
                    <li className={location.pathname === "/Analytics" ? "active" : ""}>
                        <GrUserManager className=" sidebaricons" />
                        <a href="/Analytics">Session Manager</a>
                    </li>
                    <li className={location.pathname === "/ContactUs" ? "active" : ""}>
                        <MdOutlinePhone className=" sidebaricons" />
                        <a href="/ContactUs">Contact us</a>
                    </li>
                    <li className={location.pathname === "/Analytics" ? "active" : ""}>
                        <IoIosLogOut className=" sidebaricons" />
                        <a href="/Analytics">Logout</a>
                    </li>

                </ul>


            </div>
        </div>
    );
};

export default Sidebar;
