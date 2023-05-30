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
  const { currentStep } = useParams();
  const [imageList, setImageList] = useState([]);
  const [api, setApi] = useState({ ID: "", time: "" });
  const [submit, setSubmit] = useState(false);
  const [location, setLocation] = useState({
    lat: 25.017622284161067,
    lng: 121.5378841549027,
  });

  const ToInfo = () => {
    setSubmit(false);
    navigate("/detail/" + api.ID + "/" + api.time);
  };
  const NextPage = () => {
    const nextStep = parseInt(currentStep) + 1;
    if (currentStep === "2") {
      setSubmit(true);
    } else {
      setSubmit(false);
      navigate("/upload/" + nextStep, {
        state: {
          imageList: imageList,
          location: location,
        },
      });
    }
  };
  const LastPage = () => {
    const lastStep = parseInt(currentStep) - 1;
    navigate("/upload/" + lastStep);
  };
  const { isLoaded } = useLoadScript({
    googleMapsApiKey: "AIzaSyAaZZfGnw5Aud0RxgRgc3-G-db_7z-tptk", // Add your API key//AIzaSyAaZZfGnw5Aud0RxgRgc3-G-db_7z-tptk
  });
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
        <Row style={{ width: "100%", height: "100%" }}>
          <Col
            span={6}
            style={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <StepsBar currentStep={parseInt(currentStep)}></StepsBar>
          </Col>
          <Col
            span={18}
            style={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <Wrapper>
              {currentStep === "0" ? (
                <Drag imageList={imageList} setImageList={setImageList} />
              ) : currentStep === "1" && isLoaded == true ? (
                <UpMap location={location} setLocation={setLocation} />
              ) : currentStep === "2" ? (
                <Middle>
                  <InfoForm
                    setImageList={setImageList}
                    setLocation={setLocation}
                    setApi={setApi}
                    submit={submit}
                  />
                </Middle>
              ) : currentStep === "3" ? (
                <Result status="success" title="Successfully upload!" />
              ) : (
                ""
              )}
              {currentStep !== "0" && currentStep !== "3" ? (
                <HomeBT
                  style={{ color: "grey", left: "6%", backgroundColor: "pink" }}
                  onClick={LastPage}
                >
                  Last page
                </HomeBT>
              ) : (
                ""
              )}
              {/* {currentStep ? (
                <HomeBT
                  style={{ right: "6%", backgroundColor: "#FFD700" }}
                  onClick={currentStep !== "3" ? NextPage : ToInfo}
                >
                  {currentStep === "2"
                    ? "Submit"
                    : currentStep === "3"
                    ? "Info"
                    : "Next page"}
                </HomeBT>
              ) : (
                ""
              )} */}
            </Wrapper>
          </Col>
        </Row>
      </Col>
    </Row>
  );
};
export default Upload;
