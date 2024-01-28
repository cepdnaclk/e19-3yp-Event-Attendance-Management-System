import React, { useEffect, useState } from 'react';
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
    const shouldDelete = window.confirm("Are you sure you want to delete this session?");
    if (!shouldDelete) {
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
      const existingSession = sessionDetailsList.find(session => session._id === sessionId);
      if (!existingSession) {
        console.error('Session not found for the given sessionId:', sessionId);
        return;
      }
      setSessionName(existingSession.sessionName);
      setSpeakerName(existingSession.speaker);
      setSessionDetails(existingSession.SessionDetails);
      setMaxCapacity(existingSession.maxAttendeeCap);
      const formattedStartTime = existingSession.startTime.slice(0, -1);
      const formattedEndTime = existingSession.endTime.slice(0, -1);
      setStartTime(formattedStartTime);
      setEndTime(formattedEndTime);
      toggleModal();
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
          startTime: new Date(formattedStartTime),
          endTime: new Date(formattedEndTime),
        }),
      });
      if (response.ok) {
        console.log('Session updated successfully');
        getSessions();
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
  const handleSessionCreate = async () => {
    try {
      const response = await fetch(`http://localhost:5001/api/conferences/session/${conferenceId}`, {
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
      const data = await response.json();
      if (response.ok) {
        console.log('Session created successfully:', data);
        toggleModal();
      } else {
        console.error('Session creation failed:', data.message);
        // Handle error and show appropriate message to the user
      }
    } catch (error) {
      console.error('Error during session creation:', error);
      // Handle error and show appropriate message to the user
    }
  };
  const getSessions = async () => {
    try {
      const response = await fetch(`http://localhost:5001/api/conferences/${conferenceId}/sessionIds`);
      const data = await response.json();
      if (response.ok) {
        setSessions(data.sessionIds);
        const detailsPromises = data.sessionIds.map((sessionId) => getSessionDetails(sessionId));
        const detailsList = await Promise.all(detailsPromises);
        setSessionDetailsList(detailsList);
      } else {
        console.error('Error fetching sessions:', data.message);
      }
    } catch (error) {
      console.error('Error fetching sessions:', error);
    }
  };
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
  const subtractTime = (dateTimeString, hours, minutes) => {
    const dateTime = new Date(dateTimeString);
    dateTime.setHours(dateTime.getHours() - hours);
    dateTime.setMinutes(dateTime.getMinutes() - minutes);
    const adjustedTime = dateTime.toLocaleString('en-US', {
      timeZone: 'Asia/Colombo',
      year: 'numeric',
      month: 'numeric',
      day: 'numeric',
      hour: 'numeric',
      minute: 'numeric',
      second: 'numeric',
    });
    return adjustedTime;
  };
  useEffect(() => {
    getSessions();
  }, []);
  return (
    <div className="cx">
      <div className='cx11'>
        <h5>CR: {conferenceId}</h5>
        <button onClick={toggleModal} className="btnse"> Create session</button>
      </div>
      {modal && (
      
        <div className="modal2">
          <div onClick={toggleModal} className="overlay2"></div>
          
          <div className="modal-content2">
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
                placeholder="Enter session details"
                value={sessionDetails}
                onChange={(e) => setSessionDetails(e.target.value)}
              />
              <label htmlFor="maxCapacity">Max Capacity:</label>
              <input
                type="number"
                id="maxCapacity"
                placeholder="Enter max capacity"
                value={maxCapacity}
                onChange={(e) => setMaxCapacity(e.target.value)}
              />
              <label htmlFor="startTime">Start Time:</label>
              <input
                type="datetime-local"
                id="startTime"
                value={startTime}
                onChange={(e) => setStartTime(e.target.value)}
              />
              <label htmlFor="endTime">End Time:</label>
              <input
                type="datetime-local"
                id="endTime"
                value={endTime}
                onChange={(e) => setEndTime(e.target.value)}
              />
            </div>
            <div>
              <button onClick={handleSessionCreate} className="btn-modal">
                Create Session
              </button>
              <button onClick={toggleModal} className="btn-modal">
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}
      <table>
        <thead>
          <tr>
            <th>Session Name</th>
            <th>Start Time</th>
            <th>Speaker</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {sessionDetailsList.map((session) => (
            <tr key={session._id}>
              <td>{session.sessionName}</td>
              <td>{new Date(session.startTime).toLocaleDateString('en-US', options)}</td>
              <td>{session.speaker}</td>
              <td>
                <button className='btned' onClick={() => handleSessionEdit(session._id)}>Edit</button>
                <button className='btned' onClick={() => handleSessionDelete(session._id)}>Delete</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}