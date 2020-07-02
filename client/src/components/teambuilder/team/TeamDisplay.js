import React from "react";
import { useSelector } from "react-redux";
import { mode, sum_mode } from "../variables";
import { TeamStatDropDown } from "./TeamStatDropDown";
import { RadarCharts } from "./RadarCharts";
import { TeamRadarChart } from "./TeamRadarChart";
import { testData } from "./helpers";
import { Row, Col } from "antd";
//css
import "../css/TeamDisplay.css";

export const TeamDisplay = () => {
  const { players } = useSelector((state) => {
    return {
      players: state.Team.teamPlayers,
    };
  });

  return (
    <div>
      <Row>
        <Col xs={16}>
          <div style={{ width: "100" }}>
            <TeamStatDropDown />
          </div>
        </Col>
      </Row>
      {/* <div
        style={{
          width: "100%",
          display: "flex",
          flexDirection: "row",
        }}
      >
        <Row>
          <Col xs={16}>
            <div style={{ width: "100%" }}>
              <TeamStatDropDown />
            </div>
            <TeamRadarChart />
          </Col>
        </Row>
      </div>

      <div style={{ paddingTop: "5%" }}>
        {players.map((player) => {
          const {
            first_name,
            last_name,
            position,
            id,
            team: { abbreviation },
          } = player[1];

          const stats = testData(player, sum_mode, id);

          //Cant put function call here :(

          return (
            <div>
              <div
                style={{
                  display: "flex",
                  flexDirection: "row",
                }}
              >
                <h2>
                  {first_name} {last_name}
                </h2>

                <h5>
                  Position: {position} | Team: {abbreviation}
                </h5>
                <RadarCharts
                  style={{ marginLeft: "auto" }}
                  id={id}
                  stats={stats}
                  color={player[2]}
                ></RadarCharts>
              </div>

              <table className="TeamDisplayTable">
                <thead>
                  <tr>
                    {Object.keys(mode).map((key) => {
                      if (key in player[0]) {
                        return (
                          <th style={{ textAlign: "center" }}>{mode[key]}</th>
                        );
                      }
                    })}
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    {Object.keys(mode).map((key) => {
                      if (key in player[0]) {
                        return (
                          <td style={{ textAlign: "center" }}>
                            {player[0][key]}
                          </td>
                        );
                      }
                    })}
                  </tr>
                </tbody>
              </table>
            </div>
          );
        })}
      </div> */}
    </div>
  );
};
