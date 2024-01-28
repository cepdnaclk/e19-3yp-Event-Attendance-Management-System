import React, { useState, useEffect } from "react";
import Sidebar from "../components/Sidebar";
import AnalyticsTop from "../components/AnalyticsTop";
import AnalyticsCharts from "../components/AnalyticsCharts";
import "../style.css";
// import baseUrl from "../baseUrl";

const Analytics = () => {
  const [percentageData, setPercentageData] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        // Fetch total current capacity for each conference
        const currentCapacityResponse = await fetch("http://localhost:5001/api/currentattendee/totalCapacityByConference");
        const currentCapacityData = await currentCapacityResponse.json();

        const updatedData = [];
        const updatedData2 = [];

        // console.log(currentCapacityData);
        // console.log(currentCapacityData.totalCurrentCapacityByConference[0].totalCurrentCapacity);

        for (let i = 0; i < currentCapacityData.totalCurrentCapacityByConference.length; i++) {
          // console.log(currentCapacityData.totalCurrentCapacityByConference[i]._id);
          // console.log(currentCapacityData.totalCurrentCapacityByConference[i].totalCurrentCapacity);

          const conferenceId = currentCapacityData.totalCurrentCapacityByConference[i]._id;
          const maxAttendeeCapResponse = await fetch(`http://localhost:5001/api/currentattendee/sumOfCapOfConf/${conferenceId}`);          
          const maxAttendeeCapData = await maxAttendeeCapResponse.json();
          // console.log(maxAttendeeCapData);

          const confName = await fetch(`http://localhost:5001/api/conferences/${conferenceId}`);
          const confNameData = await confName.json();

          // const confId = confNameData._id;
          const conferenceName = confNameData.conferenceDetails;
          const totalCurrentCapacity = currentCapacityData.totalCurrentCapacityByConference[i].totalCurrentCapacity;
          const maxAttendeeCap = maxAttendeeCapData.totalMaxAttendeeCap;

          // console.log("conferenceId", confId);

          // Calculate the percentage
          const percentage = (totalCurrentCapacity / maxAttendeeCap) * 100;
          const difference = maxAttendeeCap - totalCurrentCapacity;

          // if(difference<0){
          //   difference = -difference;
          // }

          // Add new data to updatedData array
          updatedData.push({ conferenceName, percentage });
          updatedData2.push({ conferenceId, conferenceName, totalCurrentCapacity, maxAttendeeCap, percentage, difference });

          // // Update state with the result
          // percentageData.push({ conferenceId, percentage });
        }
        setPercentageData(updatedData);
        setPercentageData(updatedData2);        
        console.log("updatedData",updatedData);
        console.log("updatedData2",updatedData2);

        /////////// to find conferenceName and capacity values of max and min percentage

        // Find the conference with the maximum and min percentage
        const maxPercentageConference = updatedData2.reduce((max, current) => (current.percentage > max.percentage ? current : max), { percentage: -Infinity });
        const minPercentageConference = updatedData2.reduce((min, current) => (current.percentage < min.percentage ? current : min), { percentage: Infinity });

        console.log("Conference with max percentage:", maxPercentageConference);
        console.log("Conference with min percentage:", minPercentageConference);

        // Access data
        const maxPercentageConferenceName = maxPercentageConference.conferenceName;
        const maxTotalCurrentCapacity = maxPercentageConference.totalCurrentCapacity;
        const maxMaxAttendeeCap = maxPercentageConference.maxAttendeeCap;
        const maxPercentage = maxPercentageConference.percentage;
        const maxDifference = maxPercentageConference.difference;

        const minPercentageConferenceName = minPercentageConference.conferenceName;
        const minTotalCurrentCapacity = minPercentageConference.totalCurrentCapacity;
        const minMaxAttendeeCap = minPercentageConference.maxAttendeeCap;
        const minPercentage = minPercentageConference.percentage;
        const minDifference = minPercentageConference.difference;

        // console.log("ConferenceId with max percentage:", maxPercentageConferenceName);
        // console.log("ConferenceId with min percentage:", minPercentageConferenceName);

        // // Transform the data
        // const transformedData = updatedData.map(item => ({
        //   name: item.conferenceName,
        //   Percentage: item.percentage,
        // }));
        // console.log(transformedData);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };
    fetchData(); 
  }, []); 

  // console.log(percentageData);

  return (
    <div>
      <Sidebar />
      <div className="analytic-page">
        <p>
          <h3>Analytics</h3>
        </p>
        <AnalyticsTop />
        <AnalyticsCharts />
      </div>
    </div>
  );
};

export default Analytics;
