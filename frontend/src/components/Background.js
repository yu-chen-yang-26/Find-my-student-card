import styled from "styled-components"
import { Avatar } from 'antd';
import { Layout, Row } from 'antd';
import Pic from "../Pic/bear.jpg";

import {
  HomeOutlined,
  LoadingOutlined,
  SettingFilled,
  SmileOutlined,
  GithubOutlined,
  InstagramOutlined,
} from '@ant-design/icons';
import { useNavigate, useLocation } from 'react-router-dom'
// import Sider from "./Sider";

const { Footer, Sider, Content } = Layout;
const Wrapper = styled.div`
  display: flex;
  flex-direction: row;
  align-items: top;
  margin: 10px ;
  height: 600px;
  border: 2px solid palevioletred;
  
`;

const Right = styled.div`
  width: 100%;
  height: 90vh;
  border-radius: 3px;
  // border: 2px solid palevioletred;
  background-color: transparent;
  overflow-y : hidden;
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  align-items: flex-start;
  
  h1 {
    text-align: center;
    text-shadow: 4px 3px 0px rgba(0,0,0,0.2);
    font-size: 3em;
    margin: 10px ;
    padding: 10px;
    color: white;
    border: 5px solid #fdeff9;
    border-radius: 20px;
    width: 100%;
    background-color: palevioletred;
    background-image: radial-gradient( palevioletred, #eaafc8);
    @media (max-width: 700px) {
      font-size: 2.1em;
    }
    @media (max-width: 600px) {
      font-size: 2em;
    }
    @media (max-width: 550px) {
      font-size: 1.6em;
    }
 }
`;
const Left = styled.div`
  width: 130px;
  min-height: 95vh;
  margin: 10px;
  border: 2px solid palevioletred;
  text-align: center;
`;
const Button = styled.button`
  width: 110px;
  height: 50px;
  background: rgb(150,74,96);
  border-radius: 20px;
  border: 3px solid #BEA5AA;
  color: #BEA5AA;
  margin: 1em 0 0 0;
  box-shadow: 3px 5px 5px 2px rgba(0, 0, 0, 0.2);
//   padding: 0.25em 1em;
  font-size: 1.1em;

  &:hover {
    background: #EF5D8D;
    color: white;
    cursor: pointer;
  }
`;
const InButton = styled.button`
  width: 110px;
  height: 50px;
  background: #EF5D8D;
  color: white;
  border-radius: 20px;
  border: 3px solid #BEA5AA;
  margin: 1em 0 0 0;
  box-shadow: 3px 5px 5px 2px rgba(0, 0, 0, 0.2);
//   padding: 0.25em 1em;
  font-size: 1.1em;
`;

const Background = ({ para,component }) => {
  const location = useLocation()
  const upload = location.pathname.split('/')[1]
  console.log(location.pathname.split('/')[1])
  const navigate = useNavigate();
  const ToUpload = () => {
    navigate('/upload/0');
  }
  const ToHome = () => {
    navigate('/home');
  }
  const ToHeatMap = () => {
    navigate('/HeatMap');
  }
  return (

    <Layout style={{ minHeight: '100vh' }}>
      <Sider style={{ backgroundImage: "linear-gradient(to bottom right, #9796f0, #fbc7d4)", borderBlockColor: '#DBC8CE', boxShadow: "5px 0px 5px 2px rgba(0, 0, 0, 0.2)" }} width={150} >
        <Left>
          <Avatar shape="square" size={120} src={Pic}></Avatar>
          {location.pathname==='/home'?<InButton onClick={ToHome}> <HomeOutlined style={{ fontSize: '22px' }} onClick={ToHome} /> 主頁</InButton>:<Button onClick={ToHome}> <HomeOutlined style={{ fontSize: '22px' }} onClick={ToHome} /> 主頁</Button>}
          {upload==='upload'?<InButton onClick={ToUpload}> 拾獲學生證</InButton>:<Button onClick={ToUpload}> 拾獲學生證</Button>}
          {location.pathname==='/HeatMap'?<InButton onClick={ToHeatMap}> 遺失熱區</InButton>:<Button onClick={ToHeatMap}> 遺失熱區</Button>}
        </Left>
      </Sider>
      <Layout>
        <Content>
          <Row justify="space-around" >
            <Right style={{ position: "relative" }}>
              <h1>Find my student card</h1>
              {component}
            </Right>
          </Row>
        </Content>
        <Footer style={{ backgroundColor: '#D3CCE3', height: '70px' }}>
          <InstagramOutlined style={{ fontSize: '26px', color: 'purple', cursor: "pointer" }} />
          <GithubOutlined style={{ fontSize: '26px', color: 'purple', margin: "10px", cursor: "pointer" }} />
          聯絡我們 最新資訊
        </Footer>
      </Layout>
    </Layout>
  )
}

export default Background