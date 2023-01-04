import React, { useState } from 'react';
import styled from "styled-components"
import { Cascader } from 'antd';
import { SearchOutlined } from '@ant-design/icons';
import { Button, Tooltip, Space, Input, Col } from 'antd';
import axios from '../api';
const Container= styled.div`
  margin: 0 0 0 20px;
  display: flex;
  justify-content: space-around;
  flex-wrap : wrap;
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

const Search = ({setData}) => {
  const [ID, setID] = useState('');
  const handleCLick = async () => {
    const { data: { dataList } } 
    = await axios.get('/search', {params: {
      ID: ID
    }});
    setData(dataList);
  }
  return(
  <>
  <Space style={{top:"90px",position:"absolute",margin:"20px",right:"20px"}}>
      <Input allowClear placeholder="Enter the Student ID" value={ID} onChange={(e)=>{setID(e.target.value)}}></Input>
      <Col xs={6}>
        <Cascader options={options} placeholder="Please select"/>
      </Col>
      <Tooltip title="search">
          <Button shape="circle" icon={<SearchOutlined />} onClick={handleCLick}/>
      </Tooltip>
  </Space>
  </>
)}
export default Search;
