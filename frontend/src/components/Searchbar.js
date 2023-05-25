import React, { useState } from "react";
import { SearchOutlined } from "@ant-design/icons";
import { Button, Tooltip, Space, Input } from "antd";
import axios from "../api";

const Search = ({ setData }) => {
  const [ID, setID] = useState("");
  const handleCLick = async () => {
    const {
      data: { dataList },
    } = await axios.get("/search", {
      params: {
        ID: ID,
      },
    });
    setData(dataList);
  };
  return (
    <>
      <Space
        style={{
          top: "100px",
          position: "absolute",
          margin: "20px",
          right: "20px",
        }}
      >
        <Input
          allowClear
          placeholder="Enter the Student ID"
          value={ID}
          onChange={(e) => {
            setID(e.target.value);
          }}
        ></Input>
        <Tooltip title="search">
          <Button
            shape="circle"
            icon={<SearchOutlined />}
            onClick={handleCLick}
          />
        </Tooltip>
      </Space>
    </>
  );
};
export default Search;
