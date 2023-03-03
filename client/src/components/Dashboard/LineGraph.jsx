import React from "react";
import { VictoryChart, VictoryLine, VictoryAxis, VictoryTheme } from "victory";

function LineGraph({ data }) {
  const maxValue = Math.max(...data.map((item) => item.earnings));

  return (
    <div className="dashboard-graph line-graph">
      <VictoryChart
        theme={VictoryTheme.material}
        domainPadding={20}
        width={60 * data.length}
        domain={{
          y: [0, maxValue],
        }}
      >
        <VictoryAxis
          tickValues={data.map((d) => d.quarter)}
          tickFormat={data.map((d) => `Q ${d.quarter}`)}
        />
        <VictoryAxis dependentAxis tickFormat={(x) => `$${x / 1000}k`} />
        <VictoryLine
          data={data}
          x="quarter"
          y="earnings"
          style={{
            data: {
              stroke: "rgb(28,78,128)",
              strokeWidth: 3,
            },
          }}
        />
      </VictoryChart>
    </div>
  );
}

export default LineGraph;
