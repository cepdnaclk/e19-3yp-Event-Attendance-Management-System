import React from "react";
import Sidebar from "../components/Sidebar";
import AnalyticsTop from "../components/AnalyticsTop";
import AnalyticsCharts from "../components/AnalyticsCharts";
import "../style.css";

const Analytics = () => {
  return (
    <div>
      <Sidebar />
      <div className="analytic-page">
        <p>
          <h3>Analytics</h3>
        </p>
        <AnalyticsTop />
        <AnalyticsCharts />
      </div>
    </div>
  );
};

export default Analytics;
