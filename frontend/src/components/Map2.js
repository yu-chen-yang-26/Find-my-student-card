import styled from "styled-components"
import React, { useEffect, useMemo, useState } from "react";
import { GoogleMap, InfoWindow, Marker, InfoWindowF } from "@react-google-maps/api";
import { Map, HeatMap, GoogleApiWrapper } from "google-maps-react";
const MapStyle = styled.div`
  height: 400px;
  // width: 700px;
  margin: 20px 30px 0 20px;
  background-color: gray;
  border: 2px solid palevioletred;
  background-image: url(${props => props.img});
`;
const gradient = [
  "rgba(102, 255, 0, 0)",
"rgba(102, 255, 0, 0.7)",
"rgba(147, 255, 0, 0.7)",
"rgba(193, 255, 0, 0.7)",
"rgba(238, 255, 0, 0.7)",
"rgba(244, 227, 0, 0.7)",
"rgba(249, 198, 0, 0.7)",
"rgba(255, 170, 0, 0.7)",
"rgba(255, 113, 0, 0.7)",
"rgba(255, 57, 0, 0.7)",
"rgba(255, 0, 0, 0.7)"
];

const containerStyle = {
  position: 'relative',
  width: '100%',
  height: '100%'
}
class Map2 extends React.Component {
  render() {
    return (
      <div className="map-container" style={{ height: '400px', width: '700px' }}>

        <Map
          containerStyle={containerStyle}
          google={this.props.google}
          className={"map"}
          zoom={15}
          initialCenter={this.props.center}
          onReady={this.handleMapReady}
        >
          {/* <Marker onClick={this.onMarkerClick} name={'Current location'} position={this.props.center}/> */}

          <HeatMap
            gradient={gradient}
            positions={this.props.positions}
						// positions={[{ lat: 25.018980966640957, lng: 121.5430102369873 },{ lat: 25.0175809726526, lng: 121.54213047243042 }]}
            opacity={1}
            radius={25}
          />
        </Map>

      </div>
    );
  }
}
export default GoogleApiWrapper({
  apiKey: "", // AIzaSyAaZZfGnw5Aud0RxgRgc3-G-db_7z-tptk
  libraries: ["visualization"]
})(Map2);

