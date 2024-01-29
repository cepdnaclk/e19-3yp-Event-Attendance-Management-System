import React, { useEffect, useState } from 'react';
// import { use } from '../../../backend/routes/conferenceRoutes';

export default function Croom({ conferenceId }) {
  const [modal, setModal] = useState(false);
  const [isEditing, setIsEditing] = useState(false);

  const [sessionName, setSessionName] = useState('');
  const [speaker, setSpeakerName] = useState('');
  const [SessionDetails, setSessionDetails] = useState('');
  const [maxAttendeeCap, setMaxCapacity] = useState('');
  const [startTime, setStartTime] = useState('');
  const [endTime, setEndTime] = useState('');
  const [conferenceData, setConferenceData] = useState('');

  const [sessions, setSessions] = useState([]);
  const [sessionDetailsList, setSessionDetailsList] = useState([]);

  // setIsEditing(false);

  const toggleModal = () => {
    setModal(!modal);
    // setIsEditing(false);
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

  const handleConferenceDelete = async () => {
    // Display a confirmation dialog
    const shouldDelete = window.confirm("Are you sure you want to delete this conference?");

    if (!shouldDelete) {
      return;
    }
    try {
      const response = await fetch(`http://localhost:5001/api/conferences/${conferenceId}`, {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
        },
      });

      if (response.ok) {
        console.log('Conference deleted successfully');
      } else {
        const data = await response.json();
        console.error('Conference deletion failed:', data.message);
      }
    } catch (error) {
      console.error('Error during conference deletion:', error);
    }
  };

  const handleSessionEdit = async (sessionId) => {
    try {
      // Fetch the existing session details
      const existingSession = sessionDetailsList.find(session => session._id === sessionId);

      console.log(sessionId);

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
      const formattedEndTime = existingSession.endTime.slice(0, -1);
      setStartTime(formattedStartTime);
      setEndTime(formattedEndTime);

      setIsEditing(true);

      toggleModal();

      // Make a PUT request to update the session on the server
      const response = await fetch(`http://localhost:5001/api/conferences/${conferenceId}/sessionup/${sessionId}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          sessionName,
          speaker,
          SessionDetails,
          maxAttendeeCap: parseInt(maxAttendeeCap),
          // startTime: new Date(startTime),
          // endTime: new Date(endTime),
          startTime: new Date(formattedStartTime),
          endTime: new Date(formattedEndTime),
        }),
      });

      // setIsEditing(false);

      console.log('response');
      if (response.ok) {
        console.log('Session updated successfully');
        getSessions();
        // setIsEditing(false);
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
      console.log(sessionName);
      const response = await fetch(`http://localhost:5001/api/conferences/session/${conferenceId}`, {
        // const response = await fetch(`http://3.110.135.90:5001/api/conferences/session/65993c23a87fe5df449913c2`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          sessions: [
            {
              sessionName,
              speaker,
              SessionDetails,
              maxAttendeeCap: parseInt(maxAttendeeCap),
              startTime: new Date(startTime),
              endTime: new Date(endTime),
            }]
        }),
      });
      // console.log('sessionName:', sessionName);
      // console.log('speakerName:', speakerName);
      // console.log('sessionDetails:', sessionDetails);
      // console.log('maxCapacity:', maxCapacity);
      // console.log('startTime:', startTime);
      // console.log('endTime:', endTime);
      const data = await response.json();

      // console.log('Response status:', response.status);
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

  // get session ids
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

  // get conference details
  useEffect(() => {
    const fetchConferenceDetails = async () => {
      try {
        const response = await fetch(`http://localhost:5001/api/conferences/${conferenceId}`);
        const data = await response.json();

        if (response.ok) {
          console.log('Conference details fetched successfully:', data);
          setConferenceData(data);
        } else {
          console.error('Error fetching conference details:', data.message);
        }
      } catch (error) {
        console.error('Error fetching conference details:', error);
      }
    };

    fetchConferenceDetails();
  }, [conferenceId]);

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

  const subtractTime = (dateTimeString, hours, minutes) => {
    const dateTime = new Date(dateTimeString);
    dateTime.setHours(dateTime.getHours() - hours);
    dateTime.setMinutes(dateTime.getMinutes() - minutes);

    // Format the adjusted date and time
    const adjustedTime = dateTime.toLocaleString('en-US', {
      timeZone: 'Asia/Colombo',
      // weekday: 'short',
      year: 'numeric',
      month: 'numeric',
      day: 'numeric',
      hour: 'numeric',
      minute: 'numeric',
      second: 'numeric',
    });

    return adjustedTime;
  };

  const handleSubmitButtonClick = (sessionId) => {
    // Determine which function to call based on the modal context
    if (isEditing) {
      console.log('edittt');
      handleSessionEdit(sessionId);
    } else {
      console.log('createee');
      handleSessionCreate();
    }
    toggleModal();
    setIsEditing(false);
  };

  return (
    <div className="cx">
      <div className='cx11'>
        {/* <h5>Conference Room: {conferenceId}</h5> */}
        {conferenceData && (
          <h5>Conference Room: {conferenceData.conferenceDetails}</h5>
        )}
        <button onClick={toggleModal} className="btn-modal1">
          Add session
        </button>
        <button onClick={handleConferenceDelete} className="btn-modal">
          Delete Conference
        </button>

      </div>

      {modal && (
        <div className="modal2">
          <div onClick={toggleModal} className="overlay2"></div>
          <div className="modal-content2">
            <div>
              <label htmlFor="sessionName">Session Name:</label>
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
                value={speaker}
                onChange={(e) => setSpeakerName(e.target.value)}
              />

              <label htmlFor="sessionDetails">Session Details:</label>
              <input
                type="text"
                id="sessionDetails"
                placeholder="Enter Session Details"
                value={SessionDetails}
                onChange={(e) => setSessionDetails(e.target.value)}
              />

              <label htmlFor="maxCapacity">Max Capacity:</label>
              <input
                type="text"
                id="maxCapacity"
                placeholder="Enter Max Capacity"
                value={maxAttendeeCap}
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
            </div>
            <div>
              {/* <button type="submit" onClick={handleSessionCreate}> */}
              {/* <button type="submit" onClick={handleSubmitButtonClick}>
                                Submit
                            </button> */}
              <button className='btn-modal' type="submit" onClick={handleSubmitButtonClick}>
                {isEditing ? 'Update' : 'Submit'}
              </button>
            
            <button className="btn-modal" onClick={toggleModal}>
              Close
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
            <th>Max Capacity</th>
            <th>Session Details</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {sessionDetailsList.map((session) => (
            <tr key={session._id}>
              <td>{session.sessionName || "Loading"}</td>
              <td>{new Date(session.startTime).toLocaleDateString('en-US') || "Loading"}</td>
              <td>{session.speaker || "Loading"}</td>
              <td>{session.maxAttendeeCap || "Loading"}</td>
              <td>{session.SessionDetails || "Loading"}</td>
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
