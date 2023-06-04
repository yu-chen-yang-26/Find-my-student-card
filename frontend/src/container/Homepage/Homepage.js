import Map from "../../components/Map/Map";
import Table from "../../components/Table/Table";
import Sidebar from "../../components/Sidebar/Sidebar";
import { Col, Row, Layout } from "antd";
import { useEffect, useState } from "react";
import { useLoadScript } from "@react-google-maps/api";
import api from "../../api";
import styled from "styled-components";

const Container = styled(Layout)(() => ({
  width: "100vw",
  height: "100vh",
}));
const Homepage = () => {
  const [data, setData] = useState([]);
  const { isLoaded } = useLoadScript({
    googleMapsApiKey: "AIzaSyDQdme1BbYD7iIP3X_RIxjkEIQAQau38PY", // Add your API key//AIzaSyAaZZfGnw5Aud0RxgRgc3-G-db_7z-tptk
  });
  const [newmarkers, setnewmarkers] = useState([]);
  useEffect(() => {
    const appendData = async () => {
      await api
        .get("/", {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
            Accept: "application/json",
          },
        })
        .then((response) => {
          setData(response.data.dataList);
        });
    };
    appendData();
  }, []);
  useEffect(() => {
    if (isLoaded) {
      if (data.length > 0) {
        setnewmarkers(data);
      }
    }
  }, [isLoaded, data]);
  return (
    <Container>
      <Col span={2}>
        <Sidebar />
      </Col>
      <Col span={22}>
        <Row>
          <Col span={14}>
            {isLoaded ? (
              <div
                style={{
                  height: "100vh",
                  padding: "20px",
                  borderRadius: "10px",
                  display: "flex",
                  alignItems: "center",
                  justifyContents: "center",
                }}
              >
                <Map positions={newmarkers} />
              </div>
            ) : null}
          </Col>
          <Col
            span={10}
            style={{
              paddingTop: "4vmin",
              paddingBottom: "4vmin",
              paddingLeft: "2vmin",
              paddingRight: "2vmin",
            }}
          >
            <Table data={data} setData={setData} />
          </Col>
        </Row>
      </Col>
    </Container>
  );
};

export default Homepage;
