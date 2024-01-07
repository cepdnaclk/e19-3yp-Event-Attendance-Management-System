import React from "react";

// EventCard component
export default function EventCard({ card }) {
  return (
    // Container for the event card with styling
    <article className="relative isolate flex flex-col justify-end overflow-hidden rounded-2xl px-8 pb-8 pt-40 max-w-sm mx-auto">
      {/* Image for the event card */}
      <img
        src={card.img}
        alt={card.title}
        className="absolute inset-0 h-full w-full object-cover"
      />
      {/* Overlay with gradient to make text more readable */}
      <div className="absolute inset-0 bg-gradient-to-t from-gray-900 via-gray-900/40"></div>

      {/* Title of the event */}
      <h3 className="z-10 mt-3 text-2xl font-bold text-white">{card.title}</h3>

      {/* Description of the event */}
      <div className="z-10 gap-y-1 overflow-hidden text-sm leading-6 text-gray-300">
        {card.description}
      </div>
    </article>
  );
}
