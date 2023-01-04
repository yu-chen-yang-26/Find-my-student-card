import styled from "styled-components"
import React, { useEffect, useMemo, useState } from "react";
import { GoogleMap, InfoWindow, Marker, InfoWindowF } from "@react-google-maps/api";
import { Map, HeatMap, GoogleApiWrapper } from "google-maps-react";
import googleMapStyles from "./MapStyles2";
const MapStyle = styled.div`
  height: 400px;
  // width: 700px;
  margin: 20px 30px 0 25px;
  background-color: gray;
  border: 4px outset palevioletred;
  box-shadow:0 0 20px 0px Gray;
  align-items: center;
  display:flex;
  justify-content: center;

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
const exampleMapStyles = [
  {
      "featureType": "all",
      "elementType": "all",
      "stylers": [
          {
              "hue": "#008eff"
          }
      ]
  },
  {
      "featureType": "poi",
      "elementType": "all",
      "stylers": [
          {
              "visibility": "off"
          }
      ]
  },
  {
      "featureType": "road",
      "elementType": "all",
      "stylers": [
          {
              "saturation": "0"
          },
          {
              "lightness": "0"
          }
      ]
  },
  {
      "featureType": "transit",
      "elementType": "all",
      "stylers": [
          {
              "visibility": "off"
          }
      ]
  },
  {
      "featureType": "water",
      "elementType": "all",
      "stylers": [
          {
              "visibility": "simplified"
          },
          {
              "saturation": "-60"
          },
          {
              "lightness": "-20"
          }
      ]
  }
];
class Map2 extends React.Component {
  render() {
    return (
      <MapStyle className="map-container" style={{ height: '400px' }}>
        <Map
          containerStyle={containerStyle}
          google={this.props.google}
          className={"map"}
          zoom={15}
          initialCenter={this.props.center}
          onReady={this.handleMapReady}
          styles={googleMapStyles.styles}
          // options={{styles: exampleMapStyles}}
          // style={exampleMapStyles}
        >
          {/* <Marker onClick={this.onMarkerClick} name={'Current location'} position={this.props.center}/> */}

          <HeatMap
            gradient={gradient}
            positions={this.props.positions}
						// positions={[{ lat: 25.018980966640957, lng: 121.5430102369873 },{ lat: 25.0175809726526, lng: 121.54213047243042 }]}
            opacity={1}
            radius={25}
            options={{styles: exampleMapStyles}}
          />
        </Map>
      </MapStyle>
    );
  }
}
// Map2.defaultProps = googleMapStyles;
export default GoogleApiWrapper({
  apiKey: "AIzaSyAaZZfGnw5Aud0RxgRgc3-G-db_7z-tptk", // AIzaSyAaZZfGnw5Aud0RxgRgc3-G-db_7z-tptk
  libraries: ["visualization"]
})(Map2);

