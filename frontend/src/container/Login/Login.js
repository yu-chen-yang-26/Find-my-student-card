import React, { useState, useEffect } from "react";
import styled from "styled-components";
import { Form, Input, Button, Row, Col, Divider, Typography } from "antd";
import { useNavigate } from "react-router-dom";
import googleIcon from "../../Pic/google-logo.png";
import lostFound from "../../Pic/lost&found.png";
import { useGoogleLogin } from "@react-oauth/google";
import { GrLanguage } from "react-icons/gr";
import axios from "axios";
import api from "../../api";
import "./Login.css";
import { useTranslation } from "react-i18next";
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
  const { t, i18n } = useTranslation();
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [profile, setProfile] = useState([]);
  const [user, setUser] = useState([]);
  const googleLogin = useGoogleLogin({
    onSuccess: (codeResponse) => setUser(codeResponse),
    onError: (error) => console.log("Login Failed:", error),
  });
  const changeLang = () => {
    const newlang = (() => {
      switch (i18n.language) {
        case "zh":
          return "en";
        case "en":
          return "zh";
        default:
          return "";
      }
    })();
    localStorage.setItem("lang", newlang);
    i18n.changeLanguage(newlang);
  };
  const guestLogin = async () => {
    await api
      .post("/guest")
      .then((response) => {
        localStorage.setItem("token", response.data.token);
        navigate("/home");
      })
      .catch((error) => console.log(error));
  };
  const userLogin = async () => {
    await api
      .post("/login", {
        email: email,
        password: password,
      })
      .then((response) => {
        localStorage.setItem("token", response.data.token);
        navigate("/home");
      })
      .catch((error) => console.log(error));
  };
  useEffect(() => {
    const checkLogined = async () => {
      if (localStorage.getItem("token") !== null) {
        await api
          .post(
            "/logined",
            {},
            {
              headers: {
                Authorization: `Bearer ${localStorage.getItem("token")}`,
                Accept: "application/json",
              },
            }
          )
          .then((response) => {
            if (response.data.logined) {
              navigate("/home");
            }
          })
          .catch((error) => console.log(error));
      }
    };
    checkLogined();
  }, [navigate]);
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
          setProfile(res.data);
          await api
            .post("/google", {
              name: res.data.email,
            })
            .then((response) => {
              localStorage.setItem("token", response.data.token);
              navigate("/home");
            })
            .catch((error) => console.log(error));
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
            <h1 className="fontContainer_2">
              👋&thinsp;{t("Hello, Login Here...")}
            </h1>
            <Form>
              <Form.Item>
                <Typography
                  className="fontContainer_2"
                  style={{ textAlign: "left" }}
                >
                  &thinsp;{t("Email")}
                </Typography>
                <Input
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />{" "}
              </Form.Item>
              <Form.Item>
                <Typography
                  className="fontContainer_2"
                  style={{ textAlign: "left" }}
                >
                  &thinsp;{t("Password")}
                </Typography>
                <Input.Password
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />{" "}
              </Form.Item>
              <Form.Item>
                <LoginButton
                  className="btn"
                  htmlType="submit"
                  block
                  onClick={() => userLogin()}
                >
                  {" "}
                  <Typography className="fontContainer_2">
                    {t("Login")}
                  </Typography>
                </LoginButton>
              </Form.Item>
            </Form>
            <Row justify="space-between">
              <Col>
                <a className="fontContainer_2" href="/register">
                  {t("Register")}
                </a>
              </Col>
              <Col>
                <a className="fontContainer_2" href="/forgot">
                  {t("Forget password?")}
                </a>
              </Col>
            </Row>
            <Divider />
            <Row
              style={{ display: "flex", flexDirection: "column", gap: "2vmin" }}
            >
              <Row justify="center">
                <Col span={24}>
                  <LoginButton
                    className="btn"
                    block
                    onClick={() => googleLogin()}
                  >
                    {" "}
                    <img src={googleIcon} alt="" width={20} />
                    <Typography className="fontContainer_2">
                      {t("Sign in with Google")}
                    </Typography>
                  </LoginButton>
                </Col>
              </Row>
              <Row justify="center">
                <Col span={24}>
                  <LoginButton
                    block
                    onClick={() => guestLogin()}
                    className="btn"
                  >
                    <Typography className="fontContainer_2">
                      {t("Guest Login")}
                    </Typography>
                  </LoginButton>
                </Col>
              </Row>
            </Row>
          </Col>
        </Row>
      </Col>
      <LoginButton
        onClick={() => changeLang("")}
        className="btn"
        style={{ position: "absolute", top: "10px", right: "10px" }}
      >
        <GrLanguage size={20} />
      </LoginButton>
    </Container>
  );
};

export default Login;
