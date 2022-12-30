import styled from "styled-components"
import Map from '../components/Map'
import Table from '../components/Table'
import Search from "../components/Searchbar"
import Background from "../components/Background";
import { Space, Col, Row } from 'antd';
import { useEffect, useState } from "react";
import axios from '../api';


import { useLoadScript } from "@react-google-maps/api";
const init_markers = [
    {
        id: "r10521314",
        name: "高家浩",
        position: { lat: 25.018980966640957, lng: 121.5430102369873 }
    },
    {
        id: "r10521327",
        name: "莊浥岫",
        position: { lat: 25.0175809726526, lng: 121.54213047243042 }
    },
    {
        id: "r10323003",
        name: "楊于晨",
        position: { lat: 25.0175809726526, lng: 121.542570355 }
    },
];
const Homepage = () => {
    const [data, setData] = useState([]);
    useEffect(() => {
        const fetchData = async () => {
            const { data: { dataList } } = await axios.get('/');
            setData(dataList);
        }
        fetchData();
    }, [])
    const [markers, setmarkers] = useState([]);

    const { isLoaded } = useLoadScript({
        googleMapsApiKey: "" // Add your API key//AIzaSyAaZZfGnw5Aud0RxgRgc3-G-db_7z-tptk
    });
    useEffect(() => {
        if (isLoaded) setmarkers(init_markers);
    }, [isLoaded]);
    return (

        <Background component={
            <>
                {/* <Space size={"large"}> */}

                <Col xs={0} md={13} lg={13} xl={11}>
                    {isLoaded ? <Map center={{ lat: 25.017622284161067, lng: 121.5378841549027 }} positions={markers} /> : null}
                </Col>
                <Col xs={{ span: 20, offset: 1 }} md={{ span: 9, offset: 0 }} lg={{ span: 9, offset: 0 }} xl={{ span: 11, offset: 0 }}><Table data={data} /></Col>
                {/* </Space> */}
                <Search />
            </>
        } />
    )
}

export default Homepage