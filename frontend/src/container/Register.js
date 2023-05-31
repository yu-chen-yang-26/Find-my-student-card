import React, { useState } from "react";
import styled from "styled-components";
import { Form, Input, Button, Row, Col, Typography } from "antd";
import { useNavigate } from "react-router-dom";
import axios from "../api";
const Container = styled(Row)(() => ({
  width: "100vw",
  height: "100vh",
  textAlign: "center",
}));
const Logo = styled(Col)(() => ({
  padding: "10vmin",
  height: "100vh",
  backgroundColor: "#c8d4ff",
  display: "flex",
  flexDirection: "column",
  justifyContent: "center",
  textAlign: "left",
  alignItems: "flex-start",
  fontSize: "36px",
}));
const LoginButton = styled(Button)(() => ({
  backgroundColor: "#c8d4ff",
  display: "flex",
  flexDirection: "row",
  justifyContent: "center",
  alignItems: "center",
  gap: "1vmin",
}));
const Register = () => {
  const navigate = useNavigate();
  const [id, setId] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [checkPassword, setCheckPassword] = useState("");

  const register = async () => {
    if (!/^[a-zA-z][0-9]{8}/.test(id)) {
      console.log("invalid student id");
    } else if (
      !/^[a-zA-Z0-9.!#$%&’*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/.test(
        email
      )
    ) {
      console.log("invalid email");
    } else if (password !== checkPassword) {
      console.log("wrong checkpassword");
    } else {
      const {
        data: { result },
      } = await axios.post("/register", {
        id,
        email,
        password,
      });
      console.log(result);
    }
  };
  return (
    <Container>
      <Logo span={12}>
        <Typography style={{ fontSize: "108px", fontWeight: "bolder" }}>
          NTU
        </Typography>
        <Typography style={{ fontSize: "72px", fontWeight: "bolder" }}>
          Lost and Found
        </Typography>
      </Logo>
      <Col span={12}>
        <Row justify="center" align="middle" style={{ height: "100vh" }}>
          <Col span={14}>
            <h1>Register</h1>
            <Form>
              <Form.Item>
                <Typography style={{ textAlign: "left" }}>
                  Student ID
                </Typography>
                <Input value={id} onChange={(e) => setId(e.target.value)} />
              </Form.Item>
              <Form.Item>
                <Typography style={{ textAlign: "left" }}>Email</Typography>
                <Input
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
              </Form.Item>
              <Form.Item>
                <Typography style={{ textAlign: "left" }}>Password</Typography>
                <Input.Password
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
              </Form.Item>
              <Form.Item>
                <Typography style={{ textAlign: "left" }}>
                  Check Password
                </Typography>
                <Input.Password
                  value={checkPassword}
                  onChange={(e) => setCheckPassword(e.target.value)}
                />
              </Form.Item>
              <Form.Item>
                <div
                  style={{
                    width: "100%",
                    display: "flex",
                    flexDirection: "row",
                    justifyContent: "space-around",
                    gap: "1vmin",
                  }}
                >
                  <LoginButton block onClick={() => navigate("/")}>
                    <Typography>Cancel</Typography>
                  </LoginButton>
                  <LoginButton block onClick={() => register()}>
                    <Typography>Register</Typography>
                  </LoginButton>
                </div>
              </Form.Item>
            </Form>
          </Col>
        </Row>
      </Col>
    </Container>
  );
};

export default Register;
