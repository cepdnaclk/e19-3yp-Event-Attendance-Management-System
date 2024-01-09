// reg attendees has to move
import axios from "axios";
import React, { useState, useEffect } from "react";
import "./App.css";
import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";
import AttendeeCards from "../components/AttendeeCards";
import { responsive } from "../DataFiles/Conference_data";
import RegAttendeeCards from "../components/RegAttendeeCards";
import Sidebar from "../components/Sidebar";

export default function Attendees() {
  const [attendeeData, setAttendeeData] = useState([]);
  const [regAttendeeData, setRegAttendeeData] = useState([]);

  useEffect(() => {
    const fetchAttendeeData = async () => {
      try {
        // Get all attendee IDs
        const responseIds = await fetch("http://3.110.135.90:5001/api/attendees/");
        const dataIds = await responseIds.json();

        // Fetch details for each attendee using their IDs
        const detailsPromises = dataIds.attendeeIds.map(async (id) => {
          const responseDetails = await fetch(
            `http://3.110.135.90:5001/api/attendees/${id}/details`
          );
          return await responseDetails.json();
        });

        // Wait for all details to be fetched
        const detailsData = await Promise.all(detailsPromises);

        // Set the attendeeData state with the fetched details
        setAttendeeData(detailsData);
      } catch (error) {
        console.error("Error fetching attendee data:", error);
      }
    };

    fetchAttendeeData();
  }, []);

  useEffect(() => {
    const fetchRegAttendeeData = async () => {
      try {
        const regIds = await fetch("http://3.110.135.90:5001/api/sessionreg/");
        const dataRegIds = await regIds.json();

        // Extract session IDs from dataRegIds
        const sessionIds = dataRegIds.map((item) => item.sessionId);

        // Fetch session details for each session ID
        const sessionDetailsPromises = sessionIds.map(async (sessionId) => {
          const sessionDetailsResponse = await axios.get(
            `http://3.110.135.90:5001/api/sessions/${sessionId}`
          );
          return sessionDetailsResponse.data; // Assuming your API returns the session details
        });

        // Wait for all session details to be fetched
        const sessionDetails = await Promise.all(sessionDetailsPromises);

        // Set the fetched session details to state
        setRegAttendeeData(sessionDetails);
      } catch (error) {
        console.error("Error fetching session data:", error);
      }
    };
    fetchRegAttendeeData();
  }, []);

  const attendee = attendeeData.map((item) => (
    <AttendeeCards
      key={item.id} // Make sure to set a unique key
      room={item.id}
      name={item.name}
      topic={item.email}
      Ccapacity={item.conNo}
      Mcapacity={item.rfidNo}
    />
  ));

  const regAttendee = regAttendeeData.map((item) => (
    <RegAttendeeCards
      key={item.id} // Make sure to set a unique key
      sessionId={item.sessionId}
      regCapacity={item.registeredCapacity}
      // regRfidNo={item.registeredRfidNo}
    />
  ));

  return (
    <>
      <Sidebar />
      <div>
        <div className=" Ccr1"> Attendees</div>
        <div className="CAppss">
          <Carousel showDots={true} responsive={responsive}>
            {attendee}
            {regAttendee}
          </Carousel>
        </div>
      </div>
    </>
  );
}
