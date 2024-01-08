import "./App.css";
import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";
import SessionCards from "../components/SessionCards";
import { sessionData, responsive } from "../DataFiles/Session_data";
import React , {useState, useEffect} from "react";
import axios from 'axios';
import Sidebar from "../components/Sidebar";

export default function ConferenceRooms() {
    const [conferenceData, setConferenceData] = useState([]);

    useEffect(() => {
        const accessToken = localStorage.getItem('token');
        if (accessToken) {
        axios.defaults.headers.common['Authorization'] = `Bearer ${accessToken}`;
          // Validate the token on the server
          axios.get('http://localhost:5001/api/conferences/')
            .then(response => {
              console.log(response.data);
                setConferenceData(response.data);
            })
            .catch(error => {
              console.error('Token validation failed', error);
            });
        }
    }, [])

    const session = sessionData.map((item) => (
        <SessionCards
            Sname={item.Sname}
            url={item.imageurl}
            Pname={item.presenterName}
            duration={item.time}
        />
    ));

    const conferences = conferenceData.map((item) => (
        <SessionCards
            Sname={item.SessionDetails}
            url={item.imageurl}
            Pname={item.sessionHolder}
            duration={item.startTime - item.endTime}
        />
    ));

    return (
        <>  
            <Sidebar/>
            <div>
                <div className=" cr1"> Conference Room 1</div>
                <div className="Appss">


                    <Carousel showDots={true} responsive={responsive}>
                        {session}
                    </Carousel>
                </div>
            </div>
        </>
        
    );
};


