import React, { useState } from 'react';
import { ConfigProvider } from 'antd';
import {
  Button,
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
const InfoForm = ({NextPage}) => {
    const [componentSize, setComponentSize] = useState('default');
    const onFormLayoutChange = ({ size }) => {
        setComponentSize(size);}
    const buttonItemLayout = 
        {
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
    <Form
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
      <Form.Item name="Location Found" label="Location Found" {...config}>
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
      <Form.Item label="Remark">
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
      <Form.Item {...buttonItemLayout}>
        {/* <Button type="primary" onClick={() =>NextPage()}>Submit</Button> */}
      </Form.Item></ConfigProvider>
    </Form>
  );
};
export default InfoForm;