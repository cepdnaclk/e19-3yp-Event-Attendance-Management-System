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

    const handleSessionCreate = async () => {
        try {
            const response = await fetch(`http://3.110.135.90:5001/api/conferences/session/${conferenceId}`, {
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

    const getSessions = async () => {
        try {
            const response = await fetch(`http://3.110.135.90:5001/api/conferences/${conferenceId}/sessionIds`);
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

    const getSessionDetails = async (sessionId) => {
        try {
          const response = await fetch(`http://3.110.135.90:5001/api/conferences/${conferenceId}/session/${sessionId}`);
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
            {modal && (
                <div className="modal">
                    <div onClick={toggleModal} className="overlay"></div>
                    <div className="modal-content">
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
                            CLOSE
                        </button>
                    </div>
                </div>
            )}
            {sessionDetailsList.map((session) => (
                <div className="cardbox1">
                <p>Session Name : {session.sessionName || "Loading"}</p>
                <p>Session Details : {session.SessionDetails || "Loading"}</p>
                <p>Max Capacity : {session.maxAttendeeCap || "Loading"}</p>
                <p>Start Time : {(new Date(session.startTime)).toLocaleString('en-US', { timeZone: 'Asia/Colombo' }) || "Loading"}</p>
                <p>End Time : {(new Date(session.endTime)).toLocaleString('en-US', { timeZone: 'Asia/Colombo' }) || "Loading"}</p>
                <p>Speaker : {session.speaker || "Loading"}</p>
                <br></br>
            </div>
            ))} 
        </div>
    );
}
