import React from "react";
import "../style.css";
import Bubble from "./Bubble";


// EventCard component
export default function EventCard({ card }) {
  return (
    // Container for the event card with styling
    <article className="analytic-box">
    
      <h3 className=" txt-h4">
        {card.sessionName}
      </h3>

      {/* Description of the event */}
      <div className="txt-body3">  <Bubble content={card.conferenceDetails} /></div>

      <div className="txt-body1">{card.SessionDetails}</div>
      <div className="txt-body2"> {card.speaker}</div>
      <hr className="horizontal-line" />
      <div className="g1">
      <div className="txt-body">
      
      <span className="bold-text">Starting :</span>{" "}
        {new Date(card.startTime).toLocaleString("en-US", {
          timeZone: "Asia/Colombo",
        })}
      </div>
      <div className="txt-body">
        
      <span className="bold-text"> Ending :</span>{" "}
        {new Date(card.endTime).toLocaleString("en-US", {
          timeZone: "Asia/Colombo",
        })}
        </div>
      </div>
    </article>
  );
}
