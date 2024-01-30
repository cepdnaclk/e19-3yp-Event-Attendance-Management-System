import React, { useState } from "react";
import { useLocation } from "react-router-dom";

export default function ConferneceRoomCards(props) {
  console.log("passed");
  return (
    <div className="Ccard">
      <div className="ceee">{props.topic}</div>
      {/* <img className="Cimage" src={props.url} alt="" /> */}
      <hr />
      <p className="Cname">
        <div className="r2">Room: {props.conferenceName}</div>
        <div className="ab">{props.details}</div>
        <div className="sp">Speaker: {props.name}</div>
        <div className="ti">
          {props.StartTime}-{props.EndTime}{" "}
        </div>
      </p>
      <hr />
      <p className="Cname2">
        <span className="label21">Current Capacity</span>
        <span className="ca1">{props.Ccapacity}</span>
        <br />
        <span className="label22">Max Capacity</span>
        <span className="ca2">{props.Mcapacity}</span>
      </p>
      <a href="/ConferenceRooms" className="vi">
        View room >
      </a>
    </div>
  );
}
