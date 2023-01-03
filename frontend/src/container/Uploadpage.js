import StepsBar from "../components/Step";
import UploadPic from "../components/UpPic";
import InfoForm from "../components/Form";
import styled from "styled-components";
import UpMap from "../components/UpMap";
import Drag from "../components/Drag";
import Icon, { HomeOutlined } from '@ant-design/icons';
import React, { useEffect, useState, useMemo } from 'react';
import { Layout, Result } from 'antd';
import { useNavigate, useParams } from 'react-router-dom'
import { useLoadScript } from "@react-google-maps/api";
import Background from "../components/Background";

const { Header, Footer, Content } = Layout;
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
const Wrapper = styled.div`
  position: relative;
  border-radius: 3px;
  border: 2px solid palevioletred;
  margin: 10px;
  height: 380px;
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  background-color:transparent;
`;
const Middle = styled.div`
  width: 700px;
  height: 350px;
  padding: 50px;
  background-color: #F8F8FF;
`;
const Upload = () => {
  const navigate = useNavigate();
  const { currentStep } = useParams();
  const [imageList, setImageList] = useState([]);
  const mycenter = useMemo(() => ({ lat: 25.017622284161067, lng: 121.5378841549027 }));
  const [location, setLocation] = useState(mycenter);

  const ToHome = () => {
    navigate('/home');
  }
  const ToInfo = () => {
    navigate('/detail');
  }
  const NextPage = () => {
    const nextStep = parseInt(currentStep) + 1;
    console.log(imageList);
    navigate('/upload/' + nextStep, {
      state: {
        imageList: imageList,
        location: location}
    });
  }
  const LastPage = () => {
    const lastStep = parseInt(currentStep) - 1;
    navigate('/upload/' + lastStep);
  }
  const { isLoaded } = useLoadScript({
    googleMapsApiKey: "AIzaSyAaZZfGnw5Aud0RxgRgc3-G-db_7z-tptk" // Add your API key//AIzaSyAaZZfGnw5Aud0RxgRgc3-G-db_7z-tptk
  });
  return (
    // <Layout>
    //   <Header style={{ minHeight: '100px', backgroundColor: "white" }}><StepsBar currentStep={parseInt(currentStep)}></StepsBar></Header>
    //   <Content style={{ backgroundColor: "white" }}>
    //     <Wrapper>
    //       {currentStep === "0" ?
    //        <UploadPic component={<>
    //         <Button style={{margin:'20px',position:"absolute",right:"0",bottom:'0'}} onClick={() => NextPage()}>Done</Button>
    //         <Button style={{margin:'20px',position:"absolute",right:"120px",bottom:'0'}} onClick={NextPage}>Skip</Button></>}/>
    //         : currentStep === "1" ? <Middle><InfoForm NextPage={() =>NextPage()}/></Middle>
    //           : currentStep === "2" && isLoaded == true ? <Middle><UpMap component={<>
    //             <Button onClick={NextPage}>Done</Button></>} /></Middle> : ""}
    //     </Wrapper>
    //     <HomeBT><HomeOutlined style={{ fontSize: '26px', color: 'white' }} onClick={ToHome}/></HomeBT>
    //     {currentStep!=="0"?<HomeBT style={{ color: 'grey',backgroundColor: "pink" }} onClick={LastPage}>Last page</HomeBT>:""}
    //     <HomeBT style={{margin:'15px', right:"20px", backgroundColor: "#FFD700"}} onClick={ToInfo}>Finished</HomeBT>
    //   </Content>
    // </Layout>
    <Background component={
      <Layout style={{ backgroundColor: "transparent" }}>

        <Header style={{ minHeight: '100px', backgroundColor: "transparent" }}><StepsBar currentStep={parseInt(currentStep)}></StepsBar></Header>
        <Content style={{ backgroundColor: "transparent" }}>
          <Wrapper>
            {currentStep !== "0" && currentStep !== "3"? <HomeBT style={{ color: 'grey', left: "15%", backgroundColor: "pink" }} onClick={LastPage}>Last page</HomeBT> : ""}
            
            {currentStep === "0" ?<Drag/>
              : currentStep === "1" && isLoaded == true ? <Middle><UpMap location={location} setLocation={setLocation}/></Middle>
                : currentStep === "2" ? <Middle><InfoForm NextPage={() => NextPage()} /></Middle>
                  : currentStep === "3" ? <Result
                    status="success"
                    title="Successfully Purchased Cloud Server ECS!"
                    subTitle="Order number: 2017182818828182881 Cloud server configuration takes 1-5 minutes, please wait."
                  /> : ""}

            {/* <HomeBT><HomeOutlined style={{ fontSize: '26px', color: 'white' }} onClick={ToHome} /></HomeBT> */}
            
            <HomeBT style={{ margin: '15px', right: "15%", backgroundColor: "#FFD700" }} onClick={currentStep !== "3" ? NextPage : ToInfo}>Done</HomeBT>
          </Wrapper>
        </Content>
      </Layout>
    }></Background>

  )
}
export default Upload