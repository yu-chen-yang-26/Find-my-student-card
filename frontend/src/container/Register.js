import React, { useState, useEffect } from "react";
import styled from "styled-components";
import { Form, Input, Button, Row, Col, Typography } from "antd";
import { useNavigate } from "react-router-dom";

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
                <Typography style={{ textAlign: "left" }}>Email</Typography>
                <Input />
              </Form.Item>
              <Form.Item>
                <Typography style={{ textAlign: "left" }}>Password</Typography>
                <Input.Password />
              </Form.Item>
              <Form.Item>
                <Typography style={{ textAlign: "left" }}>
                  Check Password
                </Typography>
                <Input.Password />
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
                  <LoginButton block onClick={() => navigate("/")}>
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
