import React, { useEffect, useState } from "react";
import { List, Input, Col, Select } from "antd";
import { useNavigate } from "react-router-dom";
import api from "../../api";

const options = [
  {
    value: "category",
    label: "category",
  },
  {
    value: "location",
    label: "loctaion",
  },
  {
    value: "time",
    label: "time",
  },
  {
    value: "remark",
    label: "remark",
  },
];
const { Search } = Input;
const SearchTable = ({ data }) => {
  const navigate = useNavigate();

  return (
    <div style={{ height: "100%", width: "100%" }}>
      <div style={{ display: "flex", height: "10%", alignItems: "center" }}>
        <Select size="large" defaultValue="category" options={options} />
        <Search placeholder="search" enterButton="Search" size="large" />
      </div>
      <List style={{ height: "90%", overflowY: "scroll" }}>
        {data.map((item) => (
          <List.Item key={item._id}>
            <Col span={12}>
              <List.Item.Meta
                key={item._id}
                style={{ fontSize: "30px", cursor: "pointer" }}
                title={item.category}
                description={item.remark}
                onClick={() => navigate("/detail/" + item._id)}
              />
            </Col>
            <Col span={4}>{item.found_location.location}</Col>
            <Col span={8}>{new Date(item.time).toLocaleString()}</Col>
          </List.Item>
        ))}
      </List>
    </div>
  );
};
export default SearchTable;
