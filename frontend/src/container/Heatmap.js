import Card from "../components/Card";
import Background from "../components/Background";
import styled from "styled-components";
import Map2 from "../components/Map2";
import {Col} from 'antd';
import {useState, useEffect, useRef} from 'react';
import { useLoadScript } from "@react-google-maps/api";
import axios from '../api';
const Heatmap = ({ setInfo }) => {
    const [data, setData] = useState([]);
    const [markers, setmarkers] = useState([]);
    const [tempstore,settempstore] = useState([]);
    const { isLoaded } = useLoadScript({
        googleMapsApiKey: "AIzaSyAaZZfGnw5Aud0RxgRgc3-G-db_7z-tptk" // Add your API key AIzaSyAaZZfGnw5Aud0RxgRgc3-G-db_7z-tptk
    });
    useEffect(() => {
        const fetchData = async () => {
            const { data: { dataList } } = await axios.get('/');
            setData(dataList.map(item => Object.values(item)[0]));
        }
        fetchData();
    }, [])
    return (
        <Background component={
            <>
              {/* <div style={{ height: '200px', width:"200px"}}/> */}
              <Col  xs={0} md={13} lg={12}  >{isLoaded && data !== [] ? <Map2 center={{ lat: 25.017622284161067, lng: 121.5378841549027 }} positions={data} />:""}</Col>
            </>} 
        setInfo={setInfo} />
    )
}

export default Heatmap