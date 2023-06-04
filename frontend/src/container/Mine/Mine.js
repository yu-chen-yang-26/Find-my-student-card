import React, { useState, useEffect } from "react";
import { List, Col, Row } from "antd";
import Sidebar from "../../components/Sidebar/Sidebar";
import { useTranslation } from "react-i18next";
import api from "../../api";
import { useNavigate } from "react-router-dom";
const Mine = () => {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const [lostData, setLostData] = useState([]);
  const [foundData, setFoundData] = useState([]);
  useEffect(() => {
    const getData = async () => {
      await api
        .get("/lostItem", {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
            Accept: "application/json",
          },
        })
        .then((response) => {
          console.log(response.data.lostItems, response.data.foundItems);
          setLostData(response.data.lostItems);

          setFoundData(response.data.foundItems);
        })
        .catch((err) => console.log(err));
    };
    getData();
  }, []);

  const listDomNode = (title, data) => {
    return (
      <List
        style={{
          width: "100%",
          height: "100%",
          overflowY: "scroll",
        }}
      >
        <h3>{t(title)}</h3>
        {data
          ? data.map((item) => {
              console.log(item.locations);
              return (
                <List.Item style={{ height: "80px" }} key={item._id}>
                  <Col span={11}>
                    <List.Item.Meta
                      key={item._id}
                      style={{
                        fontSize: "30px",
                        cursor: title === "Your Item" ? "none" : "pointer",
                        pointerEvents: title === "Your Item" ? "none" : "auto",
                      }}
                      title={item.category}
                      description={item.remark}
                      onClick={() => navigate("/detail/" + item._id)}
                    />
                  </Col>
                  <Col span={6}>
                    {title === "Your Item"
                      ? item.locations[0]
                        ? item.locations[0].location
                        : ""
                      : item.found_location
                      ? item.found_location.location
                      : ""}
                  </Col>
                  <Col span={7}>{new Date(item.time).toLocaleString()}</Col>
                </List.Item>
              );
            })
          : null}
      </List>
    );
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
          height: "100vh",
        }}
      >
        <Row
          style={{
            width: "100%",
            height: "100%",
            display: "flex",
            justifyContent: "space-around",
            alignItems: "center",
            border: "1px solid #c8d4ff",
          }}
        >
          <Col
            span={11}
            style={{
              width: "100%",
              height: "100%",
              display: "flex",
              flexDirection: "column",
              justifyContent: "space-around",
              alignItems: "center",
            }}
          >
            {listDomNode("Your Item", lostData)}
          </Col>
          <Col
            span={11}
            style={{
              width: "100%",
              height: "100%",
              display: "flex",
              flexDirection: "column",
              justifyContent: "space-around",
              alignItems: "center",
            }}
          >
            {listDomNode("Possible Item", foundData)}
          </Col>
        </Row>
      </Col>
    </Row>
  );
};
export default Mine;
