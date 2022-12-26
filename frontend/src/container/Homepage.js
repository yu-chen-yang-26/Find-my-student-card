import styled from "styled-components"
import Map from '../components/Map'
import Table from '../components/Table'
import Search from "../components/Searchbar"
import Background from "../components/Background";
import { Space,  } from 'antd';
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
                <Space size={"large"}>
                    <Map/>
                    <Table data={data}/>
                </Space>
                
                <Search/>
            </>
        }/>
    )
}

export default Homepage