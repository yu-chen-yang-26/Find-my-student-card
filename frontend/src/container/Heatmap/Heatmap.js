import Background from "../../components/Background/Background";
import Map2 from "../../components/HotMap/HotMap";
import { Col } from "antd";
import { useState, useEffect } from "react";
import { useLoadScript } from "@react-google-maps/api";
import axios from "../../api";
import "./Heatmap.css";
const Heatmap = ({ setInfo }) => {
  const [data, setData] = useState([]);
  const [tempstore, settempstore] = useState([]);
  const { isLoaded } = useLoadScript({
    googleMapsApiKey: "AIzaSyAaZZfGnw5Aud0RxgRgc3-G-db_7z-tptk", // Add your API key AIzaSyAaZZfGnw5Aud0RxgRgc3-G-db_7z-tptk
  });
  useEffect(() => {
    const fetchData = async () => {
      const {
        data: { dataList },
      } = await axios.get("/");
      setData(dataList.map((item) => Object.values(item)[0]));
      if (dataList.length > 0) {
        setData(dataList.map((item) => Object.values(item)[0]));
      }
    };
    fetchData();
  }, []);
  useEffect(() => {
    if (isLoaded && data.length > 0) {
      settempstore(data);
    }
  }, [isLoaded, data]);
  return (
    <div className="map" style={{ width: "500px" }}>
      {isLoaded && tempstore !== [] ? (
        <Map2
          center={{ lat: 25.017622284161067, lng: 121.5378841549027 }}
          positions={tempstore}
        />
      ) : (
        ""
      )}
    </div>
  );
};

export default Heatmap;
