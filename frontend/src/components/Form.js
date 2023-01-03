import React, { useState } from 'react';
import { ConfigProvider } from 'antd';
import { useNavigate, useParams, useLocation } from 'react-router-dom'
import axios from '../api';
import styled from "styled-components";
import {
  Button,
  message,
  Cascader,
  DatePicker,
  Form,
  Input,
  InputNumber,
  TimePicker,
  Select,
  Switch,
  TreeSelect,
} from 'antd';
const HomeBT = styled.button`
  position: absolute;
  bottom: 0;
  margin: 15px;
  width: 60px;
  height: 60px;
  border-radius: 50px;
  border: transparent;
  box-shadow: 6px 2px 5px 1px rgba(0, 0, 0, 0.2);
  background: palevioletred;
  &:hover {
    margin: 15px;
    width: 80px;
    height: 80px;
    cursor: pointer;
    font-size: 1.2em;
  }
`
const InfoForm = ({setImageList, setLocation}) => {
  const { state } = useLocation();
  const [form] = Form.useForm();
  const ID = Form.useWatch('Student ID', form);
  const location = Form.useWatch('Location Zone', form);
  const date = Form.useWatch('Date-Found', form);
  const time = Form.useWatch('Time Found', form);
  const info = Form.useWatch('Remark', form);

  const navigate = useNavigate();
  const handleSubmit = async () => {
    if (ID && location && date && time) {
      var a = new Date(date).toLocaleDateString();
      var b = new Date(time).toLocaleTimeString();
      const { data: { message } } 
      = await axios.post('/submit',
      {params: {
        ID: ID,
        location: location,
        time: a + ' ' + b,
        info: info? info: '',
        image: state.imageList,
        position: state.location,
      }});
      if (message === 'success') {
        setImageList([]);
        setLocation({ lat: 25.017622284161067, lng: 121.5378841549027 });
        navigate('/upload/3');
      }
    }else{
      message.error('Please fill the form correctly.')
    }
  };
  const [componentSize, setComponentSize] = useState('default');
  const onFormLayoutChange = ({ size }) => {
    setComponentSize(size);
  }
  const buttonItemLayout = {
    wrapperCol: { span: '10', offset: '8' },
  };
  const config = {
    rules: [
        {
        type: 'object',
        required: true,
        message: 'Please select!',
        },
    ],
  };
  return (
    <>
    <Form
      form={form}
      labelCol={{
        span: 8,
      }}
      wrapperCol={{
        span: 10,
      }}
      layout="horizontal"
      initialValues={{
        size: componentSize,
      }}
      onValuesChange={onFormLayoutChange}
      size={componentSize}
    >
      {/* <Form.Item label="Form Size" name="size">
        <Radio.Group>
          <Radio.Button value="small">Small</Radio.Button>
          <Radio.Button value="default">Default</Radio.Button>
          <Radio.Button value="large">Large</Radio.Button>
        </Radio.Group>
      </Form.Item> */}
      <Form.Item name="Student ID" label="Student ID" rules={[
          {
            type: 'string',
            required: true,
            message: 'Please input the Student ID!',
          },
        ]}>
        <Input />
      </Form.Item>
      <Form.Item name="Location Zone" label="Location Zone" rules={[
          {
            type: 'string',
            required: true,
            message: 'Please select',
          },
        ]}>
        <Select>
          <Select.Option value="社科院">社科院</Select.Option>
          <Select.Option value="圖書館">圖書館</Select.Option>
        </Select>
      </Form.Item>
      {/* <Form.Item label="Cascader">
        <Cascader
          options={[
            {
              value: 'zhejiang',
              label: 'Zhejiang',
              children: [
                {
                  value: 'hangzhou',
                  label: 'Hangzhou',
                },
              ],
            },
          ]}
        />
      </Form.Item> */}
      <Form.Item name="Date-Found" label="Date-Time Found" {...config}>
        <DatePicker />
      </Form.Item>
      <Form.Item name="Time Found" label="Time Found" {...config}>
        <TimePicker />
      </Form.Item>
      <Form.Item name="Remark" label="Remark">
        <Input />
      </Form.Item>
      {/* <Form.Item label="InputNumber">
        <InputNumber />
      </Form.Item> */}
      <ConfigProvider 
      theme={{token: {
        colorPrimary: "#faad14",
      },
    }}>
      </ConfigProvider>
    </Form>
    <HomeBT onClick={handleSubmit} style={{ margin: '15px', right: "15%", backgroundColor: "#FFD700" }}>Submit</HomeBT>
    </>
  );
};
export default InfoForm;