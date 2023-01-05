import styled from "styled-components"
import React from "react";
import { Map, HeatMap, GoogleApiWrapper } from "google-maps-react";
const MapStyle = styled.div`
  height: 450px;
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
const styles = [
  {
    "elementType": "geometry",
    "stylers": [
      {
        "color": "#f5f5f5"
      }
    ]
  },
  {
    "elementType": "labels.icon",
    "stylers": [
      {
        "visibility": "off"
      }
    ]
  },
  {
    "elementType": "labels.text.fill",
    "stylers": [
      {
        "color": "#616161"
      }
    ]
  },
  {
    "elementType": "labels.text.stroke",
    "stylers": [
      {
        "color": "#f5f5f5"
      }
    ]
  },
  {
    "featureType": "administrative.land_parcel",
    "elementType": "labels.text.fill",
    "stylers": [
      {
        "color": "#bdbdbd"
      }
    ]
  },
  {
    "featureType": "poi",
    "elementType": "geometry",
    "stylers": [
      {
        "color": "#eeeeee"
      }
    ]
  },
  {
    "featureType": "poi",
    "elementType": "labels.text.fill",
    "stylers": [
      {
        "color": "#757575"
      }
    ]
  },
  {
    "featureType": "poi.park",
    "elementType": "geometry",
    "stylers": [
      {
        "color": "#e5e5e5"
      }
    ]
  },
  {
    "featureType": "poi.park",
    "elementType": "labels.text.fill",
    "stylers": [
      {
        "color": "#9e9e9e"
      }
    ]
  },
  {
    "featureType": "road",
    "elementType": "geometry",
    "stylers": [
      {
        "color": "#ffffff"
      }
    ]
  },
  {
    "featureType": "road.arterial",
    "elementType": "labels.text.fill",
    "stylers": [
      {
        "color": "#757575"
      }
    ]
  },
  {
    "featureType": "road.highway",
    "elementType": "geometry",
    "stylers": [
      {
        "color": "#dadada"
      }
    ]
  },
  {
    "featureType": "road.highway",
    "elementType": "labels.text.fill",
    "stylers": [
      {
        "color": "#616161"
      }
    ]
  },
  {
    "featureType": "road.local",
    "elementType": "labels.text.fill",
    "stylers": [
      {
        "color": "#9e9e9e"
      }
    ]
  },
  {
    "featureType": "transit.line",
    "elementType": "geometry",
    "stylers": [
      {
        "color": "#e5e5e5"
      }
    ]
  },
  {
    "featureType": "transit.station",
    "elementType": "geometry",
    "stylers": [
      {
        "color": "#eeeeee"
      }
    ]
  },
  {
    "featureType": "water",
    "elementType": "geometry",
    "stylers": [
      {
        "color": "#c9c9c9"
      }
    ]
  },
  {
    "featureType": "water",
    "elementType": "labels.text.fill",
    "stylers": [
      {
        "color": "#9e9e9e"
      }
    ]
  }
]
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
class HotMap extends React.Component {
  render() {
    return (
      <MapStyle className="map-container" style={{ height: '450px' }}>
        <Map
          containerStyle={containerStyle}
          google={this.props.google}
          className={"map"}
          zoom={15}
          initialCenter={this.props.center}
          onReady={this.handleMapReady}
          styles={styles}
        >
          <HeatMap
            gradient={gradient}
            positions={this.props.positions}
            opacity={1}
            radius={25}
            options={{styles: exampleMapStyles}}
          />
        </Map>
      </MapStyle>
    );
  }
}
export default GoogleApiWrapper({
  apiKey: "AIzaSyAaZZfGnw5Aud0RxgRgc3-G-db_7z-tptk", // AIzaSyAaZZfGnw5Aud0RxgRgc3-G-db_7z-tptk
  libraries: ["visualization"]
})(HotMap);

