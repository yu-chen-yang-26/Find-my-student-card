import { FormFound } from "../../components/Form/FormFound.js";
import { FormLost } from "../../components/Form/FormLost.js";
import UpMap from "../../components/UpMap/UpMap";
import React from "react";
import { Col, Row } from "antd";
import { useLoadScript } from "@react-google-maps/api";
import Sidebar from "../../components/Sidebar/Sidebar";
import { useLocation } from "react-router-dom";
const Upload = () => {
  const { isLoaded } = useLoadScript({
    googleMapsApiKey: "AIzaSyADQAXjWxd3AAgP7VQOBlMgMNugpN-Euas", // Add your API key//AIzaSyAaZZfGnw5Aud0RxgRgc3-G-db_7z-tptk
  });
  const curLocation = useLocation();
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
          <Col span={10} style={{ overflowY: "scroll" }}>
            {curLocation.pathname === "/found" ? (
              <FormFound></FormFound>
            ) : (
              <FormLost></FormLost>
            )}
          </Col>
          <Col span={14}>{isLoaded ? <UpMap /> : <></>}</Col>
        </Row>
      </Col>
    </Row>
  );
};
export default Upload;
