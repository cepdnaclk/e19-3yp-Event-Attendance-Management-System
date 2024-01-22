import React from 'react'

export default function ConferneceRoomCards(props) {
    return (

        <div className="Ccard">

            <div className='ceee'>{props.topic}</div>
            {/* <img className="Cimage" src={props.url} alt="" /> */}
            <hr />
            <p className="Cname">
                <div className='r2'>Room: {props.conferenceName}</div>
                <div className='ab'>About: {props.details}</div>
                <div className='sp'>Speaker: {props.name}</div>
                <div className='ti'> {props.StartTime}-{props.EndTime} </div>
            </p>
            <hr />
            <p className="Cname2">
                <span className="label21">Current Capacity</span>
                <span className="ca1">{props.Ccapacity}</span>
                <br />
                <span className="label22">Max Capacity</span>
                <span className="ca2">{props.Mcapacity}</span>
            </p>

        </div>
    )
}

