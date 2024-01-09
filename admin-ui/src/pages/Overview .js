import React, {useState, useEffect} from "react";
import "./App.css";
import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";
import ConferneceRoomCards from "../components/ConferenceRoomCards";
import { conferenceData, responsive } from "../DataFiles/Conference_data";
import Sidebar from "../components/Sidebar";
import axios from "axios";

export default function Overview() {
  let conference = conferenceData.map((item) => (
    <ConferneceRoomCards
      room={item.RoomNo}
      url={item.imageurl}
      name={item.presenterName}
      topic={item.SessionName}
      Ccapacity={item.CurrentCapacity}
      Mcapacity={item.MaxCapacity}
    />
  ));

  const [sessionData, setSessionData] = useState([]);


  const fetchConferenceIds = async () => {
    try {
      const response = await fetch('http://3.110.135.90:5001/api/conferences/65992da3075e6e1dfecb49e5/session/6599c43868a2320245b501e1');
      const data = await response.json();

      if (response.ok) {
        setSessionData(data);
        console.log('ConferenceIds fetched successfully:', data);
      } else {
        console.error('Error fetching conferenceIds:', data.message);
      }
    } catch (error) {
      console.error('Error fetching conferenceIds:', error);
    }
  };

  useEffect(() => {
    // Fetch conferenceIds when the component mounts
    fetchConferenceIds();

  }, []); // Empty dependency array ensures the effect runs only once


  return (
    <>
      <Sidebar/>
      <div>
        <div className=" Ccr1"> Ongoing Sessions</div>
        <div className="CAppss">
          <Carousel showDots={true} responsive={responsive}>
            {conference}
          </Carousel>
        </div>
      </div>
    </>
  );
}
