import React from "react";
import "./App.css";
import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";
import ConferneceRoomCards from "../components/ConferenceRoomCards";
import { conferenceData, responsive } from "../DataFiles/Conference_data";

export default function Overview() {

    const conference = conferenceData.map((item) => (
        <ConferneceRoomCards
            room={item.RoomNo}
            url={item.imageurl}
            name={item.presenterName}
            topic={item.SessionName}
            Ccapacity={item.CurrentCapacity}
            Mcapacity={item.MaxCapacity}
        />
    ));

    return (
        <div>
            <div className=" Ccr1"> Ongoing Sessions</div>
            <div className="CAppss">

                <Carousel showDots={true} responsive={responsive}>
                    {conference}
                </Carousel>
            </div>
        </div>
    );
};


