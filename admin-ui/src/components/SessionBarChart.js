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

export default class SessionBarChart extends PureComponent {
  render() {
    const { data } = this.props;
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
          <XAxis
            dataKey="conferenceName"
            tick={{ fontSize: 12, fontWeight: "bold" }}
          />
          <YAxis tick={{ fontSize: 12, fontWeight: "bold" }} />
          <Tooltip cursor={false} />
          {/* <Legend /> */}
          <Bar dataKey="percentage" stackId="a" fill="#5E17EB" barSize={25} />
          {/* <Bar dataKey="pv" stackId="a" fill="#8D5EEB" barSize={25} /> */}
        </BarChart>
      </ResponsiveContainer>
    );
  }
}
