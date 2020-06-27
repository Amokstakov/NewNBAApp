import React from "react";
import { Row, Col } from "antd";
import PlayerCards from "../../assets/Images/player_cards.svg";

export const GetTechnicalPage = () => {
  return (
    <div>
      <Row justify="center">
        <Col>
          <div style={{ paddingTop: "5%", fontSize: "5rem" }}>
            GET TECHNICAL
          </div>
        </Col>
      </Row>
      <Row justify="center">
        <Col>
          <img
            src={PlayerCards}
            style={{
              height: "75vh",
              maxWidth: "100%",
              margin: "auto",
              display: "block",
            }}
          />
        </Col>
      </Row>
    </div>
  );
};
