import BarGraph from "./BarGraph";
import React from "react";
import PieGraph from "./PieGraph";
import Widgets from "./Widgets";
import LineGraph from "./LineGraph";
import "../../styles/Dashboard/Dashboard.css";

function Dashboard() {
  const data = [
    { quarter: 1, earnings: 13000 },
    { quarter: 2, earnings: 16500 },
    { quarter: 3, earnings: 14250 },
    { quarter: 4, earnings: 19000 },
    { quarter: 5, earnings: 9000 },
    { quarter: 6, earnings: 22000 },
    { quarter: 7, earnings: 11040 },
    { quarter: 8, earnings: 10040 },
  ];

  const metricsData = [
    { title: "Sales", value: 1224, percentageChange: 10 },
    { title: "Expenses", value: 560, percentageChange: -5 },
    { title: "Profit", value: 810, percentageChange: 20 },
    { title: "Revenue", value: 1202, percentageChange: -5 },
  ];

  return (
    <div className="dashboard-container">
      <Widgets metricsData={metricsData} />
      <BarGraph data={data} />
      <PieGraph data={data} />
      <LineGraph data={data} />
    </div>
  );
}

export default Dashboard;
