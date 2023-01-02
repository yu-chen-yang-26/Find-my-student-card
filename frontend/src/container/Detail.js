import Card from "../components/Card";
import Background from "../components/Background";
import styled from "styled-components";
import Map from "../components/Map";
import {Col} from 'antd';
import { Alert, Space } from 'antd';

const Detail = ({ setInfo }) => {
    return (
        <Background component={
            <>
                
              {/* <div style={{ height: '200px', width:"200px"}}/> */}
              <Col  xs={0} md={13} lg={12}  ><Map center={{ lat: 25.017622284161067, lng: 121.5378841549027 }} positions={[]} /></Col>
              <Col  xs={{ span: 24, offset: 0 }} md={{ span:11, offset: 0 }} lg={{ span: 12, offset: 0 }}  ><Card /></Col>
              {/* <Alert message="已寄送信件" type="success" showIcon style={{top:"120px",position:"absolute",right:"150px"}}/> */}
            </>} 
        setInfo={setInfo} />
    )
}

export default Detail