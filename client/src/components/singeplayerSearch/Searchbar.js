import React, { useState } from "react";

import { useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import {
  FetchPlayer,
  removeStatesSingle,
} from "../../actions/SingleSearchActions";
import { setError } from "../../actions/ErrorActions";

import PlayerStats from "./PlayerStats";

//AntD

import { Row, Col, Form, Button, Input } from "antd";

const Searchbar = () => {
  const [formData, setFormData] = useState({
    Player: "",
    Flag: false,
  });

  const { Flag } = formData;

  const dispatch = useDispatch();

  return (
    <div style={{ minHeight: "100%", paddingTop: "20px" }}>
      <Row type="flex" justify="center">
        <Col span={12}>
          <Form
            style={{ maxWidth: "600px" }}
            name="normal_login"
            className="login-form"
            initialValues={{
              remember: true,
            }}
            onFinish={() => {
              setFormData({ ...formData, Flag: true });
              const { Player } = formData;

              if (Player.length > 1) {
                dispatch(FetchPlayer(Player));
              } else {
                dispatch(setError("Please type a player name to get stats")); //Have its own section
                dispatch(removeStatesSingle());
              }
            }}
          >
            <Form.Item
              name="Player"
              rules={[
                {
                  required: true,
                  message: "Please input a players name!",
                },
              ]}
            >
              <Input
                placeholder="Type a Players Name"
                id="Player"
                onChange={(e) => {
                  setFormData({ ...formData, [e.target.id]: e.target.value });
                }}
              />
            </Form.Item>

            <Form.Item>
              <Button htmlType="submit" style={{ width: "50%" }}>
                Submit
              </Button>
              <Link to="/">
                <Button onClick={() => dispatch(removeStatesSingle())}>
                  Home
                </Button>
              </Link>
            </Form.Item>
          </Form>
        </Col>
      </Row>
      <Row>
        <Col span={16} offset={4}>
          <div style={{ width: "100%" }}>{Flag ? <PlayerStats /> : null}</div>
        </Col>
      </Row>
    </div>
  );
};

export default Searchbar;
