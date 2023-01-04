import styled from "styled-components"
import Map from '../components/Map'
import Table from '../components/Table'
import Search from "../components/Searchbar"
import Background from "../components/Background";
import { Space, Col, Row } from 'antd';
import { useEffect, useState } from "react";
import axios from '../api';
const Homepage = () => {
    const [data, setData] = useState([]);
    
    useEffect(() => {
        const fetchData = async () => {
            const { data: { dataList } } = await axios.get('/');
            setData(dataList);
            // setnewmarkers(dataList.positions);
        }
        fetchData();
    }, [])
    return (
        <Background component={
            <>
                <Col xs={0} md={13} lg={12} >
                    {data !== [] ? <Map center={{ lat: 25.017622284161067, lng: 121.5378841549027 }} positions={data} /> : null}
                </Col>
                <Col xs={{ span: 24, offset: 0 }} md={{ span: 11, offset: 0 }} lg={{ span: 12, offset: 0 }} ><Table data={data} /></Col>
                {/* </Space> */}
                <Search setData={setData} />
            </>
        } />
    )
}

export default Homepage