import React, { useState, useEffect } from "react";
import styled from "styled-components";
import { Form, Input, Button, Row, Col, Divider, Typography } from "antd";
import { useNavigate } from "react-router-dom";
import googleIcon from "../../Pic/google-logo.png";
import lostFound from "../../Pic/lost&found.png";
import { useGoogleLogin } from "@react-oauth/google";
import axios from "axios";
import "./Login.css";
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
const Login = () => {
  const navigate = useNavigate();
  const [profile, setProfile] = useState([]);
  const [user, setUser] = useState([]);
  const login = useGoogleLogin({
    onSuccess: (codeResponse) => setUser(codeResponse),
    onError: (error) => console.log("Login Failed:", error),
  });
  useEffect(() => {
    if (user.length !== 0) {
      axios
        .get(
          `https://www.googleapis.com/oauth2/v1/userinfo?access_token=${user.access_token}`,
          {
            headers: {
              Authorization: `Bearer ${user.access_token}`,
              Accept: "application/json",
            },
          }
        )
        .then(async (res) => {
          console.log(res.data);
          setProfile(res.data);
          navigate("/home");
        })
        .catch((err) => console.log(err));
    }
  }, [setProfile, user, navigate]);
  return (
    <Container>
      <Logo className="left" span={12}>
        <hr style={{ borderTop: "3px solid white", width: "95%" }} />
        <Typography className="fontContainer_2 logo">
          <img src={lostFound} alt="" width={500} />
        </Typography>

        <div>
          <hr
            style={{
              borderTop: "3px solid white",
              width: "58%",
              position: "relative",
              top: "15px",
              left: "10px",
              margin: "0 10px",
            }}
          />
          <Typography
            className="fontContainer_2 subtitle"
            style={{ display: "flex", fontSize: "20px", fontWeight: "bolder" }}
          >
            by &thinsp; NTU&thinsp; Lost & Found &thinsp;Group
          </Typography>
        </div>
      </Logo>
      <Col span={12}>
        <Row justify="center" align="middle" style={{ height: "100vh" }}>
          <Col span={14}>
            <h1 className="fontContainer_2">👋&thinsp;Hello, Login Here... </h1>
            <Form>
              <Form.Item>
                <Typography
                  className="fontContainer_2"
                  style={{ textAlign: "left" }}
                >
                  &thinsp;Email
                </Typography>
                <Input />
              </Form.Item>
              <Form.Item>
                <Typography
                  className="fontContainer_2"
                  style={{ textAlign: "left" }}
                >
                  &thinsp;Password
                </Typography>
                <Input.Password />
              </Form.Item>
              <Form.Item>
                <LoginButton className="btn" htmlType="submit" block>
                  <Typography className="fontContainer_2">Login</Typography>
                </LoginButton>
              </Form.Item>
            </Form>
            <Row justify="space-between">
              <Col>
                <a className="fontContainer_2" href="/register">
                  Register
                </a>
              </Col>
              <Col>
                <a className="fontContainer_2" href="/forgot">
                  Forget password?
                </a>
              </Col>
            </Row>
            <Divider />
            <Row
              style={{ display: "flex", flexDirection: "column", gap: "2vmin" }}
            >
              <Row justify="center">
                <Col span={24}>
                  <LoginButton className="btn" block onClick={() => login()}>
                    <img src={googleIcon} alt="" width={20} />
                    <Typography className="fontContainer_2">
                      Sign in with Google
                    </Typography>
                  </LoginButton>
                </Col>
              </Row>
              <Row justify="center">
                <Col span={24}>
                  <LoginButton
                    block
                    onClick={() => navigate("/home")}
                    className="btn"
                  >
                    <Typography className="fontContainer_2">
                      Guest Login
                    </Typography>
                  </LoginButton>
                </Col>
              </Row>
            </Row>
          </Col>
        </Row>
      </Col>
    </Container>
  );
};

export default Login;
