"use client";
import React, { useState, useEffect } from "react";
import "./App.css";
// import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";
// import SessionCards from "../components/SessionCards";
// import { productData, responsive } from "./data";
import Croom from "../components/Croom";
// import { sessionData, responsive } from "../DataFiles/Session_data";
import axios from "axios";
import Sidebar from "../components/Sidebar";
import Footer from "../components/Footer";

import { IoCloseSharp } from "react-icons/io5";


export default function ConferenceRooms() {
  const [conferenceData, setConferenceData] = useState([]);
  const [modal, setModal] = useState(false);
  const [roomName, setRoomName] = useState("");
  const [conferenceIds, setConferenceIds] = useState([]);

  useEffect(() => {
    const accessToken = localStorage.getItem("token");
    if (accessToken) {
      axios.defaults.headers.common["Authorization"] = `Bearer ${accessToken}`;
      // Validate the token on the server
      axios
        // .get("http://localhost:5001/api/conferences/")
        .get("http://localhost:5001/api/conferences/get")
        .then((response) => {
          console.log(response.data);
          setConferenceData(response.data);
        })
        .catch((error) => {
          console.error("Token validation failed", error);
        });
    }
  }, []);

  const toggleModal = () => {
    setModal(!modal);
  };

  const handleRoomNameChange = (e) => {
    setRoomName(e.target.value);
  };

  // add a new conference room
  const handleAddRoom = async () => {
    try {
      const response = await fetch("http://localhost:5001/api/conferences", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ conferenceDetails: roomName }),
      });

      const data = await response.json();

      if (response.ok) {
        console.log("Conference created successfully:", data);
        // Refresh the list of conferences after creation
        fetchConferenceIds();
        // Close the modal
        toggleModal();
      } else {
        console.error("Error creating conference:", data.message);
      }
    } catch (error) {
      console.error("Error creating conference:", error);
    }
  };

  const fetchConferenceIds = async () => {
    try {
      const response = await fetch(
        "http://localhost:5001/api/conferences/conferenceIds"
      );
      const data = await response.json();

      if (response.ok) {
        setConferenceIds(data.conferenceIds);
        console.log("ConferenceIds fetched successfully:", data.conferenceIds);
      } else {
        console.error("Error fetching conferenceIds:", data.message);
      }
    } catch (error) {
      console.error("Error fetching conferenceIds:", error);
    }
  };

  useEffect(() => {
    // Fetch conferenceIds when the component mounts
    fetchConferenceIds();
  }, []); // Empty dependency array ensures the effect runs only once

  return (
    <>
      <Sidebar />
      <div className="Appss">
        <div className="vr">Conference Rooms</div>
        <button onClick={toggleModal} className="btn111">
          Create Room
        </button>

        {modal && (
          <div className="modal">
            <div onClick={toggleModal} className="overlay"></div>
            <div className="modal-content">
              <div>
                <label className="roomnaame">Room Name</label>
                <input
                className="i1"
                  type="text"
                  id="roomName"
                  placeholder="Enter room name"
                  value={roomName}
                  onChange={handleRoomNameChange}
                />
                <button className="submitbtn" type="submit" onClick={handleAddRoom}>
                  Submit
                </button>
              </div>
              <button className="close-btn" onClick={toggleModal}>
                close
              </button>
            </div>
          </div>
        )}

        <div className="cardbox">
          {/* Render each conference based on the conferenceIds */}
          {conferenceIds.map((conferenceId) => (
            <Croom key={conferenceId} conferenceId={conferenceId} />
          ))}
        </div>
      </div>


    </>
  );
}
