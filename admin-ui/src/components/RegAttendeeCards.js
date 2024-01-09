import React from 'react';

// dropdown button
export default function RegAttendeeCards(props) {
    return (

        <div className="Ccard">

            <h2>Attendees {props.sessionId}</h2>
            {/* <img className="Cimage" alt="confernce room image" /> */}

            <p className="Cname">
                <p>Registered Capacity: {props.regCapacity}</p>
                
            </p>

        </div>
    )
}