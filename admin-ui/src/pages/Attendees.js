import React, { useEffect } from "react";
import { useState } from "react";
import DataTable from "react-data-table-component";
import "./App.css";
import axios from "axios";
import Sidebar from "../components/Sidebar";
import AttendeePageCard from "../components/Attendee_page_card";

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
  const [data, setData] = useState([]);
  const [searchValue, setSearchValue] = useState("");
  const [conferenceIds, setConferenceIds] = useState([]);
  // const [users, setUsers] = useState([]);

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

  useEffect(() => {
    const fetchConferenceIds = async () => {
      try {
        const response = await axios.get('http://localhost:5001/api/currentattendee/conferenceIds');
        setConferenceIds(response.data.conferenceIds);
      } catch (error) {
        console.error('Error fetching conferenceIds:', error);
      }
    };

    fetchConferenceIds();
  }, []);

  const fetchAttendeeDetails = async (conferenceId) => {
    try {
      const response = await axios.get(`http://localhost:5001/api/attendees/attendeesOfConf/${conferenceId}`);
      return response.data.attendeeDetails;
    } catch (error) {
      console.error(`Error fetching attendee details for conferenceId ${conferenceId}:`, error);
      return [];
    }
  };

  useEffect(() => {
    const fetchAllAttendeeDetails = async () => {
      const allAttendeeDetails = [];

      for (const conferenceId of conferenceIds) {
        const attendeeDetails = await fetchAttendeeDetails(conferenceId);
        // allAttendeeDetails.push({ conferenceId, attendeeDetails });
        // allAttendeeDetails.push({ conferenceId, attendeeDetails: attendeeDetails });
        allAttendeeDetails.push({ conferenceId, attendeeDetails });

      }
      // setData(allAttendeeDetails);
      setData((prevData) => [...prevData, ...allAttendeeDetails]);
    };

    fetchAllAttendeeDetails();
  }, [conferenceIds]);

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
        {/* <Attendee_page_card /> */}
        {data.map((conference) => (
        <div key={conference.conferenceId}>
          <div className='CA'>Current Attendees - Conference ID: {conference.conferenceId}</div>

          {conference.attendeeDetails?.map((attendee) => (
            <AttendeePageCard
              key={attendee.rfidNo}
              roomName={conference.conferenceId} 
              sessionName={''} 
              attendeeName={attendee.name}
              inTime={''} 
              rfidNo={attendee.rfidNo}
            />
          ))}
        </div>
      ))}
    
      </div>




    </div>
  );
};

export default Attendees;
