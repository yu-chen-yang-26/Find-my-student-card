import React, { useEffect, useMemo, useState, useCallback , useRef,} from 'react';
import { Upload } from 'antd';
import ImgCrop from 'antd-img-crop';
import styled from "styled-components";
import Icon, { HomeOutlined, EnvironmentOutlined  } from '@ant-design/icons';
import { useLocation } from 'react-router-dom';
import { GoogleMap, InfoWindow, Marker, InfoWindowF } from "@react-google-maps/api";
const Wrapper = styled.div`
  width: 500px;
  border-radius: 3px;
  // border: 2px solid palevioletred;
  background-color: #F5F5F5;
  
`;
const MapStyle = styled.div`
  height: 400px;sload
  width: 700px;
  margin: 0 30px 0 20px;
  background-color: gray;
  border: 2px solid palevioletred;
  background-image: url(${props => props.img});
`;
const Button = styled.button`
  margin: 1em 0 0 1em;
  width: 80px;
  height: 40px;
  border-radius: 50px;
  border: transparent;
  box-shadow: 6px 2px 5px 1px rgba(0, 0, 0, 0.2);
  background: palevioletred;
  &:hover {
    width: 120px;
    height: 45px;
    cursor: pointer;
    font-size: 1.1em;
  }
`;

const UpMap = ({ component, location, setLocation }) => {
  const [activeMarker, setActiveMarker] = useState('');
  const [pin,setpin] =useState(false);
  const [draggable, setDraggable] = useState(false);
  const [realdraggable, setrealdraggable] = useState(false);
  const [buttonText,setbuttonText] = useState(0);
  let Text = ['Locate','Relocate','Done'];
  // const mycenter = useMemo(() => ({ lat: 25.017622284161067, lng: 121.5378841549027 }));
  const [mycenter,setmycenter] = useState({ lat: 25.017622284161067, lng: 121.5378841549027 });
  // const
  const handleText = () => {
    if(buttonText===0){
      setDraggable(true);
      setbuttonText(1)
    }
    if(buttonText===1){
      setDraggable(false);
      setbuttonText(2)
    }
    if(buttonText===2){
      setDraggable(true);
      setbuttonText(1)
    }
    setrealdraggable(true)
  }
  const toggleDraggable = () => {
    // setDraggable((d) => !d)
    handleText();
    
  } 
  // const toggleDraggable = useCallback(() => {
  //   // setDraggable((d) => !d)
  //   handleText();
    
  // }, [])
  const markerRef = useRef(null);

  function onDragEnd(...args) {
    // console.log("onDragEnd args: ", args);
    // console.log(
    //   markerRef.current.position.lat(),
    //   markerRef.current.position.lng()
    // );
    setLocation({
      lat: markerRef.current.position.lat(),
      lng: markerRef.current.position.lng()
    });
    // mycenter(location)
    // setNewLocation();
  }

  const onMarkerLoad = useCallback(
    marker => {
      markerRef.current = marker;
      // const path = marker.getPath();
      // console.log(marker);
    },
    
    [onDragEnd]
  );

  return (
    <>
      {/* <MapStyle> */}
        <GoogleMap
          zoom={15}
          center={mycenter}
          mapContainerClassName="map-container"
          // onClick={() => setActiveMarker(null)}
          mapContainerStyle={{ width: "100%", height: "100%" }}
        // zoom={10}
        >
          {realdraggable?<Marker onDragEnd={onDragEnd} onLoad={onMarkerLoad} position={location} animation={(buttonText===1)?1:0} draggable={draggable} title={'Drag Me'}  />:""}        
        </GoogleMap>
        <Button onClick={toggleDraggable} style={{position:"absolute",bottom:"50px"}}><EnvironmentOutlined />{(buttonText===0)?'Locate':(buttonText===1)?'Done':(buttonText===2)?'Relocate':''    }</Button>
        {/* <Button onClick={toggleDraggable} style={{position:"absolute",bottom:"50px"}}><EnvironmentOutlined />{buttonText}</Button> */}
        <br></br>
      {/* </MapStyle> */}
    </>
  );
};
export default UpMap;