import { InfoForm } from "../../components/Form/Form";
import UpMap from "../../components/UpMap/UpMap";
import React, { useEffect, useState } from "react";
import { Col, Row } from "antd";
import { useLoadScript } from "@react-google-maps/api";
import Sidebar from "../../components/Sidebar/Sidebar";
const Upload = () => {
  const { isLoaded } = useLoadScript({
    googleMapsApiKey: "AIzaSyDQdme1BbYD7iIP3X_RIxjkEIQAQau38PY", // Add your API key//AIzaSyAaZZfGnw5Aud0RxgRgc3-G-db_7z-tptk
  });
  const [location, setLocation] = useState({
    lat: 25.017622284161067,
    lng: 121.5378841549027,
  });
  useEffect(() => {
    console.log(location);
  }, [location]);
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
