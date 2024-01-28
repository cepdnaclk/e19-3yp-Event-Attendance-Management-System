import React, { useState, useEffect } from "react";
import "../style.css";
import SessionLineChart from "./SessionLineChart";
import SessionBarChart from "./SessionBarChart";
import Bubble from "./Bubble";

const AnalyticsTop = () => {
  const [percentageData, setPercentageData] = useState([]);
  //bar chart data
  const [updatedData, setUpdatedData] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const currentCapacityResponse = await fetch(
          "http://localhost:5001/api/currentattendee/totalCapacityByConference"
        );
        const currentCapacityData = await currentCapacityResponse.json();

        const totalCapacity = await fetch(
          "http://localhost:5001/api/currentattendee/totalCapacity"
        );
        const totalCapacityData = await totalCapacity.json();
        console.log(totalCapacityData.totalCurrentCapacity);

        const updatedData = [];

        for (
          let i = 0;
          i < currentCapacityData.totalCurrentCapacityByConference.length;
          i++
        ) {
          const conferenceId =
            currentCapacityData.totalCurrentCapacityByConference[i]._id;
          const maxAttendeeCapResponse = await fetch(
            `http://localhost:5001/api/currentattendee/sumOfCapOfConf/${conferenceId}`
          );
          const maxAttendeeCapData = await maxAttendeeCapResponse.json();

          const confName = await fetch(
            `http://localhost:5001/api/conferences/${conferenceId}`
          );
          const confNameData = await confName.json();

          const conferenceName = confNameData.conferenceDetails;
          const totalCurrentCapacity =
            currentCapacityData.totalCurrentCapacityByConference[i]
              .totalCurrentCapacity;
          const maxAttendeeCap = maxAttendeeCapData.totalMaxAttendeeCap;

          const percentage = (totalCurrentCapacity / maxAttendeeCap) * 100;

          updatedData.push({ conferenceName, percentage });
        }

        setPercentageData(updatedData);

        //bar chart data
        setUpdatedData(updatedData);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };
    fetchData();
  }, []);

  return (
    <div className="analytics-charts">
      <div className="analytics-inline">
        <div className="analytic-box-chart">
          <h4 className="txt-h4">Attendee entrance count in each hour</h4>
          <div class="line"></div>
          <p className="txt-body">
            Session: <Bubble content={"Harnessing AI for Business Growth"} />{" "}
            max capacity <Bubble content={360} />
          </p>
          <SessionLineChart />
        </div>
        <div className="analytic-box-chart">
          <h4 className="txt-h4">Conference room Attendance</h4>
          <div class="line"></div>
          <p className="txt-body">
            Session: <Bubble content={"Harnessing AI for Business Growth"} />{" "}
            max capacity <Bubble content={360} />
          </p>
          <SessionBarChart data={updatedData} />
        </div>
      </div>
    </div>
  );
};

export default AnalyticsTop;
