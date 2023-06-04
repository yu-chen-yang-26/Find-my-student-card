import styled from "styled-components";
import React, { useState } from "react";
import { GoogleMap, Marker, InfoWindowF } from "@react-google-maps/api";
import { useNavigate } from "react-router-dom";
import { Button } from "antd";

const MapStyle = styled.div`
  height: 100%;
  width: 100%;
  border: 6px outset;
  border-radius: 10px;
  border-color: #b3aaf7;
`;
function Map({ positions }) {
  console.log(positions);
  const navigate = useNavigate();
  const [activeMarker, setActiveMarker] = useState("");
  const [isdetail, setIsdetail] = useState(0);
  const [newcenter, setnewcenter] = useState({
    lat: 25.017622284161067,
    lng: 121.5378841549027,
  });
  const [map, setMap] = useState("");
  const handleActiveMarker = (id, position) => {
    setActiveMarker(id);
    map.setCenter(position);
    setnewcenter(position);
    setIsdetail(0);
  };
  const toDetail = (record) => {
    navigate(record);
  };
  return (
    <MapStyle>
      <GoogleMap
        zoom={15}
        center={
          isdetail === 1
            ? newcenter
            : { lat: 25.017622284161067, lng: 121.5378841549027 }
        }
        mapContainerClassName="map-container"
        onLoad={(map) => setMap(map)}
        mapContainerStyle={{ width: "100%", height: "100%" }}
        // options={{ styles: exampleMapStyles }}
      >
        {positions.map(({ _id, category, time, found_location }) => {
          const timess = new Date(time).toLocaleString();
          const position = found_location.position;
          const id = _id;
          return (
            <Marker
              key={id}
              position={position}
              onClick={() => {
                handleActiveMarker(id, position);
              }}
            >
              {activeMarker === id && isdetail !== 1 ? (
                <InfoWindowF onCloseClick={() => setActiveMarker("")}>
                  <>
                    <div>{category}</div>
                    <div>{timess}</div>
                    <Button
                      danger
                      onClick={() => {
                        toDetail("/Detail/" + id);
                      }}
                    >
                      link
                    </Button>
                  </>
                </InfoWindowF>
              ) : null}
            </Marker>
          );
        })}
      </GoogleMap>
    </MapStyle>
  );
}

export default Map;
