import React, { useEffect, useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import api from "../../api";
import sendemail from "../Mail/Mail";
import styled from "styled-components";
import {
  Row,
  Cascader,
  DatePicker,
  Form,
  Input,
  TimePicker,
  Button,
  ConfigProvider,
} from "antd";
import UploadImg from "../Upload/Upload";
import { useTranslation } from "react-i18next";
import { useHooks } from "../../hook/useHooks";
import { options, categories } from "../../assets/options";

const FormButton = styled(Button)(() => ({
  backgroundColor: "#c8d4ff",
  width: "35%",
}));
const { TextArea } = Input;
const FormFound = () => {
  const { t } = useTranslation();
  const curLocation = useLocation();
  const navigate = useNavigate();
  const {
    fileList,
    setFileList,
    location,
    setLocation,
    group,
    setGroup,
    setSelectLocation,
  } = useHooks();
  const [form] = Form.useForm();
  const ID = Form.useWatch("Student ID", form);
  const category = Form.useWatch("Category", form);
  const locationRetrieve = Form.useWatch("Location Retrieve", form);
  const locationFound = Form.useWatch("Location Found", form);
  const name = Form.useWatch("Name", form);
  const date = Form.useWatch("Date Found", form);
  const time = Form.useWatch("Time Found", form);
  const info = Form.useWatch("Remark", form);
  const handleSubmit = async (Continue) => {
    if (category && locationFound && locationRetrieve && date && time) {
      const a = new Date(date).toLocaleDateString();
      const b = new Date(time).toLocaleTimeString("en-US", {
        hourCycle: "h23",
      });
      const found_location =
        locationFound.length === 1 ? "其他" : locationFound[1];
      const newTime = a + " " + b;
      const retrieve_location =
        locationRetrieve.length === 1 ? "其他" : locationRetrieve[1];
      await api
        .post(
          "/submit/foundItem",
          {
            category: category[0],
            mislayer_clue: { student_id: ID, name: name },
            found_location: { location: found_location, position: location },
            retrieve_location: {
              location: retrieve_location,
            },
            time: newTime,
            group: group ? group : false,
            remark: info ? info : "",
            image: fileList.length === 1 ? fileList[0].response.id : null,
          },
          {
            headers: {
              Authorization: `Bearer ${localStorage.getItem("token")}`,
              Accept: "application/json",
            },
          }
        )
        .then((response) => {
          setFileList([]);
          setGroup(response.data.group);
          if (
            category[0] === "學生證" &&
            /^[a-zA-z][0-9]{8}/.test(ID) &&
            response.data.SendPermition
          ) {
            sendemail({
              mode: "lost",
              ID: ID,
              category: category,
              foundLocation: found_location,
              retrieveLocation: retrieve_location,
              remark: info,
              time: newTime,
            });
          }
          if (Continue) {
            form.resetFields(["Category", "Remark", "Student ID", "Name"]);
          } else {
            setLocation({ lat: 25.017622284161067, lng: 121.5378841549027 });
            navigate("/detail/" + response.data.id);
          }
        })
        .catch((err) => console.log(err));
    }
  };
  const [componentSize, setComponentSize] = useState("default");
  const onFormLayoutChange = ({ size }) => {
    setComponentSize(size);
  };
  useEffect(() => {
    setGroup(false);
  }, [setGroup]);
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
          name="Location Found"
          label={t("Location Found")}
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
          name="Location Retrieve"
          label={t("Location Retrieve")}
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
          name="Student ID"
          label={t("Student ID")}
          rules={[
            {
              type: "string",
              required: false,
              message: t("Please enter owner's Student ID"),
            },
          ]}
        >
          <Input
            allowClear
            placeholder={t("Please enter owner's Student ID")}
          />
        </Form.Item>
        <Form.Item
          name="Name"
          label={t("Name")}
          rules={[
            {
              type: "string",
              required: false,
              message: t("Please enter owner's name"),
            },
          ]}
        >
          <Input allowClear placeholder={t("Please enter owner's name")} />
        </Form.Item>
        <Form.Item
          name="Date Found"
          label={
            curLocation.pathname === "/found" ? t("Date Found") : t("Date Lost")
          }
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
          name="Time Found"
          label={
            curLocation.pathname === "/found" ? t("Time Found") : t("Time Lost")
          }
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
        <Form.Item name="Upload" label={t("Upload")}>
          <UploadImg />
        </Form.Item>
        <Form.Item name="Remark" label={t("Remark")}>
          <TextArea
            autoSize={{ minRows: 3, maxRows: 3 }}
            placeholder={
              curLocation.pathname === "/found"
                ? "藍色 iPhone 12，在總圖三樓男廁尋獲，請找圖書館人員領取"
                : "藍色 iPhone 12，可能在總圖三樓遺失"
            }
          />
        </Form.Item>
        <Row
          style={{
            display: "flex",
            justifyContent: "space-around",
            marginTop: "5vmin",
          }}
        >
          <FormButton onClick={() => handleSubmit(1)}>
            {t("Continue")}
          </FormButton>
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
export { FormFound };
