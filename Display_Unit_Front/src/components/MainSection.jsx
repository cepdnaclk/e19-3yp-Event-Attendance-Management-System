import React, { useState, useEffect } from "react";
import EventSection from "./EventSection";

// MainSection component representing the main content of the application
export default function MainSection() {
  // Sample data for upcoming events
  const events = [
    // Event 1
    {
      id: 1,
      title: "Event 1",
      img: "/event1.jpg",
      description: "Location: Conference Room 1",
    },
    // Event 2
    {
      id: 2,
      title: "Event 2",
      img: "/event2.jpg",
      description: "Location: Conference Room 2",
    },
    // Event 3
    {
      id: 3,
      title: "Event 3",
      img: "/event3.jpg",
      description: "Location: Conference Room 3",
    },
  ];

  // Sample data for ongoing events
  const ongoingevents = [
    // Ongoing Event 1
    {
      id: 1,
      title: "Event 1",
      img: "/event4.jpg",
      description: "Location: Conference Room 1",
    },
    // Ongoing Event 2
    {
      id: 2,
      title: "Event 2",
      img: "/event3.jpg",
      description: "Location: Conference Room 2",
    },
    // Ongoing Event 3
    {
      id: 3,
      title: "Event 3",
      img: "/event2.jpg",
      description: "Location: Conference Room 3",
    },
    // Ongoing Event 4
    {
      id: 4,
      title: "Event 4",
      img: "/event2.jpg",
      description: "Location: Conference Room 4",
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
        <img src="./logo.png" alt="logo" className="w-72 h-auto m-4 mb-0" />
        {/* Background image */}

        <img
          src="./background.png"
          alt="background"
          className=" w-200 h-200 overflow-hidden justify-center items-center mt-0 ml-11 rounded-full border-2 border-blue-600"
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
