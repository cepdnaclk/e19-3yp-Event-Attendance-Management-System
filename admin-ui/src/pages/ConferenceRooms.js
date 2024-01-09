"use client";
import "./App.css";
// import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";
// import SessionCards from "../components/SessionCards";
// import { productData, responsive } from "./data";
import React, { useState, useEffect } from "react";
import Croom from "../components/Croom";
// import { sessionData, responsive } from "../DataFiles/Session_data";
import axios from "axios";
import Sidebar from "../components/Sidebar";

export default function ConferenceRooms() {
  const [conferenceData, setConferenceData] = useState([]);

  useEffect(() => {
    const accessToken = localStorage.getItem("token");
    if (accessToken) {
      axios.defaults.headers.common["Authorization"] = `Bearer ${accessToken}`;
      // Validate the token on the server
      axios
        .get("http://localhost:5001/api/conferences/")
        .then((response) => {
          console.log(response.data);
          setConferenceData(response.data);
        })
        .catch((error) => {
          console.error("Token validation failed", error);
        });
    }
  }, []);

  const [modal, setModal] = useState(false);

  const toggleModal = () => {
    setModal(!modal);
  };

  if (modal) {
    document.body.classList.add("active-modal");
  } else {
    document.body.classList.remove("active-modal");
  }

  return (
    <>
      <Sidebar />
      <div className="Appss">
        <button onClick={toggleModal} className="btn-modal">
          Add Room
        </button>

        {modal && (
          <div className="modal">
            <div onClick={toggleModal} className="overlay"></div>
            <div className="modal-content">
              <div>
                <label htmlFor="roomName">Room Name:</label>
                <input
                  type="text"
                  id="roomName"
                  placeholder="Enter room name"
                />
                <button type="submit">Submit</button>
              </div>
              <button className="close-modal" onClick={toggleModal}>
                {" "}
                CLOSE
              </button>
            </div>
          </div>
        )}
        <div className="cardbox">
          when user input a room , it should display in here
          <Croom />
        </div>
      </div>
    </>
  );
}
