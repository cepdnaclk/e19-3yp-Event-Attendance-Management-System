import React, { useEffect } from "react";
import { useState } from "react";
import DataTable from "react-data-table-component";
import "./App.css";
import axios from "axios";
import Sidebar from "../components/Sidebar";
import Attendee_page_card from "../components/Attendee_page_card";

const Attendees = () => {
  // Define columns for the DataTable
  const columns = [
    {
      name: "Attendee Name",
      selector: (row) => row.name,
      // sortable: true, // Uncomment this line if you want the 'Attendee' column to be sortable
    },
    {
      name: "Email",
      selector: (row) => row.email,
    },
    {
      name: "Contact No",
      selector: (row) => row.conNo,
    },
    {
      name: "Rfid No",
      selector: (row) => row.rfidNo,
    },
  ];

  // Initial data for the DataTable
  const initialData = [
    {
      name: "user1",
      timeIn: "9:00 AM",
      timeDuration: "2 hours",
      nextEvent: "Event1",
    },
    {
      name: "user1",
      timeIn: "9:00 AM",
      timeDuration: "2 hours",
      nextEvent: "Event1",
    },
    {
      name: "user2",
      timeIn: "9:00 AM",
      timeDuration: "2 hours",
      nextEvent: "Event1",
    },
    {
      name: "user1",
      timeIn: "9:00 AM",
      timeDuration: "2 hours",
      nextEvent: "Event1",
    },
  ];

  // State variables for managing data and search input
  const [data, setData] = useState(initialData);
  const [searchValue, setSearchValue] = useState("");
  // const [users, setUsers] = useState([]);

  const [ongoingConferences, setOngoingConferences] = useState([]);

  const fetchOngoingConferences = async () => {
    try {
      const response = await fetch("http://localhost:5001/api/conferences/get");
      const data = await response.json();

      if (response.ok) {
        const ongoingSessionsList = [];

        for (const conference of data) {
          for (const session of conference.sessions) {
            // data.forEach((conference) => {
            //   conference.sessions.forEach((session) => {
            const startTime = new Date(session.startTime);
            const endTime = new Date(session.endTime);
            const currentTime = new Date();

            // Format the dates to the desired format
            const formattedStartTime = startTime.toLocaleString('en-US', { timeZone: 'Asia/Colombo' });
            const formattedEndTime = endTime.toLocaleString('en-US', { timeZone: 'Asia/Colombo' });
            const ToformattedCurrentTime = currentTime.toLocaleString('en-US', { timeZone: 'Asia/Colombo' });

            // Convert the formatted string to a Date object
            const CurrentTime = new Date(ToformattedCurrentTime);
            const StartTime = new Date(formattedStartTime);
            const EndTime = new Date(formattedEndTime);

            // substract 15 hours
            const formatted_StartTime = new Date(
              StartTime.getFullYear(),
              StartTime.getMonth(),
              StartTime.getDate(),
              StartTime.getHours() - 15,
              StartTime.getMinutes(),
              StartTime.getSeconds(),
            );

            const formatted_EndTime = new Date(
              EndTime.getFullYear(),
              EndTime.getMonth(),
              EndTime.getDate(),
              EndTime.getHours() - 15,
              EndTime.getMinutes(),
              EndTime.getSeconds(),
            );

            // Subtract 19 hours 
            const formattedCurrentTime = new Date(
              CurrentTime.getFullYear(),
              CurrentTime.getMonth(),
              CurrentTime.getDate(),
              CurrentTime.getHours() - 19,
              CurrentTime.getMinutes(),
              CurrentTime.getSeconds(),
            );

            const adjusted_StartTime = formatted_StartTime.toLocaleString('en-US', { timeZone: 'Asia/Colombo' });
            const adjusted_EndTime = formatted_EndTime.toLocaleString('en-US', { timeZone: 'Asia/Colombo' });
            const adjustedTime = formattedCurrentTime.toLocaleString('en-US', { timeZone: 'Asia/Colombo' });

            console.log('Start Time:', adjusted_StartTime);
            console.log('End Time:', adjusted_EndTime);
            console.log('Current Time:', formatted_StartTime);
            // console.log('Current Time:', CurrentTime.toLocaleString('en-US', { timeZone: 'Asia/Colombo' }));
            console.log('Adjusted Time:', adjustedTime);

            console.log('Condition 1:', adjusted_StartTime <= adjustedTime);
            console.log('Condition 2:', adjustedTime <= formattedEndTime);
            // console.log('Type of adjustedTime:', typeof adjustedTime);
            // console.log('Type of adjusted_EndTime:', typeof adjusted_EndTime);

            console.log(conference._id);
            if (adjusted_StartTime <= adjustedTime && adjustedTime <= adjusted_EndTime) {
              try {
                const currentAttendeesResponse = await fetch(`http://localhost:5001/api/currentattendee/getData/${conference._id}`);
                const currentAttendeesData = await currentAttendeesResponse.json();
                console.log("(((((((((((curentcap", currentAttendeesData.currentCapacity);

                if (currentAttendeesResponse.ok) {
                  const currentCapacity = currentAttendeesData.currentCapacity || 0;
                  // console.log(currentCapacity);
                  ongoingSessionsList.push({
                    conferenceId: conference._id,
                    sessionId: session._id,
                  });
                  console.log("______________", ongoingSessionsList);
                } else {
                  console.error(`Error fetching currentCapacity for conferenceId ${conference._id}:`, currentAttendeesData.message);
                }
              } catch (error) {
                console.error(`Error fetching currentCapacity for conferenceId ${conference._id}:`, error);
              }

            } else {
              console.log("No ongoing sessions");
            }
          }
        }
        setOngoingConferences(ongoingSessionsList);
        console.log("Ongoing Conferences fetched successfully:", ongoingSessionsList);
      } else {
        console.error("Error fetching conferences:", data.message);
      }
    } catch (error) {
      console.error("Error fetching conferences:", error);
    }
  };

  useEffect(() => {
    fetchOngoingConferences();
  }, []);

  useEffect(() => {
    const accessToken = localStorage.getItem("token");
    if (accessToken) {
      axios.defaults.headers.common["Authorization"] = `Bearer ${accessToken}`;
      // Validate the token on the server
      axios
        .get("http://localhost:5001/api/attendees")
        .then((response) => {
          console.log(response.data);
          setData(response.data);
        })
        .catch((error) => {
          console.error("Token validation failed", error);
        });
    }
  }, []);

  // Function to handle changes in the search input
  const handleSearchChange = (e) => {
    const value = e.target.value;
    setSearchValue(value);

    // Filter data based on the search value
    const filteredData = data.filter((row) =>
      Object.values(row).some((val) =>
        String(val).toLowerCase().includes(value.toLowerCase())
      )
    );

    // Update the data state with the filtered data
    setData(filteredData);
  };

  // Function to clear the search input and restore the initial data
  const handleClearSearch = () => {
    setSearchValue("");
    setData(data);
  };

  return (
    <div className="atendeee">
      <Sidebar />
      <div className="att">Attendees</div>

      <div className="table-container">
        {/* Search box with clear button */}
        <div className=" searchbox">
          <input
            type="text"
            placeholder="Search attendees"
            value={searchValue}
            onChange={handleSearchChange}
            className="w-full p-2 border border-gray-300 rounded"
          />
          {searchValue && (
            <button
              className="absolute top-0 right-0 mr-2 mt-2 text-grey-500"
              onClick={handleClearSearch}
            >
              Clear
            </button>
          )}
        </div>
        {/* DataTable component */}
        <DataTable
          columns={columns}
          data={data}
          // selectableRows
          fixedHeader
          pagination
          highlightOnHover
          responsive
          striped
        />
      </div>

      <div className="CA"> Current Attendees</div>

      <div className="atendeecontainer" >

        <Attendee_page_card />
      
        
      </div>




    </div>
  );
};

export default Attendees;
