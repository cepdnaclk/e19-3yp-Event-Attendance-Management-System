// this is Attendees page

import React, { useEffect } from "react";
import { useState } from "react";
import DataTable from "react-data-table-component";
import "./App.css";
import axios from "axios";
import Sidebar from "../components/Sidebar";

const Settings = () => {
  // Define columns for the DataTable
  const columns = [
    {
      name: "Attendee",
      selector: (row) => row.name,
      // sortable: true, // Uncomment this line if you want the 'Attendee' column to be sortable
    },
    {
      name: "email",
      selector: (row) => row.email,
    },
    {
      name: "conferenceNo",
      selector: (row) => row.conNo,
    },
    {
      name: "rfid No",
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
    <>
      <Sidebar />
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
    </>
  );
};

export default Settings;
