import React, { useState, useCallback, useEffect, useRef } from "react";
import styled from "styled-components";
import { EnvironmentOutlined } from "@ant-design/icons";
import { GoogleMap, Marker } from "@react-google-maps/api";
import { useTranslation } from "react-i18next";
import { useHooks } from "../../hook/useHooks";
import locationRef from "../../assets/location.json";
const MapStyle = styled.div`
  height: 80vh;
  margin: 0 30px 0 20px;
  background-color: gray;
  position: relative;
  border: 2px solid #c8d4ff;
  background-image: url(${(props) => props.img});
`;
const Button = styled.button`
  margin: 1em 0 0 1em;
  width: 80px;
  height: 40px;
  border-radius: 50px;
  border: transparent;
  box-shadow: 6px 2px 5px 1px rgba(0, 0, 0, 0.2);
  background: #b3aaf7;
  position: absolute;
  bottom: 5%;
  left: 50%;
  transform: translate(-50%, -5%);
  &:hover {
    width: 120px;
    height: 45px;
    cursor: pointer;
    font-size: 1.1em;
  }
`;

const UpMap = () => {
  const { t } = useTranslation();
  const [draggable, setDraggable] = useState(false);
  const [pin, setPin] = useState(false);
  const [buttonText, setbuttonText] = useState(0);
  const { location, setLocation, selectLocation } = useHooks();
  const markerRef = useRef(null);
  const clickButton = () => {
    if (buttonText === 0) {
      setDraggable(true);
      setbuttonText(1);
    }
    if (buttonText === 1) {
      setDraggable(false);
      setbuttonText(2);
    }
    if (buttonText === 2) {
      setDraggable(true);
      setbuttonText(1);
    }
    setPin(true);
  };
  const onDragEnd = () => {
    setLocation({
      lat: markerRef.current.position.lat(),
      lng: markerRef.current.position.lng(),
    });
  };
  const onMarkerLoad = useCallback((marker) => {
    markerRef.current = marker;
  }, []);
  useEffect(() => {
    if (selectLocation !== "") {
      setLocation(locationRef[selectLocation]);
      setDraggable(true);
      setbuttonText(1);
      setPin(true);
    } else {
      setDraggable(false);
      setbuttonText(0);
      setPin(false);
    }
  }, [setLocation, selectLocation]);
  return (
    <MapStyle>
      <GoogleMap
        zoom={15}
        center={{
          lat: 25.017622284161067,
          lng: 121.5378841549027,
        }}
        mapContainerClassName="map-container"
        mapContainerStyle={{ width: "100%", height: "100%" }}
      >
        {pin ? (
          <Marker
            onDragEnd={onDragEnd}
            onLoad={onMarkerLoad}
            position={location}
            animation={buttonText === 1 ? 1 : 0}
            draggable={draggable}
            title={"Drag Me"}
          />
        ) : (
          ""
        )}
      </GoogleMap>
      <Button onClick={() => clickButton()}>
        <EnvironmentOutlined />
        {buttonText === 0
          ? t("Pin up")
          : buttonText === 1
          ? t("Done")
          : buttonText === 2
          ? t("Relocate")
          : ""}
      </Button>
      <br></br>
    </MapStyle>
  );
};
export default UpMap;
