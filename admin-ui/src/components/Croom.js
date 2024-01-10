import React, { useState } from 'react';

export default function Croom({ conferenceId }) {
    const [modal, setModal] = useState(false);
    const [sessionName, setSessionName] = useState('');
    const [speakerName, setSpeakerName] = useState('');
    const [sessionDetails, setSessionDetails] = useState('');
    const [maxCapacity, setMaxCapacity] = useState('');
    const [startTime, setStartTime] = useState('');
    const [endTime, setEndTime] = useState('');

    const toggleModal = () => {
        setModal(!modal);
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
            <div className="cardbox1"> This is {conferenceId} room. When the user inputs a session, it should display here</div>
        </div>
    );
}
