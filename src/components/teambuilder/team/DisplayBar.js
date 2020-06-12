import React, { useState } from "react";
import { NormalizedStatsChart } from "./NormalizedStatsChart";
import { TeamChartDisplay } from "./TeamChartDisplay";
import { Button } from "semantic-ui-react";

export const DisplayBar = ({ stat_ }) => {
  const [chartState, setChartState] = useState(false);

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "row",
      }}
    >
      {chartState ? (
        <NormalizedStatsChart stat={stat_}></NormalizedStatsChart>
      ) : (
        <TeamChartDisplay stat={stat_}></TeamChartDisplay>
      )}
      <div style={{ display: "flex", flexDirection: "column" }}>
        <Button
          onClick={() => setChartState(!chartState)}
          style={{ marginTop: "5%" }}
        >
          Normalized Stats{" "}
        </Button>
        <Button
          onClick={() => setChartState(!chartState)}
          style={{ marginTop: "5%" }}
        >
          Normalized Stats{" "}
        </Button>
      </div>
    </div>
  );
};
