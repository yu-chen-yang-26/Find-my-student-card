import { Row, Layout } from "antd";
import { AiFillHome, AiFillSetting, AiFillNotification } from "react-icons/ai";
import { BiUpload } from "react-icons/bi";
import { useNavigate } from "react-router-dom";
import "./Sidebar.css";
import lostFound from "../../Pic/lost&found.png";
const { Sider } = Layout;

const Sidebar = () => {
  const navigate = useNavigate();
  return (
    <Sider
      style={{
        backgroundColor: "#c8d4ff",
      }}
      width={"100%"}
    >
      <Row
        style={{
          display: "flex",
          flexDirection: "column",
          // justifyContent: "center",
          alignItems: "center",
          gap: "12vmin",
          height: "100vh",
        }}
        className="sidebar"
      >
        <img src={lostFound} alt="" width={100} />
        <AiFillHome
          color="white"
          size={30}
          cursor="pointer"
          onClick={() => navigate("/home")}
        />
        <BiUpload
          color="white"
          size={30}
          cursor="pointer"
          onClick={() => navigate("/upload")}
        />
        <AiFillNotification
          color="white"
          size={30}
          cursor="pointer"
          onClick={() => navigate("/announcement")}
        />
        <AiFillSetting
          color="white"
          size={30}
          cursor="pointer"
          onClick={() => navigate("/settings")}
        />
      </Row>
    </Sider>
  );
};
export default Sidebar;
