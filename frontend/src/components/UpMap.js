import React, { useEffect, useMemo, useState, useCallback , useRef,} from 'react';
import { Upload } from 'antd';
import ImgCrop from 'antd-img-crop';
import styled from "styled-components";
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
  width: 100px;
  height: 50px;
  background: transparent;
  border-radius: 3px;
  border: 2px solid palevioletred;
  color: palevioletred;
  margin: 1em 0 0 0;
//   padding: 0.25em 1em;
  font-size: 1em;

  &:hover {
    background: palevioletred;
    color: white;
    cursor: pointer;
  }
`;

const UpMap = ({ component, location, setLocation }) => {
  const [activeMarker, setActiveMarker] = useState('');
  const [pin,setpin] =useState(false);
  const [draggable, setDraggable] = useState(false);
  const mycenter = useMemo(() => ({ lat: 25.017622284161067, lng: 121.5378841549027 }));
  // const 
  const toggleDraggable = useCallback(() => {
    // setDraggable((d) => !d)
    setDraggable(true);
  }, [])
  const markerRef = useRef(null);

  function onDragEnd(...args) {
    console.log("onDragEnd args: ", args);
    console.log(
      markerRef.current.position.lat(),
      markerRef.current.position.lng()
    );
    setLocation({
      lat: markerRef.current.position.lat(),
      lng: markerRef.current.position.lng()
    });
    // setNewLocation();
  }

  const onMarkerLoad = useCallback(
    marker => {
      markerRef.current = marker;
      // const path = marker.getPath();
      console.log(marker);
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
          // onLoad={handleOnLoad}
          onClick={() => setActiveMarker(null)}
          mapContainerStyle={{ width: "100%", height: "100%" }}
        // zoom={10}
        >
          {draggable?<Marker onDragEnd={onDragEnd} onLoad={onMarkerLoad} position={location} animation={2} draggable={draggable} title={'Drag Me'}  />:""}        
        </GoogleMap>
        <Button onClick={toggleDraggable}>Locate</Button>
        {component}
        <br></br>
      {/* </MapStyle> */}
    </>
  );
};
export default UpMap;