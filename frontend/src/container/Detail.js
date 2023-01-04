import Card from "../components/Card";
import Background from "../components/Background";
import styled from "styled-components";
import Map from "../components/Map";
import {Col} from 'antd';
import { Alert, Space } from 'antd';
import { useParams } from "react-router-dom";
import axios from '../api';
import {useState, useEffect} from 'react';
import { useLoadScript } from "@react-google-maps/api";

const Detail = () => {
    const [data, setData] = useState([]);
    const [image, setImage] = useState([]);
    const {id, time} = useParams();
    const { isLoaded } = useLoadScript({
        googleMapsApiKey: "AIzaSyAaZZfGnw5Aud0RxgRgc3-G-db_7z-tptk" // Add your API key//AIzaSyAaZZfGnw5Aud0RxgRgc3-G-db_7z-tptk
    });
    useEffect(() => {
        const a = new Date(parseInt(time)).toLocaleDateString();
        const b = new Date(parseInt(time)).toLocaleTimeString('en-US', { hourCycle: 'h23' });
        const fetchData = async () => {
            const { data: { dataList, imageList } } = 
            await axios.get('/detail', {params: {
                ID: id,
                time: a+' '+b,
            }});
            setData(dataList);
            setImage(imageList);
        }
        fetchData();
    }, [])
    return (
        <Background component={
            <>
                
              {/* <div style={{ height: '200px', width:"200px"}}/> */}
              <Col  xs={0} md={13} lg={13}  >{isLoaded? <Map center={{ lat: 25.017622284161067, lng: 121.5378841549027 }} positions={[data]} />: null}</Col>
              <Col  xs={{ span: 22, offset: 0 }} md={{ span:11, offset: 0 }} lg={{ span: 10, offset: 0 }}  ><Card data={data} image={image}/></Col>
              {/* <Alert message="已寄送信件" type="success" showIcon style={{top:"120px",position:"absolute",right:"150px"}}/> */}
            </>} 
         />
    )
}

export default Detail