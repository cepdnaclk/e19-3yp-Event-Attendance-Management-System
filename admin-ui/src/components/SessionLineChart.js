import React, { PureComponent, useEffect, useState } from "react";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";
import axios from "axios";

const SessionLineChart = () => {
  const [data, setData] = useState([]);

  useEffect(() => {
    const fetchHourlyAttenData = async () => {
      try {
        const response = await axios.get("http://localhost:5001/api/hourlyAttendee/getArrayData/65993c23a87fe5df449913c2");
        setData(response.data.data);
      } catch (error) {
        console.error("Error fetching hourly attendance data:", error);
      }
    };

    fetchHourlyAttenData();
  }, []);

  return (
    <ResponsiveContainer width="100%" height="75%">
      <LineChart
        width={500}
        height={300}
        data={data}
        margin={{
          top: 30,
          right: 20,
          left: -20,
          bottom: 5,
        }}
      >
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="hour" tick={{ fontSize: 12, fontWeight: "bold" }} />
        <YAxis tick={{ fontSize: 12, fontWeight: "bold" }} />
        <Tooltip />
        <Line type="monotone" dataKey="value" stroke="#5E17EB" activeDot={{ r: 8 }} />
      </LineChart>
    </ResponsiveContainer>
  );
};

export default SessionLineChart;
