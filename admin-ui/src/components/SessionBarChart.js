import React, { PureComponent } from "react";
import {
  BarChart,
  Bar,
  Cell,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";

const data = [
  { name: "Room1", Percentage: 54 },
  { name: "Room2", Percentage: 45 },
  { name: "Room3", Percentage: 67 },
  { name: "Room4", Percentage: 34 },
  { name: "Room5", Percentage: 56 },
];

export default class SessionBarChart extends PureComponent {
  render() {
    return (
      <ResponsiveContainer width="100%" height="75%">
        <BarChart
          width={500}
          height={300}
          data={data}
          margin={{
            top: 30,
            right: 20,
            left: 0,
            bottom: 5,
          }}
        >
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="name" tick={{ fontSize: 12, fontWeight: "bold" }} />
          <YAxis tick={{ fontSize: 12, fontWeight: "bold" }} />
          <Tooltip cursor={false} />
          {/* <Legend /> */}
          <Bar dataKey="Percentage" stackId="a" fill="#5E17EB" barSize={25} />
          {/* <Bar dataKey="pv" stackId="a" fill="#8D5EEB" barSize={25} /> */}
        </BarChart>
      </ResponsiveContainer>
    );
  }
}
