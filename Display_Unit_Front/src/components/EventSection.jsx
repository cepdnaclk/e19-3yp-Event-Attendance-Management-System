import React from "react";
import EventCard from "./EventCard";
import "../style.css";

// EventSection component to display a section of events
export default function EventSection({ events, title }) {
  return (
    // Container with padding for the entire event section
    <div className=" rounded-lg mt-4 bg-gradient-to-bl from-teal-200 via-teal-300 to-teal-400 p-4 ">
      {/* Title of the event section */}
      <h2 className="text-lg md:text-2xl lg:text-3xl text-gray-800 font-medium w-full text-center font-serif text-custom">
        {title}
      </h2>

      {/* Grid layout for displaying event cards */}
      <div className="w-full grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-1 mt-4">
        {/* Map through each event and render an EventCard component */}
        {events.map((card) => (
          <EventCard key={card.id} card={card} />
        ))}
      </div>
    </div>
  );
}
