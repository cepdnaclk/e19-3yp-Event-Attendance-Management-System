import React, { useState, useEffect } from "react";
import EventSection from "./EventSection";

// MainSection component representing the main content of the application
export default function MainSection() {
  // const [ongoingEvents, setOngoingEvents] = useState([]);
  const [hotSessions, setHotSessions] = useState([]);
  const [registeredSessions, setRegisteredSessions] = useState([]);
  const [rfidNo, setRfidNo] = useState('');

  const fetchAndSetRegisteredSessions = async (rfidNo) => {
    const sessionIds = await fetchSessionIds(rfidNo);
    const sessionDetails = await fetchSessionDetails(sessionIds);
    console.log('sessionDetailssss', sessionDetails);
    setRegisteredSessions(sessionDetails);
  };

  useEffect(() => {
    // Set a default RFID number or use any logic to determine the RFID number initially
    const defaultRfidNo = '003';
    setRfidNo(defaultRfidNo);

    // Fetch and set registered sessions when the component mounts
    fetchAndSetRegisteredSessions(defaultRfidNo);
  }, []);

  // Fetch and set registered sessions whenever rfidNo changes
  useEffect(() => {
    if (rfidNo) {
      fetchAndSetRegisteredSessions(rfidNo);
    }
  }, [rfidNo]);

  const fetchSessionIds = async (rfidNo) => {
    try {
      const rfidNo = '003';
      const response = await fetch(`http://localhost:5001/api/sessionreg/rfid/${rfidNo}`);
      const data = await response.json();
  
      console.log('data', data);
      if (response.ok) {
        return data.sessionIds;
      } else {
        console.error('Error fetching session ids:', data.message);
        return [];
      }
    } catch (error) {
      console.error('Error fetching session ids:', error);
      return [];
    }
  };

  const fetchSessionDetails = async (sessionIds) => {
    try {
      // Array to store session details for each session ID
      const sessionDetailsArray = [];
  
      // Iterate over session IDs and fetch details for each
      for (const sessionId of sessionIds) {
        const sessionDetailsResponse = await fetch(`http://localhost:5001/api/conferences/sessions/${sessionId}`, {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
          },
        });
  
        console.log('sessionDetailsResponse', sessionDetailsResponse);
        const sessionDetailsData = await sessionDetailsResponse.json();
  
        if (sessionDetailsResponse.ok) {
          sessionDetailsArray.push(sessionDetailsData);
        } else {
          console.error(`Error fetching session details for session ID ${sessionId}:`, sessionDetailsData.message);
        }
      }
  
      return sessionDetailsArray;
    } catch (error) {
      console.error('Error fetching session details:', error);
      return [];
    }
  };
  

  // const fetchSessionDetails = async (sessionIds) => {
  //   try {
  //     const sessionDetailsResponse = await fetch(`http://localhost:5001/api/conferences/allSessionDetails?sessionIds=${sessionIds.join(',')}`, {
  //       method: 'GET',
  //       headers: {
  //         'Content-Type': 'application/json',
  //       },
  //     });
  
  //     console.log('sessionDetailsResponse', sessionDetailsResponse);
  //     const sessionDetailsData = await sessionDetailsResponse.json();
  
  //     if (sessionDetailsResponse.ok) {
  //       return sessionDetailsData.sessionDetails;
  //     } else {
  //       console.error('Error fetching session details:', sessionDetailsData.message);
  //       return [];
  //     }
  //   } catch (error) {
  //     console.error('Error fetching session details:', error);
  //     return [];
  //   }
  // };  

  return (
    // Container for the main section with flex layout
    <div className="w-full flex flex-row gap-4 bg-orange-50">
      {/* Sidebar with logo and background image */}
      <div className="flex h-screen sticky top-0 items-start flex-col justify-start">
        {/* Logo */}
        <img
          src="./eventflow_color.svg"
          alt="logo"
          className="w-64 h-auto m-3 mb-11"
        />
        {/* Background image */}

        <img
          src="./bg.png"
          alt="background"
          className="lg:w-200 lg:h-200 md:w-50 md:h-50 overflow-hidden justify-center items-center mt-0 lg:ml-11 sm:ml-3  transition duration-300 ease-in-out transform hover:scale-105 "
          // style={{
          //   transform: `rotate(${rotationAngle}deg)`, // Rotate based on state
          //   transition: "transform 5s linear", // Optional: Add a smooth transition effect
          // }}
        />
      </div>
      {/* Main content area with upcoming and registered events */}

      <div className="flex flex-col gap-2 justify-start items-center flex-1">
        {/* EventSection for displaying hottest events */}
        {/* <EventSection
          events={ongoingevents.slice(0, 3)} // Displaying the first 3 ongoing events
          title="Headline Events"
        /> */}
        <EventSection events={hotSessions} title="Hot Sessions" />

        {/* Input for entering rfidNo */}
        <input type="text" value={rfidNo} onChange={(e) => setRfidNo(e.target.value)} placeholder="Enter rfidNo" />

        {/* EventSection for displaying registered events */}
        {/* <EventSection events={events} title="Registered Events" /> */}
        <EventSection events={registeredSessions} title="Registered Sessions" />
      </div>
    </div>
  );
}
