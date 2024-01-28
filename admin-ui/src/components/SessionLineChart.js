import React, { PureComponent } from "react";
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

const data = [
  { hour: "1h", value: 5 },
  { hour: "2h", value: 10 },
  { hour: "3h", value: 15 },
  { hour: "4h", value: 20 },
  { hour: "5h", value: 25 },
  { hour: "6h", value: 30 },
  { hour: "7h", value: 35 },
  { hour: "8h", value: 40 },
  { hour: "9h", value: 45 },
  { hour: "10h", value: 50 },
  { hour: "11h", value: 55 },
  { hour: "12h", value: 60 },
];

export default class SessionLineChart extends PureComponent {
  render() {
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
          <Line
            type="monotone"
            dataKey="value"
            stroke="#5E17EB"
            activeDot={{ r: 8 }}
          />
          {/* <Line type="monotone" dataKey="value" stroke="#82ca9d" /> */}
        </LineChart>
      </ResponsiveContainer>
    );
  }
}
