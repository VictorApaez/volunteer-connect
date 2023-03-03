import React from "react";
import { VictoryBar, VictoryChart, VictoryAxis, VictoryTheme } from "victory";

function BarGraph({ data }) {
  const maxValue = Math.max(...data.map((item) => item.earnings));

  return (
    <div className="dashboard-graph bar-graph">
      <VictoryChart
        theme={VictoryTheme.material}
        domainPadding={20}
        width={60 * data.length}
        domain={{
          y: [0, maxValue],
        }}
      >
        {/* define where and how the x and y axis should be displayed */}
        <VictoryAxis tickFormat={data.map((y) => `Q ${y.quarter}`)} />
        <VictoryAxis dependentAxis tickFormat={(x) => `$${x / 1000}k`} />

        <VictoryBar
          data={data}
          x="quarter"
          y="earnings"
          style={{
            data: {
              fill: ({ datum }) =>
                datum.earnings > 15000 ? "rgb(28,78,128)" : "rgb(51,156,217)",
              stroke: "black",
              strokeWidth: 1,
              opacity: 0.7,
            },
          }}
        />
      </VictoryChart>
    </div>
  );
}

export default BarGraph;
