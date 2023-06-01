import Map from "../../components/Map";
import Table from "../../components/Table";
import Sidebar from "../../components/Sidebar";
import Search from "../../components/Searchbar";
import Background from "../../components/Background";
import { Col, Row, Layout } from "antd";
import { useEffect, useState } from "react";
import { useLoadScript } from "@react-google-maps/api";
import axios from "../../api";
import styled from "styled-components";
const { Content } = Layout;

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
    const fetchData = async () => {
      const {
        data: { dataList },
      } = await axios.get("/");
      setData(dataList);
    };
    fetchData();
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
                  height: "60vh",
                  margin: "20px",
                  borderRadius: "10px",
                  overflow: "hidden",
                }}
              >
                <Map
                  center={{ lat: 25.017622284161067, lng: 121.5378841549027 }}
                  positions={newmarkers}
                />
              </div>
            ) : null}
            <div
              style={{
                height: "30vh",
                margin: "20px",
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
              }}
            >
              <div
                style={{
                  border: "1px solid black",
                  borderRadius: "10px",
                  width: "350px",
                  height: "200px",
                  overflow: "hidden",
                }}
              ></div>
              <div
                style={{
                  border: "1px solid black",
                  borderRadius: "10px",
                  width: "350px",
                  height: "200px",
                  overflow: "hidden",
                }}
              ></div>
            </div>
          </Col>
          <Col span={10} style={{ height: "100vh" }}>
            <Table data={data} style={{ height: "80vh !important" }} />
          </Col>
        </Row>
      </Col>
    </Container>
    // <Background component={
    //     <>
    //         <Col xs={0} md={13} lg={12} >
    //             {isLoaded? <Map center={{ lat: 25.017622284161067, lng: 121.5378841549027 }} positions={newmarkers} /> : null}
    //         </Col>
    //         <Col xs={{ span: 24, offset: 0 }} md={{ span: 11, offset: 0 }} lg={{ span: 12, offset: 0 }} ><Table data={data} /></Col>
    //         <Search setData={setData} />
    //     </>
    // } />
  );
};

export default Homepage;
