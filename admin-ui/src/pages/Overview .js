// currentcap

import React, { useState, useEffect } from "react";
import "./App.css";
import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";
import ConferneceRoomCards from "../components/ConferenceRoomCards";
import Sidebar from "../components/Sidebar";

export default function Overview() {
  const [ongoingConferences, setOngoingConferences] = useState([]);

  // const fetchCurrentCapacity = async (conferenceId) => {
  //   try {
  //     const response = await fetch("http://localhost:5001/api/currentattendee/conferenceId");
  //     const data = await response.json();


  const fetchOngoingConferences = async () => {
    try {
      const response = await fetch("http://localhost:5001/api/conferences/get");
      const data = await response.json();

      if (response.ok) {
        const ongoingSessionsList = [];

        for (const conference of data) {
          for (const session of conference.sessions) {
            // data.forEach((conference) => {
            //   conference.sessions.forEach((session) => {
            const startTime = new Date(session.startTime);
            const endTime = new Date(session.endTime);
            const currentTime = new Date();

            // Format the dates to the desired format
            const formattedStartTime = startTime.toLocaleString('en-US', { timeZone: 'Asia/Colombo' });
            const formattedEndTime = endTime.toLocaleString('en-US', { timeZone: 'Asia/Colombo' });
            const ToformattedCurrentTime = currentTime.toLocaleString('en-US', { timeZone: 'Asia/Colombo' });

            // Convert the formatted string to a Date object
            const CurrentTime = new Date(ToformattedCurrentTime);
            const StartTime = new Date(formattedStartTime);
            const EndTime = new Date(formattedEndTime);

            // substract 15 hours
            const formatted_StartTime = new Date(
              StartTime.getFullYear(),
              StartTime.getMonth(),
              StartTime.getDate(),
              StartTime.getHours() - 15,
              StartTime.getMinutes(),
              StartTime.getSeconds(),
            );

            const formatted_EndTime = new Date(
              EndTime.getFullYear(),
              EndTime.getMonth(),
              EndTime.getDate(),
              EndTime.getHours() - 15,
              EndTime.getMinutes(),
              EndTime.getSeconds(),
            );

            // Subtract 19 hours
            const formattedCurrentTime = new Date(
              CurrentTime.getFullYear(),
              CurrentTime.getMonth(),
              CurrentTime.getDate(),
              CurrentTime.getHours() - 19,
              CurrentTime.getMinutes(),
              CurrentTime.getSeconds(),
            );

            const adjusted_StartTime = formatted_StartTime.toLocaleString('en-US', { timeZone: 'Asia/Colombo' });
            const adjusted_EndTime = formatted_EndTime.toLocaleString('en-US', { timeZone: 'Asia/Colombo' });
            const adjustedTime = formattedCurrentTime.toLocaleString('en-US', { timeZone: 'Asia/Colombo' });

            console.log('Start Time:', adjusted_StartTime);
            console.log('End Time:', adjusted_EndTime);
            // console.log('Current Time:', formattedCurrentTime);
            // console.log('Current Time:', CurrentTime.toLocaleString('en-US', { timeZone: 'Asia/Colombo' }));
            console.log('Adjusted Time:', adjustedTime);

            // console.log('Condition 1:', adjusted_StartTime <= adjustedTime);
            // console.log('Condition 2:', adjustedTime <= formattedEndTime);
            // console.log('Type of adjustedTime:', typeof adjustedTime);
            // console.log('Type of adjusted_EndTime:', typeof adjusted_EndTime);

            try {
              const currentAttendeesResponse = await fetch(`http://localhost:5001/api/currentattendee/${conference._id}`);
              const currentAttendeesData = await currentAttendeesResponse.json();

              if (currentAttendeesResponse.ok) {
                const currentCapacity = currentAttendeesData.currentCapacity || 0;
                // console.log(currentCapacity);

                // if (formattedStartTime <= adjustedTime && adjustedTime <= formattedEndTime) {
                if (formatted_StartTime <= formattedCurrentTime && formattedCurrentTime <= formatted_EndTime) {
                  ongoingSessionsList.push({
                    conferenceId: conference._id,
                    confName: conference.conferenceDetails,
                    sessionName: session.sessionName,
                    SessionDetails: session.SessionDetails,
                    speaker: session.speaker,
                    startTime: session.startTime,
                    endTime: session.endTime,
                    MaxCapacity: session.maxAttendeeCap,
                    CurrentCapacity: currentCapacity,
                  });
                }
              } else {
                console.error(`Error fetching currentCapacity for conferenceId ${conference._id}:`, currentAttendeesData.message);
              }
            } catch (error) {
              console.error(`Error fetching currentCapacity for conferenceId ${conference._id}:`, error);
            }

            //   });
            // });
          }
        }

        setOngoingConferences(ongoingSessionsList);
        console.log("Ongoing Conferences fetched successfully:", ongoingSessionsList);
      } else {
        console.error("Error fetching conferences:", data.message);
      }
    } catch (error) {
      console.error("Error fetching conferences:", error);
    }
  };

  useEffect(() => {
    fetchOngoingConferences();
  }, []);

  const formatTime = (dateTimeString) => {
    const dateTime = new Date(dateTimeString);

    // Format the date and time
    const formattedTime = dateTime.toLocaleString('en-US', {
      timeZone: 'Asia/Colombo',
      hour: 'numeric',
      minute: 'numeric',
      second: 'numeric',
    });

    return formattedTime;
  };

  return (
    <div className="ss">
      <>
        <Sidebar />

        <div className=" Ccr1"> Ongoing Sessions</div>

        <Carousel showDots={true} responsive={responsive}>
          {ongoingConferences.map((session) => (
            <div className="CAppss" key={session.conferenceId + session.sessionName}>
              {/* <h3>Conference Name: {session.confName}</h3> */}
              {/* <p>{session.sessionName}</p> */}

              <ConferneceRoomCards
                key={session._id}
                conferenceName={session.confName}
                // room={session.conferenceId}
                details={session.SessionDetails}
                name={session.speaker}
                topic={session.sessionName}
                StartTime={formatTime(session.startTime)}
                EndTime={formatTime(session.endTime)}
                // Ccapacity={conference.CurrentCapacity}
                Ccapacity={session.CurrentCapacity}
                Mcapacity={session.MaxCapacity}
              />
              <ConferneceRoomCards
                key={session._id}
                conferenceName={session.confName}
                // room={session.conferenceId}
                details={session.SessionDetails}
                name={session.speaker}
                topic={session.sessionName}
                StartTime={formatTime(session.startTime)}
                EndTime={formatTime(session.endTime)}
                // Ccapacity={conference.CurrentCapacity}
                Ccapacity={session.CurrentCapacity}
                Mcapacity={session.MaxCapacity}
              />
              <ConferneceRoomCards
                key={session._id}
                conferenceName={session.confName}
                // room={session.conferenceId}
                details={session.SessionDetails}
                name={session.speaker}
                topic={session.sessionName}
                StartTime={formatTime(session.startTime)}
                EndTime={formatTime(session.endTime)}
                // Ccapacity={conference.CurrentCapacity}
                Ccapacity={session.CurrentCapacity}
                Mcapacity={session.MaxCapacity}
              />
              <ConferneceRoomCards
                key={session._id}
                conferenceName={session.confName}
                // room={session.conferenceId}
                details={session.SessionDetails}
                name={session.speaker}
                topic={session.sessionName}
                StartTime={formatTime(session.startTime)}
                EndTime={formatTime(session.endTime)}
                // Ccapacity={conference.CurrentCapacity}
                Ccapacity={session.CurrentCapacity}
                Mcapacity={session.MaxCapacity}
              />
              <ConferneceRoomCards
                key={session._id}
                conferenceName={session.confName}
                // room={session.conferenceId}
                details={session.SessionDetails}
                name={session.speaker}
                topic={session.sessionName}
                StartTime={formatTime(session.startTime)}
                EndTime={formatTime(session.endTime)}
                // Ccapacity={conference.CurrentCapacity}
                Ccapacity={session.CurrentCapacity}
                Mcapacity={session.MaxCapacity}
              />

            </div>
          ))}
        </Carousel>


      </>
    </div>
  );
}

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
