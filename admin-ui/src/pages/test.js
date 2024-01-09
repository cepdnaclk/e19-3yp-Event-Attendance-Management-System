import "./App.css";
import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";
import SessionCards from "../components/SessionCards";
import { sessionData, responsive } from "../DataFiles/Session_data";
import React, { useEffect, useState } from "react";


export default function ConferenceRooms() {
    const [data, setData] = useState(sessionData);

    useEffect(() => {
        fetch("http://localhost:5001/rooms")
            .then((res) => res.json())
            .then((data) => {
                setData(data);
                console.log(data);
            });
    }, []);

    const session = data.map((item) => (
        <SessionCards
            Sname={item.Sname}
            url={item.imageurl}
            Pname={item.presenterName}
            duration={item.time}
        />
    ));
    return (
        <div>
            <div className=" cr1"> Conference Room 1</div>
            <div className="Appss">


                <Carousel showDots={true} responsive={responsive}>
                    {session}
                </Carousel>
            </div>
        </div>
    );
};


