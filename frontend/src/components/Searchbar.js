import React from 'react';
import styled from "styled-components"
import { Cascader } from 'antd';
import { SearchOutlined } from '@ant-design/icons';
import { Button, Tooltip, Space, Input } from 'antd';
const Container= styled.div`
  margin: 0 0 0 20px;
  display: flex;
  justify-content: space-around;
`;  
const options = [
  {
    value: '社科院',
    label: '社科院',
  },
  {
    value: '圖書館',
    label: '圖書館',
  },
];
const onChange = (value) => {
  console.log(value);
};
const search = () => <>
<Space style={{marginLeft:"25px",marginTop:"20px"}}>

    <Input allowClear placeholder="Enter the Student ID"></Input>
    <Cascader options={options} onChange={onChange} placeholder="Please select" />
    <Tooltip title="search">
        <Button shape="circle" icon={<SearchOutlined />} />
    </Tooltip>
</Space>
</>
export default search;