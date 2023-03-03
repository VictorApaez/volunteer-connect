import React from "react";
import { VictoryPie, VictoryTheme } from "victory";

function PieGraph({ data }) {
  return (
    <div className="dashboard-graph pie-graph">
      <VictoryPie
        theme={VictoryTheme.material}
        data={data}
        x="quarter"
        y="earnings"
        // labelRadius={100}
        labels={({ datum }) => `Q ${datum.quarter}`}
        style={{
          labels: {
            fontSize: 10,
            fontWeight: "bold",
          },
          data: {
            fill: ({ datum }) =>
              datum.earnings > 15000 ? "rgb(28,78,128)" : "rgb(51,156,217)",
            opacity: 0.7,
          },
        }}
      />
    </div>
  );
}

export default PieGraph;
