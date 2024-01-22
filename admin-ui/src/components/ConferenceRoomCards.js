import React from 'react'

export default function ConferneceRoomCards(props) {
    return (

        <div className="Ccard">


            <h2>Conference Room {props.room}</h2>
            {/* <img className="Cimage" src={props.url} alt="" /> */}

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

