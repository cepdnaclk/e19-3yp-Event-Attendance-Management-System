import React from 'react'

export default function AtendeeCards(props) {
    return (

        <div className="Ccard">

            <h2>Attendees {props.room}</h2>
            <img className="Cimage" alt="confernce room image" />

            <p className="Cname">
                <p>Speaker: {props.name}</p>
                <p>Topic: {props.topic}</p>
            </p>
            <p className="Cname2">
                <p>Current Capacity :{props.Ccapacity}</p>
                <p> Max Capacity    :{props.Mcapacity}</p>
            </p>

        </div>
    )
}

