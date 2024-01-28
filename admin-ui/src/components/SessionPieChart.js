import React, { PureComponent } from "react";
import {
  PieChart,
  Pie,
  Legend,
  Tooltip,
  ResponsiveContainer,
  Cell,
} from "recharts";

const COLORS = ["#5E17EB", "#AC8DEB"];

export default class SessionPieChart extends PureComponent {
  render() {
    const { data } = this.props;
    return (
      <ResponsiveContainer width="100%" height="100%">
        <PieChart width={1500} height={1500} margin={{ top: -80 }}>
          <Pie
            data={data}
            innerRadius={60}
            outerRadius={80}
            fill="#8884d8"
            paddingAngle={2}
            dataKey="value"
          >
            {data.map((entry, index) => (
              <Cell
                key={`cell-${index}`}
                fill={COLORS[index % COLORS.length]}
              />
            ))}
          </Pie>
          <Tooltip />
          <legend />
        </PieChart>
      </ResponsiveContainer>
    );
  }
}
