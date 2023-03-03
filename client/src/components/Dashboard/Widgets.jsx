import React from "react";
import "../../styles/Dashboard/Widgets.css";

function Widgets({ metricsData }) {
  return (
    <div className="widgets">
      {metricsData.map((metric) => (
        <div className="widget" key={metric.title}>
          <h3 className="widget-title">{metric.title}</h3>
          <div className="widget-data">
            <span className="widget-value">{metric.value}</span>
            <span
              className={`widget-percentage ${
                metric.percentageChange > 0 ? "positive" : "negative"
              }`}
            >
              {`${metric.percentageChange}%`}
            </span>
          </div>
        </div>
      ))}
    </div>
  );
}

export default Widgets;
