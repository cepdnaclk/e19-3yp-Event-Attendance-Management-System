import React from "react";
import "../style.css";

// EventCard component
export default function EventCard({ card }) {
  return (
    // Container for the event card with styling
    <article className="analytic-box">
      {/* Image for the event card */}
      {/* <img
        src={card.img}
        alt={card.title}
        className="absolute inset-0 h-full w-full object-cover"
      /> */}
      {/* Overlay with gradient to make text more readable */}
      {/* <div className="absolute inset-0 bg-gradient-to-t from-gray-900 via-gray-900/40"></div> */}

      {/* Title of the event */}
      <h3 className=" txt-h4">
        {card.sessionName}
      </h3>

      {/* Description of the event */}
      <div className="txt-body">Conference Room: {card.confName}</div>
      <div className="txt-body">About: {card.SessionDetails}</div>
      <div className="txt-body">Speaker: {card.speaker}</div>
      <div className="txt-body">
        {/* Start Time: {card.startTime} */}
        Start Time:{" "}
        {new Date(card.startTime).toLocaleString("en-US", {
          timeZone: "Asia/Colombo",
        })}
      </div>
      <div className="txt-body">
        {/* End Time: {card.endTime} */}
        End Time:{" "}
        {new Date(card.endTime).toLocaleString("en-US", {
          timeZone: "Asia/Colombo",
        })}
      </div>
    </article>
  );
}
