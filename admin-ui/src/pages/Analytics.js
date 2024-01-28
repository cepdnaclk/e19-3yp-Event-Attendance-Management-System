import React, { useState, useEffect } from "react";
import Sidebar from "../components/Sidebar";
import baseUrl from "../baseUrl";

const Analytics = () => {
  const [percentageData, setPercentageData] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        // Fetch total current capacity for each conference
        const currentCapacityResponse = await fetch("http://localhost:5001/api/currentattendee/totalCapacityByConference");
        const currentCapacityData = await currentCapacityResponse.json();

        const updatedData = [];

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

          const conferenceName = confNameData.conferenceDetails;

          const percentage = (currentCapacityData.totalCurrentCapacityByConference[i].totalCurrentCapacity / maxAttendeeCapData.totalMaxAttendeeCap) * 100;

          // Add new data to updatedData array
          updatedData.push({ conferenceName, percentage });

          // // Update state with the result
          // percentageData.push({ conferenceId, percentage });
        }
        setPercentageData(updatedData);
        console.log(updatedData);

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
    <>
      <Sidebar />
      <div>
        <h1>Under Construction</h1>
        {/* Render your data here */}
        <ul>
          {percentageData.map((item) => (
            <li key={item.conferenceId}>
              Conference Name: {item.conferenceName}, Percentage: {item.percentage}
            </li>
          ))}
        </ul>
      </div>
    </>
  );
};

export default Analytics;
