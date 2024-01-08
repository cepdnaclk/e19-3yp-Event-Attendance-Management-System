import React from "react";
import { useState } from "react";
import DataTable from "react-data-table-component";
import "./App.css";

const Settings = () => {
  // Define columns for the DataTable
  const columns = [
    {
      name: "Attendee",
      selector: (row) => row.name,
      // sortable: true, // Uncomment this line if you want the 'Attendee' column to be sortable
    },
    {
      name: "Time in",
      selector: (row) => row.timeIn,
    },
    {
      name: "Attendence Duration",
      selector: (row) => row.timeDuration,
    },
    {
      name: "Next Event",
      selector: (row) => row.nextEvent,
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

  // Function to handle changes in the search input
  const handleSearchChange = (e) => {
    const value = e.target.value;
    setSearchValue(value);

    // Filter data based on the search value
    const filteredData = initialData.filter((row) =>
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
    setData(initialData);
  };

  return (
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
  );
};

export default Settings;