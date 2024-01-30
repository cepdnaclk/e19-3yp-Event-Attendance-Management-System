import React from "react";
import EventCard from "./EventCard";
import "../style.css";

// EventSection component to display a section of events
export default function EventSection({ events, title }) {
  return (
    // Container with padding for the entire event section
    <div className="rounded-lg mt-3">
      {/* Title of the event section */}
      <h2 className="txt-h2">{title}</h2>

      {/* Grid layout for displaying event cards */}
      <div
        id="default-carousel"
        className="w-full grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-1 mt-0 my-"
        data-carousel="static"
      >
        {/* Map through each event and render an EventCard component */}
        {events.map((card) => (
          <EventCard key={card.id} card={card} />
        ))}
      </div>
    </div>
  );
}
