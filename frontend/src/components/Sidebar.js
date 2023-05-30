import { Row, Layout } from "antd";
import { AiFillHome, AiFillSetting } from "react-icons/ai";
import { BiUpload } from "react-icons/bi";

const { Sider } = Layout;

const Sidebar = () => {
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
          justifyContent: "center",
          alignItems: "center",
          gap: "8vmin",
          height: "100vh",
        }}
      >
        <AiFillHome color="white" size={30} cursor="pointer" />
        <BiUpload color="white" size={30} cursor="pointer" />
        <AiFillSetting color="white" size={30} cursor="pointer" />
      </Row>
    </Sider>
  );
};
export default Sidebar;
