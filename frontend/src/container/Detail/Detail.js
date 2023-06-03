import Card from "../../components/Card/Card";
import { Col } from "antd";
import { useParams } from "react-router-dom";
import api from "../../api";
import { useState, useEffect } from "react";
import Sidebar from "../../components/Sidebar/Sidebar";

const Detail = () => {
  const [data, setData] = useState([]);
  const [image, setImage] = useState([]);
  const { id } = useParams();
  useEffect(() => {
    const fetchData = async () => {
      await api
        .get("/detail", {
          params: {
            id: id,
          },
        })
        .then((response) => {
          if (response.data.dataList) {
            setData(response.data.dataList);
          }
          setImage(response.data.imageList);
        });
    };
    fetchData();
  }, [id]);

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
          paddingTop: "8vmin",
          paddingBottom: "8vmin",
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
          paddingTop: "8vmin",
          paddingBottom: "8vmin",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        {data ? <Card data={data} image={image} /> : null}
      </Col>
    </div>
  );
};

export default Detail;
