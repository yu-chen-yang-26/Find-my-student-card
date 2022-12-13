import styled from "styled-components"
import { Avatar } from 'antd';
import Table from "./Table";
import Search from "./Searchbar";
import { Layout } from 'antd';
import Pic from "../Pic/bear.jpg";
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
  height: 80vh;
  border-radius: 3px;
  border: 2px solid palevioletred;
  
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  align-items: flex-start;
  
  h1 {
    text-align: center;
    font-size: 2em;
    margin: 10px ;
    color: palevioletred;
    border: 2px solid palevioletred;
    width: 100%;
 }
`;
const Left = styled.div`
  width: 105px;
  min-height: 95vh;
  margin: 10px;
  border: 3px solid grey;
  text-align: center;
`;    
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

const Container = styled.div`
  
  text-align: center;
  display: flex;
  flex-direction: column;
  align-items: center;
`
const background=({component, setUpload, setHome, setInfo})=> {
  const ToUpload = () => {
    setUpload(true)
    setHome(false)
  }
  const ToHome = () => {
    setHome(true)
    setInfo(false)
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
          <Sider width={125} >
            <Left>
                <Avatar shape="square" size={100} src={Pic}></Avatar>
                <Button onClick={ToHome}> 主頁</Button>
                <Button onClick={ToUpload}> 拾獲學生證</Button>
            </Left>
          </Sider>
          <Layout>
            <Content>       
              <Right>
                <h1>Find my student card</h1>
                  {component}
              </Right>        
            </Content>
            <Footer>Footer</Footer>
          </Layout>
        </Layout>
    )
}

export default background