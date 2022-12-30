import styled from "styled-components"
import Map from '../components/Map'
import Table from '../components/Table'
import Search from "../components/Searchbar"
import Background from "../components/Background";
import { Space, Col,Row } from 'antd';
import { useEffect, useState } from "react";
import axios from '../api';



const Homepage = ()=>{
    const [data, setData] = useState([]);
    useEffect(()=>{
        const fetchData = async () => {
            const {data: { dataList }} = await axios.get('/');
            setData(dataList);
        }
        fetchData();
    }, [])
    return(
        
        <Background  component = {
            <>
                {/* <Space size={"large"}> */}
                    
                    <Col xs={0} md={13} lg={13} xl={11}><Map/></Col>
                    <Col  xs={{ span: 20, offset:1}}  md={{ span:9, offset:0}} lg={{ span:9, offset:0}} xl={{ span:11, offset:0}}><Table data={data}/></Col>
                {/* </Space> */}
                <Search/>
            </>
        }/>
    )
}

export default Homepage