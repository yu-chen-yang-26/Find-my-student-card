import React, { useState, useEffect } from "react";
import { Avatar, List, Button, Col, Row, Typography } from "antd";
import VirtualList from "rc-virtual-list";
import Sidebar from "../../components/Sidebar/Sidebar";
import styled from "styled-components";
import { RiLockPasswordFill } from "react-icons/ri";
import { GrLanguage } from "react-icons/gr";
import { RiLogoutBoxRLine } from "react-icons/ri";
import { useTranslation } from "react-i18next";
import api from "../../api";
import { useNavigate } from "react-router-dom";
import PasswordModal from "../../components/Modal/Modal.js";
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
const fakeDataUrl =
  "https://randomuser.me/api/?results=10&inc=name,gender,email,nat,picture&noinfo";
const ContainerHeight = 240;

const Settings = () => {
  const { t, i18n } = useTranslation();
  const navigate = useNavigate();
  const [data, setData] = useState([]);
  const [name, setName] = useState("");
  const appendData = () => {
    fetch(fakeDataUrl)
      .then((res) => res.json())
      .then((body) => {
        setData(data.concat(body.results));
      });
  };
  useEffect(() => {
    const getName = async () => {
      await api
        .get("/profile", {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
            Accept: "application/json",
          },
        })
        .then((response) => {
          setName(response.data.name);
        })
        .catch((err) => console.log(err));
    };
    getName();
    appendData();
  }, []);
  const onScroll = (e) => {
    if (
      e.currentTarget.scrollHeight - e.currentTarget.scrollTop ===
      ContainerHeight
    ) {
      appendData();
    }
  };
  const changeLang = async () => {
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
    i18n.changeLanguage(newlang);
    await api
      .post(
        "/change/language",
        { language: newlang },
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
            Accept: "application/json",
          },
        }
      )
      .catch((err) => console.log(err));
  };
  const logout = async () => {
    const {
      data: { result },
    } = await api.post(
      "/logout",
      {},
      {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
          Accept: "application/json",
        },
      }
    );
    console.log(result);
    localStorage.setItem("token", null);
    navigate("/");
  };
  const listDomNode = (titel, data) => {
    return (
      <List style={{ width: "100%", marginBottom: "2vmin" }}>
        <h3>{t(titel)}</h3>
        <VirtualList
          data={data}
          height={ContainerHeight}
          itemKey="email"
          onScroll={onScroll}
        >
          {(item) => (
            <List.Item key={item.email}>
              <Col span={14}>
                <List.Item.Meta
                  className="list"
                  avatar={<Avatar src={item.picture.large} />}
                  title={
                    <a onClick={() => navigate("/detail/:id/:time")}>錢包</a>
                  }
                  description="可能掉在路燈旁邊的椅子上,或是在社科院的廁所裡面"
                />
              </Col>
              <Col span={4}>社科院</Col>
              <Col span={6}>2023-05-31 09:00:00</Col>
            </List.Item>
          )}
        </VirtualList>
      </List>
    );
  };
  const [isModalVisible, setIsModalVisible] = useState(false);
  const handleOpenModal = () => {
    setIsModalVisible(true);
  };
  const handleCloseModal = () => {
    setIsModalVisible(false);
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
            paddingLeft: "2vmin",
            paddingRight: "2vmin",
            paddingBottom: "2vmin",
            width: "100%",
            height: "100%",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            border: "1px solid #c8d4ff",
          }}
        >
          <Col
            span={15}
            style={{
              width: "100%",
              height: "100%",
              display: "flex",
              flexDirection: "column",
              justifyContent: "space-around",
              alignItems: "center",
            }}
          >
            {listDomNode("Your Item", data)}
            {listDomNode("Possible Item", data)}
          </Col>
          <Col
            span={8}
            style={{
              width: "100%",
              display: "flex",
              flexDirection: "column",
              justifyContent: "center",
              alignItems: "center",
              gap: "3vmin",
            }}
          >
            <Typography>
              {t("Hello")}, {name}
            </Typography>
            <ProfileDiv>
              <RiLockPasswordFill size={30} />
              <ProfileButton onClick={() => handleOpenModal()}>
                {t("Reset Password")}
              </ProfileButton>
            </ProfileDiv>
            <ProfileDiv>
              <GrLanguage size={30} />
              <ProfileButton onClick={() => changeLang()}>
                {t("Switch to English")}
              </ProfileButton>
            </ProfileDiv>
            <ProfileDiv>
              <RiLogoutBoxRLine size={30} />
              <ProfileButton onClick={() => logout()}>
                {t("Log out")}
              </ProfileButton>
            </ProfileDiv>
          </Col>
        </Row>
      </Col>
      <PasswordModal
        open={isModalVisible}
        onCancel={handleCloseModal}
        onConfirm={handleCloseModal}
      />
    </Row>
  );
};
export default Settings;
