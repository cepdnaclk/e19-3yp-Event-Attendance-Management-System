import React, { useState, useEffect } from "react";
import "../style.css";
import SessionPieChart from "./SessionPieChart";
import Bubble from "./Bubble";

///data has to be taken from the backend///

const AnalyticsTop = () => {
  const [percentageData, setPercentageData] = useState([]);
  const [maxConferenceInfo, setMaxConferenceInfo] = useState({});
  const [minConferenceInfo, setMinConferenceInfo] = useState({});
  const [totalCapacityData, setTotalCapacityData] = useState({});

  useEffect(() => {
    const fetchData = async () => {
      try {
        const currentCapacityResponse = await fetch(
          "http://localhost:5001/api/currentattendee/totalCapacityByConference"
        );
        const currentCapacityData = await currentCapacityResponse.json();
        // console.log("currentcap Data", currentCapacityData);

        const totalCapacity = await fetch(
          "http://localhost:5001/api/currentattendee/totalCapacity"
        );
        const totalCapacityData = await totalCapacity.json();
        // console.log("totalCurrentCap:", totalCapacityData.totalCurrentCapacity);

        const updatedData = [];
        const updatedData2 = [];

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
          console.log("maxAttendeeCapData", maxAttendeeCapData);

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
          const difference = maxAttendeeCap - totalCurrentCapacity;

          updatedData.push({ conferenceName, percentage });
          updatedData2.push({
            conferenceId,
            conferenceName,
            totalCurrentCapacity,
            maxAttendeeCap,
            percentage,
            difference,
          });
        }

        setPercentageData(updatedData);
        setPercentageData(updatedData2);

        const maxPercentageConference = updatedData2.reduce(
          (max, current) =>
            current.percentage > max.percentage ? current : max,
          { percentage: -Infinity }
        );
        const minPercentageConference = updatedData2.reduce(
          (min, current) =>
            current.percentage < min.percentage ? current : min,
          { percentage: Infinity }
        );
        console.log(minConferenceInfo);
        console.log(updatedData2);
        setMaxConferenceInfo(maxPercentageConference);
        setMinConferenceInfo(minPercentageConference);
        setTotalCapacityData(totalCapacityData);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };
    fetchData();
  }, []);

  return (
    <div className="analytics-top">
      <div className="analytics-inline">
        <div>
          <div className="analytic-box">
            <h4 className="txt-h4">Best Session</h4>
            <p className="txt-body">{maxConferenceInfo.conferenceName}</p>
            <p className="txt-body-small">
              Attendance: {maxConferenceInfo.totalCurrentCapacity} /
              {maxConferenceInfo.maxAttendeeCap}
            </p>
          </div>
          <div className="analytic-box">
            <h4 className="txt-h4">Worst Session</h4>
            <p className="txt-body">{minConferenceInfo.conferenceName}</p>
            <p className="txt-body-small">
              Attendance: {minConferenceInfo.totalCurrentCapacity} /
              {minConferenceInfo.maxAttendeeCap}
            </p>
          </div>
        </div>
        <div>
          <div className="analytic-box">
            <p className="txt-h4">Total Attendees</p>
            <p className="hero-number">
              {totalCapacityData.totalCurrentCapacity}
            </p>
            <p className="txt-body-small align-right">More Info</p>
          </div>
          <div className="analytic-box">
            <p className="txt-h4">Average Attendee Engagement</p>
            <p className="hero-number">1.5h</p>
          </div>
        </div>
        <div className="analytic-box-large">
          <h4 className="txt-h4">Most Performing Session</h4>
          <p className="txt-body">
            Max Capacity <Bubble content={maxConferenceInfo.maxAttendeeCap} />
          </p>
          <SessionPieChart
            data={[
              {
                name: "Attended",
                value: maxConferenceInfo.totalCurrentCapacity,
              },
              { name: "Not attended", value: maxConferenceInfo.difference },
            ]}
          />
        </div>
        <div className="analytic-box-large">
          <h4 className="txt-h4">Least Performing Session</h4>
          <p className="txt-body">
            Max Capacity <Bubble content={minConferenceInfo.maxAttendeeCap} />
          </p>
          <SessionPieChart
            data={[
              {
                name: "Attended",
                value: minConferenceInfo.totalCurrentCapacity,
              },
              { name: "Not attended", value: minConferenceInfo.difference },
            ]}
          />
        </div>
      </div>
      <div></div>
    </div>
  );
};

export default AnalyticsTop;
