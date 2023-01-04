import styled from "styled-components"
import React, { useEffect, useMemo, useState } from "react";
import { GoogleMap, InfoWindow, Marker, InfoWindowF } from "@react-google-maps/api";

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
  const [newcenter, setnewcenter] = useState({ lat: 25.017622284161067, lng: 121.5378841549027 });
  const NTUcenter = {
    lat: 25.017622284161067,
    lng: 121.5378841549027
  };

  const exampleMapStyles = [
    {
      "elementType": "geometry",
      "stylers": [
        {
          "color": "#ebe3cd"
        }
      ]
    },
    {
      "elementType": "labels.text.fill",
      "stylers": [
        {
          "color": "#523735"
        }
      ]
    },
    {
      "elementType": "labels.text.stroke",
      "stylers": [
        {
          "color": "#f5f1e6"
        }
      ]
    },
    {
      "featureType": "administrative",
      "elementType": "geometry",
      "stylers": [
        {
          "visibility": "off"
        }
      ]
    },
    {
      "featureType": "administrative",
      "elementType": "geometry.stroke",
      "stylers": [
        {
          "color": "#c9b2a6"
        }
      ]
    },
    {
      "featureType": "administrative.land_parcel",
      "elementType": "geometry.stroke",
      "stylers": [
        {
          "color": "#dcd2be"
        }
      ]
    },
    {
      "featureType": "administrative.land_parcel",
      "elementType": "labels.text.fill",
      "stylers": [
        {
          "color": "#ae9e90"
        }
      ]
    },
    {
      "featureType": "landscape.natural",
      "elementType": "geometry",
      "stylers": [
        {
          "color": "#dfd2ae"
        }
      ]
    },
    {
      "featureType": "poi",
      "stylers": [
        {
          "visibility": "off"
        }
      ]
    },
    {
      "featureType": "poi",
      "elementType": "geometry",
      "stylers": [
        {
          "color": "#dfd2ae"
        }
      ]
    },
    {
      "featureType": "poi",
      "elementType": "labels.text.fill",
      "stylers": [
        {
          "color": "#93817c"
        }
      ]
    },
    {
      "featureType": "poi.park",
      "elementType": "geometry.fill",
      "stylers": [
        {
          "color": "#a5b076"
        }
      ]
    },
    {
      "featureType": "poi.park",
      "elementType": "labels.text.fill",
      "stylers": [
        {
          "color": "#447530"
        }
      ]
    },
    {
      "featureType": "road",
      "elementType": "geometry",
      "stylers": [
        {
          "color": "#f5f1e6"
        }
      ]
    },
    {
      "featureType": "road",
      "elementType": "labels.icon",
      "stylers": [
        {
          "visibility": "off"
        }
      ]
    },
    {
      "featureType": "road.arterial",
      "elementType": "geometry",
      "stylers": [
        {
          "color": "#fdfcf8"
        }
      ]
    },
    {
      "featureType": "road.highway",
      "elementType": "geometry",
      "stylers": [
        {
          "color": "#f8c967"
        }
      ]
    },
    {
      "featureType": "road.highway",
      "elementType": "geometry.stroke",
      "stylers": [
        {
          "color": "#e9bc62"
        }
      ]
    },
    {
      "featureType": "road.highway.controlled_access",
      "elementType": "geometry",
      "stylers": [
        {
          "color": "#e98d58"
        }
      ]
    },
    {
      "featureType": "road.highway.controlled_access",
      "elementType": "geometry.stroke",
      "stylers": [
        {
          "color": "#db8555"
        }
      ]
    },
    {
      "featureType": "road.local",
      "elementType": "labels.text.fill",
      "stylers": [
        {
          "color": "#806b63"
        }
      ]
    },
    {
      "featureType": "transit",
      "stylers": [
        {
          "visibility": "off"
        }
      ]
    },
    {
      "featureType": "transit.line",
      "elementType": "geometry",
      "stylers": [
        {
          "color": "#dfd2ae"
        }
      ]
    },
    {
      "featureType": "transit.line",
      "elementType": "labels.text.fill",
      "stylers": [
        {
          "color": "#8f7d77"
        }
      ]
    },
    {
      "featureType": "transit.line",
      "elementType": "labels.text.stroke",
      "stylers": [
        {
          "color": "#ebe3cd"
        }
      ]
    },
    {
      "featureType": "transit.station",
      "elementType": "geometry",
      "stylers": [
        {
          "color": "#dfd2ae"
        }
      ]
    },
    {
      "featureType": "water",
      "elementType": "geometry.fill",
      "stylers": [
        {
          "color": "#b9d3c2"
        }
      ]
    },
    {
      "featureType": "water",
      "elementType": "labels.text.fill",
      "stylers": [
        {
          "color": "#92998d"
        }
      ]
    }
  ];
  // const mycenter = useMemo(() => ({ lat: 25.017622284161067, lng: 121.5378841549027 }));
  useMemo(() => ({ lat: 25.017622284161067, lng: 121.5378841549027 }));
  const [map, setMap] = useState('')
  useEffect(()=>{
    if(map){
      map.setCenter(newcenter)
    }

    }, [activeMarker])
  const handleActiveMarker = (props) => {
    setActiveMarker(props.ID + props.time);
    map.setCenter(props.position)
    setnewcenter(props.position)
  };
  // useEffect(()=>{
  //   console.log("activeMarker=",activeMarker)
  //   }, [activeMarker]
  // )
  const mycenter = useMemo(() => ({ lat: 25.017622284161067, lng: 121.5378841549027 }));
  // const mycenter = { lat: 25.017622284161067, lng: 121.5378841549027 };
  // console.log("props.positions=",props.positions)
  return (
    <MapStyle>
      <GoogleMap
        zoom={15}
        center={mycenter}
        // center={{ lat: 25.017622284161067, lng: 121.5378841549027 }}
        mapContainerClassName="map-container"
        onLoad={(map) => setMap(map)}
        onClick={() => setActiveMarker(null)}
        mapContainerStyle={{ width: "100%", height: "100%" }}
        options={{styles:exampleMapStyles}}
      // zoom={10}
      >
        {/* <Marker title={'The marker`s title will appear as a tooltip.'} name={'SOMA'} position={mycenter} /> */}
        {props.positions.map(( {ID, time, position }) => {
          // console.log("id=",ID,"position=",position);
          return(
          <Marker
            key={ID+time}
            position={position}
            onClick={() => handleActiveMarker({ID,time})}
            
            // icon= {{url: (require('../Pic/credit_card.png')),fillColor: '#EB00FF',scaledSize: {width: 30, height: 30}}}
          >
            {activeMarker == ID+time ? (
              <InfoWindowF onCloseClick={() => setActiveMarker('')}>
                <>
                  <div>{ID}</div>
                  <div>{time}</div>
                  <a href={mylink}>link</a>
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