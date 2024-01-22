import React from 'react'

export default function ConferneceRoomCards(props) {
    return (

        <div className="Ccard">

            <h4>{props.topic}</h4>
            {/* <img className="Cimage" src={props.url} alt="" /> */}
            <p className="Cname">
                <p>Room: {props.conferenceName}</p>
                <p>Speaker: {props.name}</p>
                <p>About: {props.details}</p>
                <p>Start Time: {props.StartTime}</p>
                <p>End Time: {props.EndTime}</p>

            </p>
            <p className="Cname2">
                <p>Current Capacity :{props.Ccapacity}</p>
                <p> Max Capacity    :{props.Mcapacity}</p>
            </p>

        </div>
    )
}

