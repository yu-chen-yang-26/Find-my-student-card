import { Row, Layout, Typography } from "antd";
import { AiFillHome, AiFillProfile, AiFillNotification } from "react-icons/ai";
import { BiUpload } from "react-icons/bi";
import { useNavigate } from "react-router-dom";
import "./Sidebar.css";
import lostFound from "../../Pic/lost&found.png";
import styled from "styled-components";
import { useTranslation } from "react-i18next";
const { Sider } = Layout;
const SidebarItem = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-around;
  align-items: center;
  gap: 1vmin;
  cursor: pointer;
  width: 80%;
  align-self: center;
  border-bottom: 3px solid transparent;
  &:hover {
    border-bottom: 3px solid white;
  }
`;
const SidebarName = styled(Typography)(() => ({
  color: "white",
  width: "80%",
}));
const Sidebar = () => {
  const { t } = useTranslation();
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
          gap: "6vmin",
          height: "100vh",
        }}
        className="sidebar"
      >
        <img src={lostFound} alt="" style={{ width: "100%" }} />
        <SidebarItem onClick={() => navigate("/home")}>
          <AiFillHome styled={{ width: "20%" }} color="white" size={20} />
          <SidebarName>{t("Home")}</SidebarName>
        </SidebarItem>
        <SidebarItem onClick={() => navigate("/found")}>
          <BiUpload styled={{ width: "20%" }} color="white" size={20} />
          <SidebarName>{t("Found")}</SidebarName>
        </SidebarItem>
        <SidebarItem onClick={() => navigate("/lost")}>
          <AiFillNotification
            styled={{ width: "20%" }}
            color="white"
            size={20}
          />
          <SidebarName>{t("Lost")}</SidebarName>
        </SidebarItem>
        <SidebarItem onClick={() => navigate("/profile")}>
          <AiFillProfile styled={{ width: "20%" }} color="white" size={20} />{" "}
          <SidebarName>{t("Profile")}</SidebarName>
        </SidebarItem>
      </Row>
    </Sider>
  );
};
export default Sidebar;
