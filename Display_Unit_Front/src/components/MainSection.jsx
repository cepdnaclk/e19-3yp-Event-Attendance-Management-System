import React from "react";
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

  return (
    // Container for the main section with flex layout
    <div className="w-full flex flex-row gap-4">
      {/* Sidebar with logo and background image */}
      <div className="flex h-screen sticky top-0 items-start flex-col justify-start">
        {/* Logo */}
        <h1 className="m-12 text-2xl">Event Flow</h1>
        {/* Background image */}
        <img
          src="./background.png"
          alt="background"
          className="w-200 h-200  overflow-hidden justify-center items-center mt-4 ml-4"
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
