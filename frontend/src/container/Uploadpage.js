import StepsBar from "../components/Step";
import UploadPic from "../components/UpPic";
import InfoForm from "../components/Form";
import styled from "styled-components";
import Icon, { HomeOutlined } from '@ant-design/icons';
import React, { useEffect, useState } from 'react';
import { Layout } from 'antd';
import { useNavigate, useParams } from 'react-router-dom'

const { Header, Footer, Sider, Content } = Layout;
const Button = styled.button`
  width: 100px;
  height: 50px;
  background: transparent;
  border-radius: 3px;
  border: 2px solid palevioletred;
  color: palevioletred;
  margin: 1em 0 0 0;
//   padding: 0.25em 1em;
  font-size: 1em;

  &:hover {
    background: palevioletred;
    color: white;
    cursor: pointer;
  }
`;
const HomeBT = styled.button`
  margin: 1em 0 0 1em;
  width: 60px;
  height: 60px;
  border-radius: 50px;
  border: transparent;
  box-shadow: 6px 2px 5px 1px rgba(0, 0, 0, 0.2);
  background: palevioletred;
  &:hover {
    width: 80px;
    height: 80px;
    cursor: pointer;
    font-size: 1.2em;
  }
`
const Wrapper = styled.div`
  
  border-radius: 3px;
  border: 2px solid palevioletred;
  margin: 10px;
  height: 470px;
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
`;
const Middle = styled.div`
  width: 700px;
  height: 450px;
  padding: 50px;
  background-color: #F8F8FF;
`;
const Upload =() => {
    const navigate = useNavigate();
    const {currentStep} = useParams();
    const ToHome = () => {
      navigate('/home');
      }
    const ToInfo = () => {
      navigate('/detail');
      }
    const NextPage = () => {
      const nextStep = parseInt(currentStep) + 1;
      navigate('/upload/' + nextStep);
    }
    return (
      <Layout>
        <Header style={{ minHeight: '100px',backgroundColor:"white" }}><StepsBar currentStep={parseInt(currentStep)}></StepsBar></Header>
        <Content style={{ backgroundColor:"white" }}>
          <Wrapper>
            {currentStep==="0"?
            <UploadPic component={<>
                  <Button style={{margin:'20px',position:"absolute",right:"0",bottom:'0'}} onClick={NextPage}>Done</Button>
                  <Button style={{margin:'20px',position:"absolute",right:"120px",bottom:'0'}} onClick={NextPage}>Skip</Button></>}/>
            :currentStep==="1"?<Middle><InfoForm/></Middle>:""}    
          </Wrapper>
          {/* <Button style={{margin:'20px'}} onClick={ToHome}>回到主頁</Button> */}
          <HomeBT><HomeOutlined style={{ fontSize: '26px', color: 'white' }} onClick={ToHome}/></HomeBT>
          {/* {currentStep==!0?<HomeBT style={{ color: 'grey',backgroundColor: "pink" }} onClick={LastPage}>Last page</HomeBT>:""} */}
          <HomeBT style={{margin:'20px', right:"20px", backgroundColor: "#FFD700"}} onClick={ToInfo}>Finished</HomeBT>
        </Content>
            
      </Layout>
    )
}

export default Upload