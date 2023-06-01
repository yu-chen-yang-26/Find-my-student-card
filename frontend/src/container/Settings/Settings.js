import React, { useState } from "react";
import { Button, Col, Row, Typography } from "antd";
import Pic from "../../Pic/cat.jpg";
import Sidebar from "../../components/Sidebar";
import styled from "styled-components";
import { RiLockPasswordFill } from "react-icons/ri";
import { GrLanguage } from "react-icons/gr";
import { RiLogoutBoxRLine } from "react-icons/ri";
import { useTranslation } from "react-i18next";

const ProfileDiv = styled(Row)(() => ({
  width: "60%",
  display: "flex",
  flexDirection: "row",
  justifyContent: "space-evenly",
  alignItems: "center",
  textAlign: "center",
}));
const ProfileButton = styled(Button)(() => ({
  width: "60%",
  backgroundColor: "#c8d4ff",
}));
const Settings = () => {
  const { t, i18n } = useTranslation();
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
  return (
    <Row>
      <Col span={2}>
        <Sidebar />
      </Col>
      <Col
        span={22}
        style={{
          display: "flex",
          flexDirection: "row",
          alignItems: "center",
          padding: "4vmin",
        }}
      >
        <Row
          style={{
            width: "100%",
            height: "100%",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            border: "1px solid #c8d4ff",
          }}
        >
          <Col
            span={12}
            style={{
              width: "100%",
              maxWidth: "350px",
              aspectRatio: "1",
              borderRadius: "50%",
              overflow: "hidden",
              border: "1px solid black",
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <img src={Pic} style={{ minWidth: "350px" }} alt="" />
          </Col>
          <Col
            span={12}
            style={{
              width: "100%",
              display: "flex",
              flexDirection: "column",
              justifyContent: "center",
              alignItems: "center",
              gap: "3vmin",
            }}
          >
            <Typography> testname</Typography>
            <ProfileDiv>
              <RiLockPasswordFill size={30} />
              <ProfileButton>{t("Reset Password")}</ProfileButton>
            </ProfileDiv>
            <ProfileDiv onClick={() => changeLang()}>
              <GrLanguage size={30} />
              <ProfileButton>{t("Switch to English")}</ProfileButton>
            </ProfileDiv>
            <ProfileDiv>
              <RiLogoutBoxRLine size={30} />

              <ProfileButton>{t("Log out")}</ProfileButton>
            </ProfileDiv>
          </Col>
        </Row>
      </Col>
    </Row>
  );
};
export default Settings;
