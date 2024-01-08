'use client';
import "./App.css";
import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";
import SessionCards from "../components/SessionCards";
import { responsive } from "../DataFiles/Session_data";
// import { productData, responsive } from "./data";
import React, { useState, useEffect } from 'react';


export default function ConferenceRooms() {
  const [conferenceData, setConferenceData] = useState([]);

  useEffect(() => {
    const fetchConferenceData = async () => {
      try {
        console.log("ksjs;kh");
        const response = await fetch('http://localhost:5001/api/conferences/conferenceIds');
        const conferenceIds = await response.json();

        const conferenceDetailsPromises = conferenceIds.map(async (id) => {
          const sessionResponse = await fetch(`http://localhost:5001/api/conferences/${id}/sessionIds`);
          const conferenceData = await sessionResponse.json();
          console.log("ksjshgkk");
          const sessions = await Promise.all(conferenceData.sessionIds.map(async (sessionId) => {
            const sessionDetailsResponse = await fetch(`http://localhost:5001/api/conferences/${id}/sessions/${sessionId}`);
            return await sessionDetailsResponse.json();
          }));

          return { conferenceId: id, sessions };
        });
        const conferenceDetails = await Promise.all(conferenceDetailsPromises);
        setConferenceData(conferenceDetails);

      } catch (error) {
        console.error('Error fetching conference data:', error);
      }
    };

    fetchConferenceData();
  }, []);

  const session = conferenceData.map((item) => (
    <SessionCards
      // key={item._id}
      Sname={item.sessionName}
      // url={item.imageurl}
      Pname={item.speaker}
      duration={item.startTime}
    />
  ));

  return (
    <div>
      <div className="cr1"> Conference Room </div>
      <div className="Appss">
        <Carousel showDots={true} responsive={responsive}>
          {session}
        </Carousel>
      </div>
    </div>
  );
}

//   {conference.sessions.map((session) => (
//     <SessionCards
//       key={session._id}
//       Sname={session.sessionName}
//       Pname={session.speaker}
//       duration={session.endTime}
//     />
//   ))}