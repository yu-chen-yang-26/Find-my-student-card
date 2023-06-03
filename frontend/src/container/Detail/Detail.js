import Card from "../../components/Card/Card";
import { Col } from "antd";
import { useParams } from "react-router-dom";
import axios from "../../api";
import { useState, useEffect, Layout } from "react";
import { useLoadScript } from "@react-google-maps/api";
import Sidebar from "../../components/Sidebar/Sidebar";
import styled from "styled-components";

const Detail = () => {
  const [data, setData] = useState([]);
  const [image, setImage] = useState([]);
  const { id, time } = useParams();
  const { isLoaded } = useLoadScript({
    googleMapsApiKey: "AIzaSyAaZZfGnw5Aud0RxgRgc3-G-db_7z-tptk", // Add your API key//AIzaSyAaZZfGnw5Aud0RxgRgc3-G-db_7z-tptk
  });
  useEffect(() => {
    const a = new Date(parseInt(time)).toLocaleDateString();
    const b = new Date(parseInt(time)).toLocaleTimeString("en-US", {
      hourCycle: "h23",
    });
    const fetchData = async () => {
      const {
        data: { dataList, imageList },
      } = await axios.get("/detail", {
        params: {
          ID: id,
          time: a + " " + b,
        },
      });
      if (dataList) {
        setData(dataList);
      }
      setImage(imageList);
    };
    fetchData();
  }, []);

  return (
    <div style={{ display: "flex" }}>
      <Col span={2}>
        <Sidebar />
      </Col>

      <Col
        xs={0}
        md={11}
        lg={11}
        style={{
          height: "80vh",
          border: "1px solid #000000",
          borderColor: "#FF0000",
          margin: "20px",
          marginTop: "80px",
        }}
      >
        <img scr={image}></img>
      </Col>

      <Col
        xs={{ span: 18, offset: 0 }}
        md={{ span: 10, offset: 0 }}
        lg={{ span: 10, offset: 0 }}
        style={{ marginTop: "130px" }}
      >
        <Card style={{ marginLeft: "25px" }} data={data} image={image} />
      </Col>
    </div>
  );
};

export default Detail;
