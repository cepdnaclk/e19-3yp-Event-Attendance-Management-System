import React, { useEffect, useState } from 'react';
// import { use } from '../../../backend/routes/conferenceRoutes';

export default function Croom({ conferenceId }) {
  const [modal, setModal] = useState(false);
  const [sessionName, setSessionName] = useState('');
  const [speakerName, setSpeakerName] = useState('');
  const [sessionDetails, setSessionDetails] = useState('');
  const [maxCapacity, setMaxCapacity] = useState('');
  const [startTime, setStartTime] = useState('');
  const [endTime, setEndTime] = useState('');

  const [sessions, setSessions] = useState([]);
  const [sessionDetailsList, setSessionDetailsList] = useState([]);

  const options = {
    timeZone: 'Asia/Colombo',
    weekday: 'short',
    year: 'numeric',
    month: 'short',
    day: 'numeric',
    hour: 'numeric',
    minute: 'numeric',
    second: 'numeric',
  };

  const toggleModal = () => {
    setModal(!modal);
  };

  const handleSessionDelete = async (sessionId) => {
    // Display a confirmation dialog
    const shouldDelete = window.confirm("Are you sure you want to delete this session?");

    if (!shouldDelete) {
      // User canceled the deletion
      return;
    }
    try {
      const response = await fetch(`http://localhost:5001/api/conferences/${conferenceId}/session/${sessionId}`, {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
        },
      });

      if (response.ok) {
        console.log('Session deleted successfully');
        getSessions();
        // toggleModal();
      } else {
        const data = await response.json();
        console.error('Session deletion failed:', data.message);
        // Handle error and show appropriate message to the user
      }
    } catch (error) {
      console.error('Error during session deletion:', error);
      // Handle error and show appropriate message to the user
    }
  };

  const handleSessionEdit = async (sessionId) => {
    try {
      // Fetch the existing session details
      const existingSession = sessionDetailsList.find(session => session._id === sessionId);

      // Check if the session exists
      if (!existingSession) {
        console.error('Session not found for the given sessionId:', sessionId);
        return;
      }

      // Open the modal with existing session details
      setSessionName(existingSession.sessionName);
      setSpeakerName(existingSession.speaker);
      setSessionDetails(existingSession.SessionDetails);
      setMaxCapacity(existingSession.maxAttendeeCap);
      // setStartTime(existingSession.startTime);
      // setEndTime(existingSession.endTime);
      // Format the date and time values for the datetime-local input fields
      const formattedStartTime = existingSession.startTime.slice(0, -1); // Remove the 'Z' at the end
      const formattedEndTime = existingSession.endTime.slice(0, -1); // Remove the 'Z' at the end
      setStartTime(formattedStartTime);
      setEndTime(formattedEndTime);

      // Close the modal after editing if needed
      toggleModal();

      // Make a PUT request to update the session on the server
      const response = await fetch(`http://localhost:5001/api/conferences/${conferenceId}/sessionup/${sessionId}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          sessionName,
          speakerName,
          sessionDetails,
          maxCapacity: parseInt(maxCapacity),
          // startTime: new Date(startTime),
          // endTime: new Date(endTime),
          startTime: new Date(formattedStartTime),
          endTime: new Date(formattedEndTime),
        }),
      });

      console.log('response');
      if (response.ok) {
        console.log('Session updated successfully');
        getSessions();
        // toggleModal();
      } else {
        const data = await response.json();
        console.error('Session update failed:', data.message);
        // Handle error and show appropriate message to the user
      }
    } catch (error) {
      console.error('Error during session update:', error);
      // Handle error and show appropriate message to the user
    }
  };


  // create a new session
  const handleSessionCreate = async () => {
    try {
      console.log('conferenceId:', conferenceId);
      setSessionName((prevSessionName) => {
        console.log('sessionName:', prevSessionName);
        return prevSessionName; // Return the updated value
      });
      //   console.log('sessionName:', sessionName);
      // console.log('speakerName:', speakerName);
      // console.log('sessionDetails:', sessionDetails);
      // console.log('maxCapacity:', maxCapacity);
      // console.log('startTime:', startTime);
      // console.log('endTime:', endTime);
      const response = await fetch(`http://localhost:5001/api/conferences/session/${conferenceId}`, {
        // const response = await fetch(`http://3.110.135.90:5001/api/conferences/session/65993c23a87fe5df449913c2`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          sessionName,
          speakerName,
          sessionDetails,
          maxCapacity: parseInt(maxCapacity),
          startTime: new Date(startTime),
          endTime: new Date(endTime),
        }),
      });

      console.log('sessionName:', sessionName);
      console.log('speakerName:', speakerName);
      console.log('sessionDetails:', sessionDetails);
      console.log('maxCapacity:', maxCapacity);
      console.log('startTime:', startTime);
      console.log('endTime:', endTime);
      const data = await response.json();

      console.log('Response status:', response.status);
      console.log('Response data:', data);

      if (response.ok) {
        console.log('Session created successfully:', data);
        // Add logic to update your UI if needed
        toggleModal(); // Close the modal after successful creation if needed
      } else {
        console.error('Session creation failed:', data.message);
        // Handle error and show appropriate message to the user
      }
    } catch (error) {
      console.error('Error during session creation:', error);
      // Handle error and show appropriate message to the user
    }
  };

  // get session details for all sessions
  const getSessions = async () => {
    try {
      const response = await fetch(`http://localhost:5001/api/conferences/${conferenceId}/sessionIds`);
      const data = await response.json();

      if (response.ok) {
        setSessions(data.sessionIds);
        console.log('Sessions fetched successfully:', data.sessionIds);

        // Fetch session details for all sessions
        const detailsPromises = data.sessionIds.map((sessionId) => getSessionDetails(sessionId));
        const detailsList = await Promise.all(detailsPromises);

        setSessionDetailsList(detailsList);
      } else {
        console.error('Error fetching sessions:', data.message);
      }
    } catch (error) {
      console.error('Error fetching sessions:', error);
    }
  }

  useEffect(() => {
    getSessions();
  }, []);

  // get details of one session
  const getSessionDetails = async (sessionId) => {
    try {
      const response = await fetch(`http://localhost:5001/api/conferences/${conferenceId}/session/${sessionId}`);
      const data = await response.json();

      if (response.ok) {
        console.log('Session details fetched successfully:', data);
        return data;
      } else {
        console.error('Error fetching session details:', data.message);
        return 'Error';
      }
    } catch (error) {
      console.error('Error fetching session details:', error);
      return 'Error';
    }
  };

  return (
    <div className="cx">
      <button onClick={toggleModal} className="btn-modal">
        Add session
      </button>
      <h5>Conference Room: {conferenceId}</h5>

      {modal && (
        <div className="modal">
          <div onClick={toggleModal} className="overlay"></div>
          <div className="modal-content">
            <div>
              <label htmlFor="sessionName">Sessions Name:</label>
              <input
                type="text"
                id="sessionName"
                placeholder="Enter session name"
                value={sessionName}
                onChange={(e) => setSessionName(e.target.value)}
              />

              <label htmlFor="speakerName">Speaker Name:</label>
              <input
                type="text"
                id="speakerName"
                placeholder="Enter speaker name"
                value={speakerName}
                onChange={(e) => setSpeakerName(e.target.value)}
              />

              <label htmlFor="sessionDetails">Session Details:</label>
              <input
                type="text"
                id="sessionDetails"
                placeholder="Enter Session Details"
                value={sessionDetails}
                onChange={(e) => setSessionDetails(e.target.value)}
              />

              <label htmlFor="maxCapacity">Max Capacity:</label>
              <input
                type="text"
                id="maxCapacity"
                placeholder="Enter Max Capacity"
                value={maxCapacity}
                onChange={(e) => setMaxCapacity(e.target.value)}
              />

              <label htmlFor="startTime">Start Time:</label>
              <input
                type="datetime-local"
                id="startTime"
                placeholder="Enter start time"
                value={startTime}
                onChange={(e) => setStartTime(e.target.value)}
              />

              <label htmlFor="endTime">End Time:</label>
              <input
                type="datetime-local"
                id="endTime"
                placeholder="Enter end time"
                value={endTime}
                onChange={(e) => setEndTime(e.target.value)}
              />

              <button type="submit" onClick={handleSessionCreate}>
                Submit
              </button>
            </div>
            <button className="close-modal" onClick={toggleModal}>
              Close
            </button>
          </div>
        </div>
      )}
      {sessionDetailsList.map((session) => (
        <div className="cardbox1">
          <p>Sessions Name : {session.sessionName || "Loading"}</p>
          <p>Session Details : {session.SessionDetails || "Loading"}</p>
          <p>Max Capacity : {session.maxAttendeeCap || "Loading"}</p>
          <p>Start Time : {(new Date(session.startTime)).toLocaleString('en-US', { timeZone: 'Asia/Colombo' }) || "Loading"}</p>
          <p>End Time : {(new Date(session.endTime)).toLocaleString('en-US', { timeZone: 'Asia/Colombo' }) || "Loading"}</p>
          <p>Speaker : {session.speaker || "Loading"}</p>
          <br></br>
          <button onClick={() => handleSessionDelete(session._id)}>
            Delete Session
          </button>
          <button onClick={() => handleSessionEdit(session._id)}>
            Edit Session
          </button>
        </div>
      ))}
    </div>
  );
}
