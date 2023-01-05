import styled from "styled-components"
import React, { useEffect, useMemo, useState } from "react";
import { GoogleMap, InfoWindow, Marker, InfoWindowF } from "@react-google-maps/api";
import { useNavigate } from 'react-router-dom'
import { Button,Space } from 'antd';

const MapStyle = styled.div`
  height: 400px;
  // width: 700px;
  margin: 20px 30px 0 25px;
  background-color: gray;
  border: 4px outset palevioletred;
  box-shadow:0 0 20px 0px Gray;
`;
function Map(props) {
  const navigate = useNavigate();
  const [activeMarker, setActiveMarker] = useState('');
  const [newcenter, setnewcenter] = useState({ lat: 25.017622284161067, lng: 121.5378841549027 });
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
  useMemo(() => ({ lat: 25.017622284161067, lng: 121.5378841549027 }));
  const [map, setMap] = useState('')
  useEffect(()=>{
    if(map){
      if(props.isdetail===1){
        map.setCenter(props.center)
      }else{
        map.setCenter(newcenter)
      }
    }

    }, [activeMarker])
  const handleActiveMarker = (props) => {
    setActiveMarker(props.ID + props.time);
    map.setCenter(props.position)
    setnewcenter(props.position)
  };
  const toDetail = (record) => {
    navigate(record);
  }  
  return (
      <MapStyle>
      <GoogleMap
        zoom={15}
        center={(props.isdetail===1)?props.center:{ lat: 25.017622284161067, lng: 121.5378841549027 }}
        mapContainerClassName="map-container"
        onLoad={(map) => setMap(map)}
        mapContainerStyle={{ width: "100%", height: "100%" }}
        options={{ styles: exampleMapStyles }}
      >
        {props.positions.map(({ ID, date, time, position }) => {
          const a = new Date(date).toLocaleDateString();
          const b = new Date(time).toLocaleTimeString('en-US', { hourCycle: 'h23' });
          const timess = a + ' ' + b
          const mylink = '/detail/' + ID + '/' + timess
          return (
            <Marker
              key={ID + time}
              position={position}
              onClick={() => {handleActiveMarker({ ID, time, position })}}
            >
              {(activeMarker == ID + time) && (props.isdetail!==1)? (
                <InfoWindowF onCloseClick={() => setActiveMarker('')}>
                  <>
                    <div>{ID}</div>
                    <div>{time}</div>
                    <Button danger onClick={() =>{toDetail('/Detail/'+ID+'/'+Date.parse(time))}}>link</Button>
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