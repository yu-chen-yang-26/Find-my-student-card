import React, { useEffect, useState } from "react";
import { ConfigProvider } from "antd";
import { useNavigate, useLocation } from "react-router-dom";
import axios from "../api";
import sendemail from "./Mail";
import { message, Cascader, DatePicker, Form, Input, TimePicker } from "antd";
import UploadImg from "./Upload";
const InfoForm = ({ setImageList, setLocation, setApi, submit }) => {
  const { state } = useLocation();
  const [form] = Form.useForm();
  const ID = Form.useWatch("Student ID", form);
  const location = Form.useWatch("Location Found", form);
  const date = Form.useWatch("Date Found", form);
  const time = Form.useWatch("Time Found", form);
  const info = Form.useWatch("Remark", form);
  const options = [
    {
      code: "社科院",
      name: "社科院",
      items: [
        {
          code: "社科圖",
          name: "社科圖",
        },
        {
          code: "經濟系",
          name: "經濟系",
        },
      ],
    },
    {
      code: "椰林大道",
      name: "椰林大道",
      items: [
        {
          code: "森林系",
          name: "森林系",
        },
        {
          code: "土木系",
          name: "土木系",
        },
        {
          code: "椰林大道近總圖",
          name: "椰林大道近總圖",
        },
        {
          code: "椰林大道近大門口",
          name: "椰林大道近大門口",
        },
      ],
    },
    {
      code: "桃花心木道",
      name: "桃花心木道",
      items: [
        {
          code: "計中",
          name: "計中",
        },
        {
          code: "外教",
          name: "外教",
        },
      ],
    },
    {
      code: "舟山路口",
      name: "舟山路口",
      items: [
        {
          code: "公館捷運站",
          name: "公館捷運站",
        },
        {
          code: "大一女宿",
          name: "大一女宿",
        },
        {
          code: "研一",
          name: "研一",
        },
      ],
    },
    {
      code: "楓香道",
      name: "楓香道",
      items: [
        {
          code: "資工系館",
          name: "資工系館",
        },
        {
          code: "電機系館",
          name: "電機系館",
        },
        {
          code: "工綜",
          name: "工綜",
        },
      ],
    },
    {
      code: "教學大樓",
      name: "教學大樓",
      items: [
        {
          code: "共同",
          name: "共同",
        },
        {
          code: "博雅",
          name: "博雅",
        },
        {
          code: "普通",
          name: "普通",
        },
        {
          code: "綜合",
          name: "綜合",
        },
        {
          code: "新生",
          name: "新生",
        },
      ],
    },
    {
      code: "二活＆管理學院",
      name: "二活＆管理學院",
      items: [
        {
          code: "管一",
          name: "管一",
        },
        {
          code: "管二",
          name: "管二",
        },
        {
          code: "二活",
          name: "二活",
        },
      ],
    },
    {
      code: "總圖書館",
      name: "總圖書館",
      items: [
        {
          code: "總圖前草皮",
          name: "總圖前草皮",
        },
        {
          code: "總圖後草皮",
          name: "總圖後草皮",
        },
        {
          code: "總圖館內",
          name: "總圖館內",
        },
      ],
    },
    {
      code: "體育場",
      name: "體育場",
      items: [
        {
          code: "舊體周圍",
          name: "舊體周圍",
        },
        {
          code: "新體",
          name: "新體",
        },
        {
          code: "田徑場",
          name: "田徑場",
        },
        {
          code: "網球場",
          name: "網球場",
        },
      ],
    },
    {
      code: "學餐",
      name: "學餐",
      items: [
        {
          code: "活大",
          name: "活大",
        },
        {
          code: "小福",
          name: "小福",
        },
        {
          code: "小小福",
          name: "小小福",
        },
      ],
    },
    {
      code: "其他",
      name: "其他",
    },
  ];
  const navigate = useNavigate();
  const handleSubmit = async () => {
    if (ID && location && date && time) {
      const a = new Date(date).toLocaleDateString();
      const b = new Date(time).toLocaleTimeString("en-US", {
        hourCycle: "h23",
      });
      const newLocation = location.length === 1 ? "其他" : location[1];
      const newTime = a + " " + b;
      const {
        data: { message, SendPermition },
      } = await axios.post("/submit", {
        params: {
          ID: ID,
          location: newLocation,
          time: newTime,
          info: info ? info : "",
          image: state.imageList,
          position: state.location,
        },
      });
      if (message === "success") {
        setImageList([]);
        setApi({ ID: ID, time: Date.parse(newTime) });
        setLocation({ lat: 25.017622284161067, lng: 121.5378841549027 });
        navigate("/upload/3");
        if (SendPermition) {
          sendemail(ID, newLocation, newTime, "/detail/" + ID + "/" + time);
        }
      }
    } else {
      message.error("Please fill the form correctly.");
    }
  };
  useEffect(() => {
    if (submit === true) {
      handleSubmit();
    }
  }, [submit]);
  const [componentSize, setComponentSize] = useState("default");
  const onFormLayoutChange = ({ size }) => {
    setComponentSize(size);
  };
  const buttonItemLayout = {
    wrapperCol: { span: "10", offset: "8" },
  };
  const config = {
    rules: [
      {
        type: "object",
        required: true,
        message: "Please select!",
      },
    ],
  };
  return (
    <>
      <Form
        form={form}
        labelCol={{
          span: 9,
        }}
        wrapperCol={{
          span: 15,
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
          label="Category"
          rules={[
            {
              type: "string",
              required: true,
              message: "Please input the Category!",
            },
          ]}
        >
          <Input allowClear placeholder="Please enter category" />
        </Form.Item>
        <Form.Item
          name="Location Found"
          label="Location Found"
          rules={[
            {
              type: "array",
              required: true,
              message: "Please select",
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
            placeholder="Please select"
          />
        </Form.Item>
        <Form.Item
          name="Location Retrieve"
          label="Location Retrieve"
          rules={[
            {
              type: "array",
              required: false,
              message: "Please select",
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
            placeholder="Please select"
          />
        </Form.Item>
        <Form.Item
          name="Student ID"
          label="Student ID"
          rules={[
            {
              type: "string",
              required: false,
              message: "Please input the Student ID!",
            },
          ]}
        >
          <Input allowClear placeholder="Please enter owner's Student ID" />
        </Form.Item>
        <Form.Item
          name="Name"
          label="Name"
          rules={[
            {
              type: "string",
              required: false,
              message: "Please input the Name!",
            },
          ]}
        >
          <Input allowClear placeholder="Please enter owner's name" />
        </Form.Item>
        <Form.Item name="Date Found" label="Date Found" {...config}>
          <DatePicker />
        </Form.Item>
        <Form.Item name="Time Found" label="Time Found" {...config}>
          <TimePicker />
        </Form.Item>
        <Form.Item name="Upload" label="Upload">
          <UploadImg />
        </Form.Item>
        <Form.Item name="Remark" label="Remark">
          <Input />
        </Form.Item>
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
export { InfoForm };
