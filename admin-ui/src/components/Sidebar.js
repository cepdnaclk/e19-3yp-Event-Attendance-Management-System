import React, { useState } from "react";

//import Icon from "../Images/eventflow_color";
import Profile from "../Images/profile.png";
import Dashboard from "../Images/dashboard.svg";
import Transactions from "../Images/transactions.svg";
import Performance from "../Images/performance.svg";
import News from "../Images/news.svg";
import Settings from "../Images/settings.svg";
import Support from "../Images/support.svg";
import { useLocation } from "react-router-dom";

const Sidebar = () => {
    const location = useLocation();

    const [closeMenu, setCloseMenu] = useState(false);

    const handleCloseMenu = () => {
        setCloseMenu(!closeMenu);
    };

    return (
        <div className={closeMenu === false ? "sidebar" : "sidebar active"}>
            <div
                className={
                    closeMenu === false
                        ? "logoContainer"
                        : "logoContainer active"
                }
            >

                <h2 className="title">EVENT FLOW</h2>
            </div>
            <div
                className={
                    closeMenu === false
                        ? "burgerContainer"
                        : "burgerContainer active"
                }
            >
                <div
                    className="burgerTrigger"
                    onClick={() => {
                        handleCloseMenu();
                    }}
                ></div>
                <div className="burgerMenu"></div>
            </div>
            <div
                className={
                    closeMenu === false
                        ? "profileContainer"
                        : "profileContainer active"
                }
            >
                <img src={Profile} alt="profile" className="profile" />
                <div className="profileContents">
                    <p className="name">Hello, John👋</p>
                    <p>johnsmith@gmail.com</p>
                </div>
            </div>
            <div
                className={
                    closeMenu === false
                        ? "contentsContainer"
                        : "contentsContainer active"
                }
            >
                <ul>
                    <li className={location.pathname === "/" ? "active" : ""}>
                        <img src={Dashboard} alt="dashboard" />
                        <a href="/">dashboard</a>
                    </li>
                    <li
                        className={
                            location.pathname === "/ConferenceRooms"
                                ? "active" : ""
                        }
                    >
                        <img src={News} alt="ConferenceRooms" />
                        <a href="/ConferenceRooms">Conference Rooms</a>
                    </li>

                    <li
                        className={
                            location.pathname === "/Analytics" ? "active" : ""
                        }
                    >
                        <img src={Performance} alt="Analytics" />
                        <a href="/Analytics">Analytics</a>
                    </li>

                    <li
                        className={
                            location.pathname === "/Attendees" ? "active" : ""
                        }
                    >
                        <img src={Support} alt="Attendees" />
                        <a href="/Attendees ">Attendees</a>
                    </li>

                    <li
                        className={
                            location.pathname === "/Overview"
                                ? "active"
                                : ""
                        }
                    >
                        <img src={Transactions} alt="Overview" />
                        <a href="/Overview ">Overview </a>
                    </li>
                    <li
                        className={
                            location.pathname === "/settings" ? "active" : ""
                        }
                    >
                        <img src={Settings} alt="Settings" />
                        <a href="/settings">settings</a>
                    </li>

                </ul>
            </div>
        </div>
    );
};

export default Sidebar;
