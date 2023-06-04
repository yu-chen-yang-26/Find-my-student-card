import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../../api";
import styled from "styled-components";
import {
  Row,
  message,
  Cascader,
  DatePicker,
  Form,
  Input,
  TimePicker,
  Button,
  ConfigProvider,
} from "antd";
import { useTranslation } from "react-i18next";
import { useHooks } from "../../hook/useHooks";
import { options, categories } from "../../assets/options";

const FormButton = styled(Button)(() => ({
  backgroundColor: "#c8d4ff",
  width: "35%",
}));
const { TextArea } = Input;
const FormLost = () => {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const { location, setLocation, setSelectLocation } = useHooks();
  const [form] = Form.useForm();
  const category = Form.useWatch("Category", form);
  const locationFound = Form.useWatch("Location Lost", form);
  const date = Form.useWatch("Date Lost", form);
  const time = Form.useWatch("Time Lost", form);
  const info = Form.useWatch("Remark", form);
  const handleSubmit = async () => {
    if (category && locationFound && date && time) {
      const a = new Date(date).toLocaleDateString();
      const b = new Date(time).toLocaleTimeString("en-US", {
        hourCycle: "h23",
      });
      const found_location =
        locationFound.length === 1 ? "其他" : locationFound[1];
      const newTime = a + " " + b;
      await api
        .post(
          "/submit/lostItem",
          {
            category: category[0],
            locations: { location: found_location, position: location },
            time: newTime,
            remark: info ? info : "",
          },
          {
            headers: {
              Authorization: `Bearer ${localStorage.getItem("token")}`,
              Accept: "application/json",
            },
          }
        )
        .then((response) => {
          setLocation({ lat: 25.017622284161067, lng: 121.5378841549027 });
          navigate("/items");
        })
        .catch((err) => console.log(err));
    } else {
      message.error("Please fill the form correctly.");
    }
  };
  const [componentSize, setComponentSize] = useState("default");
  const onFormLayoutChange = ({ size }) => {
    setComponentSize(size);
  };

  useEffect(() => {
    if (locationFound) {
      const found_location =
        locationFound.length === 1 ? "其他" : locationFound[1];
      setSelectLocation(found_location);
    } else {
      setSelectLocation("");
    }
  }, [setSelectLocation, locationFound]);
  return (
    <>
      <Form
        form={form}
        labelCol={{
          span: 7,
        }}
        wrapperCol={{
          span: 17,
        }}
        style={{ width: "90%" }}
        layout="horizontal"
        initialValues={{
          size: componentSize,
        }}
        onValuesChange={onFormLayoutChange}
        size={componentSize}
      >
        <Form.Item
          name="Category"
          label={t("Category")}
          rules={[
            {
              type: "array",
              required: true,
              message: t("Please select category"),
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
            placeholder={t("Please select category")}
          />
        </Form.Item>
        <Form.Item
          name="Location Lost"
          label={t("Location Lost")}
          rules={[
            {
              type: "array",
              required: true,
              message: t("Please select location"),
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
            placeholder={t("Please select location")}
          />
        </Form.Item>

        <Form.Item
          name="Date Lost"
          label={t("Date Lost")}
          rules={[
            {
              type: "object",
              required: true,
              message: t("Please select date"),
            },
          ]}
        >
          <DatePicker
            style={{ width: "100%" }}
            placeholder={t("Please select date")}
          />
        </Form.Item>
        <Form.Item
          name="Time Lost"
          label={t("Time Lost")}
          rules={[
            {
              type: "object",
              required: true,
              message: t("Please select time"),
            },
          ]}
        >
          <TimePicker
            style={{ width: "100%" }}
            placeholder={t("Please select time")}
          />
        </Form.Item>
        <Form.Item name="Remark" label={t("Remark")}>
          <TextArea
            autoSize={{ minRows: 3, maxRows: 3 }}
            placeholder={"藍色 iPhone 12，可能在總圖三樓遺失"}
          />
        </Form.Item>
        <Row
          style={{
            display: "flex",
            justifyContent: "space-around",
            marginTop: "5vmin",
          }}
        >
          <FormButton onClick={() => handleSubmit(0)}>{t("Done")}</FormButton>
        </Row>
        <ConfigProvider
          theme={{
            token: {
              colorPrimary: "#faad14",
            },
          }}
        ></ConfigProvider>
      </Form>
    </>
  );
};
export { FormLost };
