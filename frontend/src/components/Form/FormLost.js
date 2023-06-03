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
  const categories = [
    {
      code: "學生證",
      name: "學生證",
    },
    {
      code: "其他證件",
      name: "其他證件",
    },
    {
      code: "錢包",
      name: "錢包",
    },
    {
      code: "手機",
      name: "手機",
    },
    {
      code: "現金",
      name: "現金",
    },
    {
      code: "信用卡",
      name: "信用卡",
    },
    {
      code: "水壺",
      name: "水壺",
    },
    {
      code: "雨傘",
      name: "雨傘",
    },
    {
      code: "筆記本",
      name: "筆記本",
    },
    {
      code: "筆電平板",
      name: "筆電平板",
    },
    {
      code: "帽子",
      name: "帽子",
    },
    {
      code: "衣服",
      name: "衣服",
    },
    {
      code: "耳機",
      name: "耳機",
    },
    {
      code: "鑰匙",
      name: "鑰匙",
    },
    {
      code: "其他",
      name: "其他",
    },
  ];
  const options = [
    {
      code: "椰林大道",
      name: "椰林大道",
      items: [
        {
          code: "振興草坪",
          name: "振興草坪",
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
          code: "大一女",
          name: "大一女",
        },
        {
          code: "鹿鳴堂",
          name: "鹿鳴堂",
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
      code: "社科院",
      name: "社科院",
      items: [
        {
          code: "社科圖",
          name: "社科圖",
        },
        {
          code: "118巷",
          name: "118巷",
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
  const handleSubmit = async (Continue) => {
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
            mislayer: localStorage.getItem("id"),
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
          navigate("/profile");
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
