import React, { useState, useEffect } from "react";
import EventSection from "./EventSection";

// MainSection component representing the main content of the application
export default function MainSection() {
  // const [ongoingEvents, setOngoingEvents] = useState([]);
  const [hotSessions, setHotSessions] = useState([]);
  const [registeredSessions, setRegisteredSessions] = useState([]);
  const [rfidNo, setRfidNo] = useState('');

  // Function to fetch registered sessions for a relevant rfidNo
  const fetchRegisteredSessions = async () => {
    try {
      // const response = await fetch(`http://localhost:5001/api/sessionreg/rfid/${rfidNo}`);
      const response = await fetch(`http://localhost:5001/api/sessionreg/rfid/003`);
      const data = await response.json();

      if (response.ok) {
        const sessionIds = data.sessionIds;

        // Fetch session details for the obtained sessionIds
        const sessionDetailsResponse = await fetch(`http://localhost:5001/api/conferences/allSessionDetails`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ sessionIds }),
        });
        const sessionDetailsData = await sessionDetailsResponse.json();

        if (sessionDetailsResponse.ok) {
          setRegisteredSessions(sessionDetailsData.sessionDetails);
        } else {
          console.error('Error fetching session details:', sessionDetailsData.message);
        }
      } else {
        console.error('Error fetching session ids:', data.message);
      }
    } catch (error) {
      console.error('Error fetching registered sessions:', error);
    }
  };

  // useEffect to fetch registered sessions when rfidNo changes
  useEffect(() => {
    if (rfidNo) {
      fetchRegisteredSessions();
    }
  }, [rfidNo]);  

  // // State to manage the rotation angle
  // const [rotationAngle, setRotationAngle] = useState(0);

  // // Function to update the rotation angle
  // const updateRotation = () => {
  //   setRotationAngle((prevAngle) => prevAngle + 0.01);
  // };

  // // useEffect to continuously update the rotation
  // useEffect(() => {
  //   const interval = setInterval(updateRotation, 10); // Adjust the interval as needed

  //   // Clear the interval when the component unmounts
  //   return () => clearInterval(interval);
  // }, []);

  return (
    // Container for the main section with flex layout
    <div className="w-full flex flex-row gap-4 bg-orange-50">
      {/* Sidebar with logo and background image */}
      <div className="flex h-screen sticky top-0 items-start flex-col justify-start">
        {/* Logo */}
        <img src="./logo.png" alt="logo" className="w-72 h-auto m-3 mb-0" />
        {/* Background image */}

        <img
          src="./background.png"
          alt="background"
          className="lg:w-200 lg:h-200 md:w-50 md:h-50 overflow-hidden justify-center items-center mt-0 lg:ml-11 sm:ml-3 rounded-full border-2 border-blue-600 transition duration-300 ease-in-out transform hover:scale-105 object-fill-cover"
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

        {/* EventSection for displaying registered events */}
        {/* <EventSection events={events} title="Registered Events" /> */}
        <EventSection events={registeredSessions} title="Registered Sessions" />
      </div>
    </div>
  );
}
