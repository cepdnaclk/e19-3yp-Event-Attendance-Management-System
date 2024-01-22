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
      console.log("got????");
      const data = await response.json();
      console.log("got");

      if (response.ok) {
        const filteredConferences = data.filter((conference) =>
          conference.sessions.some((session) => {
            const startTime = new Date(session.startTime);
            const endTime = new Date(session.endTime);
            const currentTime = new Date();

            // Format the dates to the desired format

            // const options = {
            //   timeZone: 'Asia/Colombo',
            //   weekday: 'short',
            //   year: 'numeric',
            //   month: 'short',
            //   day: 'numeric',
            //   hour: 'numeric',
            //   minute: 'numeric',
            //   second: 'numeric',
            // };          
            // const formattedStartTime = startTime.toLocaleString('en-US', options);
            // const formattedEndTime = endTime.toLocaleString('en-US', options);
            // const formattedCurrentTime = currentTime.toLocaleString('en-US', options);

            const formattedStartTime = startTime.toLocaleString('en-US', { timeZone: 'Asia/Colombo' });
            const formattedEndTime = endTime.toLocaleString('en-US', { timeZone: 'Asia/Colombo' });
            const ToformattedCurrentTime = currentTime.toLocaleString('en-US', { timeZone: 'Asia/Colombo' });

            // Convert the formatted string to a Date object
            const CurrentTime = new Date(ToformattedCurrentTime);

            // Subtract 15 hours and 30 minutes
            const formattedCurrentTime = new Date(
              CurrentTime.getFullYear(),
              CurrentTime.getMonth(),
              CurrentTime.getDate(),
              CurrentTime.getHours() - 19,
              CurrentTime.getMinutes(),
              CurrentTime.getSeconds(),
            );

            const adjustedTime = formattedCurrentTime.toLocaleString('en-US', { timeZone: 'Asia/Colombo' });

            console.log('Start Time:', formattedStartTime);
            console.log('End Time:', formattedEndTime);
            // console.log('Current Time:', formattedCurrentTime);
            // console.log('Current Time:', CurrentTime.toLocaleString('en-US', { timeZone: 'Asia/Colombo' }));
            console.log('Adjusted Time:', adjustedTime);

            // Return true or false based on the comparison
            return formattedStartTime <= adjustedTime && adjustedTime <= formattedEndTime;
          })
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
    <div className="ss">
      <>
        <Sidebar />

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

      </>
    </div>
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
