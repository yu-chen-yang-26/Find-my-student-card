import styled from "styled-components"
import { Avatar } from 'antd';
import Table from "./Table";
import Search from "./Searchbar";
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
import { useNavigate } from 'react-router-dom'

const {  Footer, Sider, Content } = Layout;
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
    @media (max-width: 500px) {
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

const Container = styled.div`
  
  text-align: center;
  display: flex;
  flex-direction: column;
  align-items: center;
`
const Background=({component})=> {
  const navigate = useNavigate();
  const ToUpload = () => {
    navigate('/upload/0');
  }
  const ToHome = () => {
    navigate('/home');
    }
    return(
        // <Wrapper>
        //     <Left>
        //         <Avatar shape="square" size={100} src={Pic}></Avatar>
        //         <Button onClick={ToHome}> 主頁</Button>
        //         <Button onClick={ToUpload}> 拾獲學生證</Button>
        //     </Left>
        //     <Right>
        //         <h1>Find my student card</h1>
        //         {component}
        //     </Right>
        // </Wrapper>
        <Layout style={{ minHeight: '100vh' }}>
          <Sider style={{ backgroundImage: "linear-gradient(to bottom right, #9796f0, #fbc7d4)" ,borderBlockColor: '#DBC8CE',boxShadow: "5px 0px 5px 2px rgba(0, 0, 0, 0.2)" }} width={150} >
            <Left>
                <Avatar shape="square" size={120} src={Pic}></Avatar>
                <Button onClick={ToHome}> 主頁</Button>
                <Button onClick={ToUpload}> 拾獲學生證</Button>
                <Button onClick={ToUpload}> 遺失熱區</Button>
            </Left>
          </Sider>
          <Layout>
            <Content>  
            <Row justify="space-around" >     
              <Right style={{position:"relative"}}>  
                <h1>Find my student card</h1>
                  {component}
              </Right> 
            </Row>       
            </Content>
            <Footer style={{ backgroundColor: '#D3CCE3',height:'70px' }}>
              <InstagramOutlined style={{ fontSize: '26px', color: 'purple',margin:"10px",cursor:"pointer" }}/>
              <GithubOutlined style={{ fontSize: '26px', color: 'purple',cursor:"pointer" }}/>
            </Footer>
          </Layout>
        </Layout>
    )
}

export default Background