// // no use

import React, { useState, useEffect } from "react";
import "./App.css";
import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";
import ConferneceRoomCards from "../components/ConferenceRoomCards";
import Sidebar from "../components/Sidebar";

export default function Overview() {
  const [ongoingConferences, setOngoingConferences] = useState([]);

  const fetchOngoingConferences = async () => {
    try {
      const response = await fetch("http://localhost:5001/api/conferences/get");
      const data = await response.json();

      if (response.ok) {
        const filteredConferences = data.filter((conference) =>
          conference.sessions.some(
            (session) =>
              new Date(session.startTime) <= new Date() &&
              new Date() <= new Date(session.endTime)
          )
        );
        setOngoingConferences(filteredConferences);
        console.log("Ongoing Conferences fetched successfully:", filteredConferences);
      } else {
        console.error("Error fetching conferences:", data.message);
      }
    } catch (error) {
      console.error("Error fetching conferences:", error);
    }
  };

  const fetchSessionDetails = async (conferenceId, sessionId) => {
    try {
      const response = await fetch(`http://localhost:5001/api/conferences/${conferenceId}/session/${sessionId}`);
      const data = await response.json();

      if (response.ok) {
        console.log("Session details fetched successfully:", data);
        return data;
      } else {
        console.error("Error fetching session details:", data.message);
        return null;
      }
    } catch (error) {
      console.error("Error fetching session details:", error);
      return null;
    }
  };

  useEffect(() => {
    fetchOngoingConferences();
  }, []);

  useEffect(() => {
    const fetchOngoingConferencesWithDetails = async () => {
      const conferencesWithDetails = await Promise.all(
        ongoingConferences.map(async (conference) => {
          const sessionDetailsPromises = conference.sessions.map((session) =>
            fetchSessionDetails(conference._id, session._id)
          );
          const sessionDetails = await Promise.all(sessionDetailsPromises);
          return { ...conference, sessionDetails };
        })
      );
      setOngoingConferences(conferencesWithDetails);
    };

    fetchOngoingConferencesWithDetails();
  }, [ongoingConferences]);

  return (
    <>
      <Sidebar />
      <div>
        <div className=" Ccr1"> Ongoing Sessions</div>
        <div className="CAppss">
          <Carousel showDots={true} responsive={responsive}>
            {ongoingConferences.map((conference) => (
              <div key={conference._id}>
                <h3>{conference.presenterName}</h3>
                <p>{conference.SessionName}</p>
                {conference.sessionDetails &&
                  conference.sessionDetails.map((session) => (
                    <ConferneceRoomCards
                      key={session._id}
                      room={conference.room}
                      name={session.speaker}
                      topic={session.sessionName}
                      Ccapacity={conference.CurrentCapacity}
                      Mcapacity={conference.MaxCapacity}
                      // Add more properties as needed
                    />
                  ))}
              </div>
            ))}
          </Carousel>
        </div>
      </div>
    </>
  );
}

// Define 'responsive' if not already defined
const responsive = {
  desktop: {
    breakpoint: { max: 3000, min: 1024 },
    items: 3,
  },
  tablet: {
    breakpoint: { max: 1024, min: 464 },
    items: 2,
  },
  mobile: {
    breakpoint: { max: 464, min: 0 },
    items: 1,
  },
};







// import "./App.css";
// import Carousel from "react-multi-carousel";
// import "react-multi-carousel/lib/styles.css";
// import SessionCards from "../components/SessionCards";
// import { sessionData, responsive } from "../DataFiles/Session_data";
// import React, { useEffect, useState } from "react";


// export default function ConferenceRooms() {
//     const [data, setData] = useState(sessionData);

//     useEffect(() => {
//         fetch("http://localhost:5001/rooms")
//             .then((res) => res.json())
//             .then((data) => {
//                 setData(data);
//                 console.log(data);
//             });
//     }, []);

//     const session = data.map((item) => (
//         <SessionCards
//             Sname={item.Sname}
//             url={item.imageurl}
//             Pname={item.presenterName}
//             duration={item.time}
//         />
//     ));
//     return (
//         <div>
//             <div className=" cr1"> Conference Room 1</div>
//             <div className="Appss">


//                 <Carousel showDots={true} responsive={responsive}>
//                     {session}
//                 </Carousel>
//             </div>
//         </div>
//     );
// };


