import Card from "../../components/Card/Card";
import { Col } from "antd";
import { useParams } from "react-router-dom";
import api from "../../api";
import { useState, useEffect } from "react";
import Sidebar from "../../components/Sidebar/Sidebar";
import Map from "../../components/Map/Map";
import { useLoadScript } from "@react-google-maps/api";

const Detail = () => {
  const [data, setData] = useState([]);
  const [image, setImage] = useState([]);
  const { id } = useParams();
  const { isLoaded } = useLoadScript({
    googleMapsApiKey: "AIzaSyADQAXjWxd3AAgP7VQOBlMgMNugpN-Euas", // Add your API key//AIzaSyAaZZfGnw5Aud0RxgRgc3-G-db_7z-tptk
  });
  const [newmarkers, setnewmarkers] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      await api
        .get("/detail", {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
            Accept: "application/json",
          },
          params: {
            id: id,
          },
        })
        .then((response) => {
          if (response.data.dataList) {
            setData(response.data.dataList);
            if (isLoaded) {
              setnewmarkers([response.data.dataList]);
            }
          }
          setImage(response.data.imageList);
        });
    };
    fetchData();
  }, [id, isLoaded]);
  return (
    <div style={{ display: "flex" }}>
      <Col span={2}>
        <Sidebar />
      </Col>

      <Col
        span={12}
        style={{
          height: "100vh",
          padding: "3vmin",
          paddingTop: "4vmin",
          paddingBottom: "4vmin",
          paddingRight: "0",
        }}
      >
        <div
          style={{
            height: "100%",
            border: "1px solid #c8d4ff",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <img
            id="detail-img"
            alt=""
            src={image}
            style={{
              maxHeight: "100%",
              maxWidth: "100%",
            }}
          ></img>
        </div>
      </Col>
      <Col
        span={10}
        style={{
          height: "100vh",
          padding: "3vmin",
          paddingTop: "4vmin",
          paddingBottom: "4vmin",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
          gap: "1vmin",
        }}
      >
        {data ? <Card data={data} image={image} /> : null}
        {isLoaded ? (
          <div style={{ height: "45%", width: "100%" }}>
            <Map positions={newmarkers} />
          </div>
        ) : null}
      </Col>
    </div>
  );
};

export default Detail;
