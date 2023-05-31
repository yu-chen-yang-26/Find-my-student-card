import StepsBar from "../components/Step";
import { InfoForm } from "../components/Form";
import styled from "styled-components";
import UpMap from "../components/UpMap";
import Drag from "../components/Drag";
import React, { useState } from "react";
import { Col, Result, Row } from "antd";
import { useNavigate, useParams } from "react-router-dom";
import { useLoadScript } from "@react-google-maps/api";
import Sidebar from "../components/Sidebar";
const HomeBT = styled.button`
  position: absolute;
  bottom: 45%;

  width: 60px;
  height: 55px;
  border-radius: 50px;
  border: transparent;
  box-shadow: 6px 2px 5px 1px rgba(0, 0, 0, 0.2);
  background: palevioletred;
  &:hover {
    width: 70px;
    height: 70px;
    cursor: pointer;
    font-size: 1.2em;
  }
`;
const Wrapper = styled.div`
  width: 100%;
  border-radius: 3px;
  border: 2px solid #c8d4ff;
  height: 90%;
  min-height: 200px;
  display: flex;
  justify-content: center;
  align-items: center;
  @media (min-width: 570px) {
    top: 190px;
    border: 2px solid #c8d4ff;
    min-height: 300px;
    // background-color: white;
  }
`;
const Middle = styled.div`
  width: 700px;
  height: 300px;
  padding: 20px;
  background-color: #f8f8ff;
`;
const Upload = () => {
  const navigate = useNavigate();
  const { isLoaded } = useLoadScript({
    googleMapsApiKey: "AIzaSyAaZZfGnw5Aud0RxgRgc3-G-db_7z-tptk", // Add your API key//AIzaSyAaZZfGnw5Aud0RxgRgc3-G-db_7z-tptk
  });
  const [imageList, setImageList] = useState([]);
  const [api, setApi] = useState({ ID: "", time: "" });
  const [submit, setSubmit] = useState(false);
  const [newmarkers, setnewmarkers] = useState([]);
  const [location, setLocation] = useState({
    lat: 25.017622284161067,
    lng: 121.5378841549027,
  });

  const ToInfo = () => {
    setSubmit(false);
    navigate("/detail/" + api.ID + "/" + api.time);
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
          padding: "3vmin",
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
          <Col span={10}>
            <InfoForm></InfoForm>
          </Col>
          <Col span={14}>
            {isLoaded ? (
              <UpMap location={location} setLocation={setLocation} />
            ) : (
              <></>
            )}
          </Col>
        </Row>
      </Col>
    </Row>
  );
};
export default Upload;
