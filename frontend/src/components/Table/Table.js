import React, { useEffect, useState } from "react";
import { List, Input, Col, Form, Cascader, DatePicker, Button } from "antd";
import { useNavigate } from "react-router-dom";
import api from "../../api";
import { options, categories } from "../../assets/options";
import { useTranslation } from "react-i18next";

const { Search } = Input;
const SearchTable = ({ data, setData }) => {
  const navigate = useNavigate();
  const { t } = useTranslation();
  const [form] = Form.useForm();
  const category = Form.useWatch("Category", form);
  const location = Form.useWatch("Location", form);
  const date = Form.useWatch("Date Found", form);
  const info = Form.useWatch("Remark", form);
  const handleSearch = async () => {
    if (!category && !location && !date && !info) {
      await api
        .get("/", {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
            Accept: "application/json",
          },
        })
        .then((response) => {
          setData(response.data.dataList);
        })
        .catch((err) => console.log(err));
    }
    console.log(category, location, date, info);
    const seachCategory = category ? category[0] : category;
    const serachLocation =
      location !== undefined
        ? location.length === 1
          ? "其他"
          : location[1]
        : location;

    await api
      .get("/search", {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
          Accept: "application/json",
        },
        params: {
          category: seachCategory,
          location: serachLocation,
          time: date,
          remark: info,
        },
      })
      .then((response) => {
        setData(response.data.dataList);
      })
      .catch((err) => console.log(err));
  };
  return (
    <div style={{ height: "100%", width: "100%" }}>
      <Form
        form={form}
        style={{
          display: "flex",
          height: "10%",
          alignItems: "center",
        }}
      >
        <Form.Item
          name="Category"
          rules={[
            {
              type: "array",
            },
          ]}
        >
          <Cascader
            fieldNames={{
              label: "name",
              value: "code",
              children: "items",
            }}
            options={categories}
            placeholder={t("category")}
          />
        </Form.Item>
        <Form.Item
          name="Location"
          rules={[
            {
              type: "array",
            },
          ]}
        >
          <Cascader
            fieldNames={{
              label: "name",
              value: "code",
              children: "items",
            }}
            options={options}
            placeholder={t("location")}
          />
        </Form.Item>
        <Form.Item
          name="Date Found"
          rules={[
            {
              type: "object",
            },
          ]}
        >
          <DatePicker style={{ width: "100%" }} placeholder={t("date")} />
        </Form.Item>
        <Form.Item
          name="Remark"
          rules={[
            {
              type: "string",
            },
          ]}
        >
          <Search
            placeholder="search"
            enterButton="Search"
            size="medium"
            onSearch={() => handleSearch()}
          />
        </Form.Item>
      </Form>
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
