import React, { useState, useEffect } from "react";
import styled from "styled-components";
import { Form, Input, Button, Row, Col, Typography } from "antd";
import { useNavigate } from "react-router-dom";
import api from "../../api";
import "./Register.css";
import lostFound from "../../Pic/lost&found.png";
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
const Register = () => {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const [name, setName] = useState("");
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
      await api
        .post("/register", {
          name: name,
          id: id,
          email: email,
          password: password,
        })
        .then((response) => {
          console.log(response.data.result);
          navigate("/");
        })
        .catch((err) => console.log(err));
    }
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
              {t("Newly Arrived! Register Here")}
            </h1>
            <Form>
              <Form.Item>
                <Typography
                  className="fontContainer_2"
                  style={{ textAlign: "left" }}
                >
                  &thinsp;{t("Name")}
                </Typography>
                <Input value={name} onChange={(e) => setName(e.target.value)} />
              </Form.Item>
              <Form.Item className="fontContainer_2">
                <Typography style={{ textAlign: "left" }}>
                  &thinsp;{t("Student ID")}
                </Typography>
                <Input value={id} onChange={(e) => setId(e.target.value)} />
              </Form.Item>
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
                />
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
                />
              </Form.Item>
              <Form.Item className="fontContainer_2">
                <Typography style={{ textAlign: "left" }}>
                  &thinsp;{t("Check Password")}
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
                  <LoginButton
                    className="btn"
                    block
                    onClick={() => navigate("/")}
                  >
                    <Typography className="back_btn">←</Typography>
                  </LoginButton>
                  <LoginButton
                    className="fontContainer_2 btn"
                    block
                    onClick={() => register()}
                  >
                    <Typography>{t("Register")}</Typography>
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
