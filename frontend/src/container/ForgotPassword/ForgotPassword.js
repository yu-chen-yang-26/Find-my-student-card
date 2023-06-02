import React, { useState, useEffect } from "react";
import styled from "styled-components";
import { Form, Input, Button, Row, Col, Typography } from "antd";
import { useNavigate } from "react-router-dom";
import lostFound from "../../Pic/lost&found.png";
import { useTranslation } from "react-i18next";
import sendemail from "../../components/Mail/Mail";
import api from "../../api";
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
const ForgotPassword = () => {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const getRandomInt = (min, max) => {
    return min + Math.floor(Math.random() * max);
  };
  const sendMail = async () => {
    const checkPassword = getRandomInt(1000, 8999);
    await api
      .get("/send", { params: { email: email, password: checkPassword } })
      .then((response) => {
        if (response.data.result) {
          console.log("success");
          sendemail(email, checkPassword);
          navigate("/");
        } else {
          console.log("not found");
        }
      })
      .catch((err) => console.log(err));
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
              {t("Oops")}&thinsp;{t("‼️")} {t("Forgot Password")}
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
                    className="fontContainer_2 btn"
                    block
                    onClick={() => navigate("/")}
                  >
                    <Typography>{t("Cancel")}</Typography>
                  </LoginButton>
                  <LoginButton
                    className="fontContainer_2 btn"
                    block
                    onClick={() => sendMail()}
                  >
                    <Typography>{t("Send")}</Typography>
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

export default ForgotPassword;
