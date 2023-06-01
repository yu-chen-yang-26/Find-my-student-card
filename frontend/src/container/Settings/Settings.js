import React, { useState } from "react";
import { Button, Col, Row, Typography } from "antd";
import Pic from "../../Pic/cat.jpg";
import Sidebar from "../../components/Sidebar";
import styled from "styled-components";
import { RiLockPasswordFill } from "react-icons/ri";
import { GrLanguage } from "react-icons/gr";
import { RiLogoutBoxRLine } from "react-icons/ri";
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
              <ProfileButton>Reset Password</ProfileButton>
            </ProfileDiv>
            <ProfileDiv>
              <GrLanguage size={30} />
              <ProfileButton>切換至中文</ProfileButton>
            </ProfileDiv>
            <ProfileDiv>
              <RiLogoutBoxRLine size={30} />

              <ProfileButton>Log out</ProfileButton>
            </ProfileDiv>
          </Col>
        </Row>
      </Col>
    </Row>
  );
};
export default Settings;
