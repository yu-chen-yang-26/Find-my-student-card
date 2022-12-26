import styled from "styled-components"
import Map from '../components/Map'
import Table from '../components/Table'
import Search from "../components/Searchbar"
import Background from "../components/Background";
import { Space,  } from 'antd';
const Homepage = ()=>{
    return(
        <Background  component = {
            <>
                <Space size={"large"}>
                    <Map/>
                    <Table/>
                </Space>
                
                <Search/>
            </>
        }/>
    )
    
}

export default Homepage