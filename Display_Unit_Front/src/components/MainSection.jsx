import React, { useState, useEffect } from "react";
import EventSection from "./EventSection";

// MainSection component representing the main content of the application
export default function MainSection() {
  // Sample data for upcoming events
  const events = [
    // Event desc1
    {
      id: 1,
      title: "Event 1",
      location: "Conference Room 1",
      startTime: "9.30 AM",
      endTime: "11.30 AM",
    },
    // Event 2
    {
      id: 2,
      title: "Event 2",
      location: "Conference Room 2",
      startTime: "9.30 AM",
      endTime: "11.30 AM",
    },
    // Event 3
    {
      id: 3,
      title: "Event 3",
      location: "Conference Room 3",
      startTime: "9.30 AM",
      endTime: "11.30 AM",
    },
    {
      id: 4,
      title: "Event 3",
      location: "Conference Room 3",
      startTime: "9.30 AM",
      endTime: "11.30 AM",
    },
  ];

  // Sample data for ongoing events
  const ongoingevents = [
    // Ongoing Event 1
    {
      id: 1,
      title: "Event 1",
      location: "Conference Room 1",
      startTime: "9.30 AM",
      endTime: "11.30 AM",
    },
    // Ongoing Event 2
    {
      id: 2,
      title: "Event 2",
      location: "Conference Room 2",
      startTime: "9.30 AM",
      endTime: "11.30 AM",
    },
    // Ongoing Event 3
    {
      id: 3,
      title: "Event 3",
      location: "Conference Room 3",
      startTime: "9.30 AM",
      endTime: "11.30 AM",
    },
    // Ongoing Event 4
    {
      id: 4,
      title: "Event 4",
      location: "Conference Room 4",
      startTime: "9.30 AM",
      endTime: "11.30 AM",
    },
  ];

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
        <EventSection
          events={ongoingevents.slice(0, 3)} // Displaying the first 3 ongoing events
          title="Headline Events"
        />
        {/* EventSection for displaying registered events */}
        <EventSection events={events} title="Registered Events" />
      </div>
    </div>
  );
}
