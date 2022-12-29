import StepsBar from "../components/Step";
import UploadPic from "../components/UpPic";
import InfoForm from "../components/Form";
import styled from "styled-components";
import { Layout } from 'antd';
import { useNavigate } from 'react-router-dom'

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
const Wrapper = styled.div`
  
  border-radius: 3px;
  border: 2px solid palevioletred;
  margin: 10px;

  display: flex;
  flex-direction: row;
`;
const Middle = styled.div`
  width: 500px;
  margin:30px;
  padding: 20px;
  background-color: #F8F8FF;
`;
const Upload =() => {
    const navigate = useNavigate();
    const ToHome = () => {
      navigate('/home');
      }
    const ToInfo = () => {
      navigate('/detail');
      }
    return (
      <Layout>
        <Header style={{ minHeight: '100px',backgroundColor:"white" }}><StepsBar></StepsBar></Header>
        <Content style={{ backgroundColor:"white" }}>
          <Wrapper>
            <UploadPic component={<>
                  <Button style={{margin:'20px',position:"absolute",right:"0",bottom:'0'}} onClick={ToHome}>Done</Button>
                  <Button style={{margin:'20px',position:"absolute",right:"120px",bottom:'0'}} onClick={ToHome}>Skip</Button></>}/>
            <Middle><InfoForm/></Middle>    
          </Wrapper>
          <Button style={{margin:'20px'}} onClick={ToHome}>回到主頁</Button>
          <Button style={{margin:'20px', right:"20px"}} onClick={ToInfo}>上傳完成</Button>
        </Content>
            
      </Layout>
    )
}

export default Upload