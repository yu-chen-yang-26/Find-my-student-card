import Map from '../components/Map'
import Table from '../components/Table'
import Search from "../components/Searchbar"
import Background from "../components/Background";
import { Space, Col, Row } from 'antd';
import { useEffect, useState } from "react";
import { useLoadScript } from "@react-google-maps/api";
import axios from '../api';
const Homepage = () => {
    const [data, setData] = useState([]);
    const { isLoaded } = useLoadScript({
        googleMapsApiKey: "AIzaSyAaZZfGnw5Aud0RxgRgc3-G-db_7z-tptk" // Add your API key//AIzaSyAaZZfGnw5Aud0RxgRgc3-G-db_7z-tptk
    });
    const [number, setnumber] = useState(1);
    const [newmarkers, setnewmarkers] = useState([]);
    useEffect(() => {
        const fetchData = async () => {
            const { data: { dataList } } = await axios.get('/');
            // console.log("dataList.length",dataList.length)
            setData(dataList);
            // setnewmarkers(dataList.positions);
        }
        fetchData();
    }, [])
    useEffect(() => {
        if (isLoaded){
            // console.log("data123",data.length)
            if(data.length>0){
                setnewmarkers(data);
            }
        } 
    }, [isLoaded,data])
    // useEffect(() => {
    //     // console.log('useEffect')
    //     // setnewmarkers(data);
    //     if(isLoaded===true){
    //         setnewmarkers(data);
    //         console.log("data",data)
    //     }
    //     // console.log("data",data)
    //     // console.log("newmarkers",newmarkers)
    //     console.log("isLoaded",isLoaded)
    // }, [isLoaded])
    return (
        <Background component={
            <>
                <Col xs={0} md={13} lg={12} >
                    {isLoaded? <Map center={{ lat: 25.017622284161067, lng: 121.5378841549027 }} positions={newmarkers} /> : null}
                </Col>
                <Col xs={{ span: 24, offset: 0 }} md={{ span: 11, offset: 0 }} lg={{ span: 12, offset: 0 }} ><Table data={data} /></Col>
                {/* </Space> */}
                <Search setData={setData} />
            </>
        } />
    )
}

export default Homepage