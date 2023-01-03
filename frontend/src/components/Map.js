import styled from "styled-components"
import React, { useEffect, useMemo, useState } from "react";
import { GoogleMap, InfoWindow, Marker,InfoWindowF } from "@react-google-maps/api";

const MapStyle = styled.div`
  height: 400px;
  // width: 700px;
  margin: 20px 30px 0 25px;
  background-color: gray;
  border: 4px outset palevioletred;
  background-image: url(${props => props.img});
  box-shadow:0 0 20px 0px Gray;
`;
function Map(props) {
  const [activeMarker, setActiveMarker] = useState('');
  const NTUcenter = {
    lat: 25.017622284161067,
    lng: 121.5378841549027
  };
  const handleActiveMarker = (props) => {
    // console.log("activeMarker=", activeMarker)
    // console.log("id=",props.ID)
    // if (marker === activeMarker) {
    //   return;
    // }
    setActiveMarker(props.ID);
  };
  // useEffect(()=>{
  //   console.log("activeMarker=",activeMarker)
  //   }, [activeMarker]
  // )
  const mycenter = useMemo(() => ({ lat: 25.017622284161067, lng: 121.5378841549027 }));
  // console.log("props.positions=",props.positions)
  return (
    <MapStyle>
      <GoogleMap
        zoom={15}
        center={mycenter}
        mapContainerClassName="map-container"
        // onLoad={handleOnLoad}
        onClick={() => setActiveMarker(null)}
        mapContainerStyle={{ width: "100%", height: "100%" }}
      // zoom={10}
      >
        <Marker title={'The marker`s title will appear as a tooltip.'} name={'SOMA'} position={mycenter} />
        {props.positions.map(( {ID, time, position }) => {
          // console.log("id=",ID,"position=",position);
          return(
          <Marker
            key={ID}
            position={position}
            onClick={() => handleActiveMarker({ID,time})}
            // icon= {{url: (require('../Pic/credit_card.png')),fillColor: '#EB00FF',scaledSize: {width: 30, height: 30}}}
          >
            {activeMarker == ID ? (
              <InfoWindowF onCloseClick={() => setActiveMarker('')}>
                <>
                  <div>{ID}</div>
                  <div>{time}</div>
                </>
              </InfoWindowF>
            ) : null}
          </Marker>
        )
        })}
      </GoogleMap>
    </MapStyle>
  );
}

export default Map;