import { useState } from "react";
import { Card, Modal, Input, Tabs, message, Tag } from "antd";
import {
  CaretRightOutlined,
  CaretLeftOutlined,
  RocketOutlined,
  CheckCircleOutlined,
} from "@ant-design/icons";
import styled from "styled-components";
import axios from "../api";

const StyledCard = styled(Card)`
  .ant-card-head-title {
    font-size: 1.3em;
  }
  .ant-card-body {
    width: 100%;
  }
  th {
    // background-color:#009879;
    color: black;
    min-width: 8vw;
    // height:75px;
  }
  td {
    background-color: #ffffff;
    width: 100%;
    // height:50px;
    text-align: center;
  }
  tr:nth-of-type(odd) td {
    background-color: #ddd6f3;
  }
  tr:nth-of-type(odd) th {
    background-color: #ddd6f3;
  }
`;
const Pic = styled.div`
  height: 300px;
  width: 100%;
  // margin: 0 30px 0 0px;
  background-size: contain;
  border-radius: 10px 0px 0px 10px;
  background-repeat: no-repeat;
  box-shadow: 0 0 20px 0px Gray;
  background-image: url(${(props) => props.img});
  background-size: cover;
  background-position: center bottom; //預設圖片左上方
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: flex-end;

  button {
    cursor: pointer;
    height: 40px;
    width: 40px;
    border-color: transparent;
    background-color: transparent;
  }
`;

const Button = styled.button`
  width: 150px;
  height: 45px;
  background: #f5af19;
  border-radius: 15px;
  border: 2px solid #ffd700;
  color: white;
  margin: 0.5em 0 0 0;
  //   padding: 0.25em 1em;
  font-size: 1em;
  box-shadow: 6px 2px 5px 1px rgba(0, 0, 0, 0.2);

  &:hover {
    font-size: 1.2em;
    width: 200px;
    height: 50px;
    background: #ffd700;
    color: white;
    cursor: pointer;
    font-weight: bold;
  }
`;
const Tab = ({ data, image }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [passwordVisible, setPasswordVisible] = useState(false);
  const [password, setPassword] = useState(null);
  const [checked, setChecked] = useState(false);
  const showModal = () => {
    setIsModalOpen(true);
  };
  const handleOk = async () => {
    const {
      data: { messages },
    } = await axios.post("/checkPassword", {
      params: {
        ID: data.ID,
        time: data.time,
        location: data.location,
        founded: data.founded,
        password: password,
      },
    });
    if (messages === "correct") {
      message.info("Correct password!");
      setIsModalOpen(false);
      setChecked(true);
    } else {
      message.error("Wrong password!");
    }
  };

  const handleCancel = () => {
    setIsModalOpen(false);
  };
  const Table2 = (
    <StyledCard
      title={
        <>
          <RocketOutlined />
          拾獲資訊
          {(data.founded == "True") | (checked == true) ? (
            <Tag
              style={{ marginLeft: "20%" }}
              icon={<CheckCircleOutlined />}
              color="success"
            >
              return to origin owner
            </Tag>
          ) : (
            ""
          )}
        </>
      }
      bordered={true}
      style={{
        borderRadius: "0",
        width: "100%",
        minWidth: 250,
        height: 300,
        fontSize: 16,
        boxShadow: "0 0 20px 0px Gray",
      }}
    >
      <table>
        <tbody>
          <tr>
            <th>學號:</th>
            <td>{data.ID}</td>
          </tr>
          <tr>
            <th>時間:</th>
            <td> {data.time}</td>
          </tr>
          <tr>
            <th>地點:</th>
            <td>{data.location}</td>
          </tr>
          <tr>
            <th>備註:</th>
            <td>{data.info}</td>
          </tr>
        </tbody>
      </table>
      {data.founded === "True" ? (
        ""
      ) : checked ? (
        ""
      ) : (
        <Button onClick={showModal}>我已尋回學生證</Button>
      )}
      <Modal
        title="請輸入四位數確認碼"
        open={isModalOpen}
        onOk={handleOk}
        onCancel={handleCancel}
        style={{ top: "30%", width: "100px" }}
      >
        <Input.Password
          placeholder="input password"
          visibilityToggle={{
            visible: passwordVisible,
            onVisibleChange: setPasswordVisible,
          }}
          value={password}
          onChange={(e) => {
            setPassword(e.target.value);
          }}
        />
      </Modal>
    </StyledCard>
  );
  const bannerList = image;
  const [listNum, setListNum] = useState(0);
  const Next = () => {
    console.log("next");
    var num = listNum;
    if (num === bannerList.length - 1) {
      setListNum(0);
    } else {
      setListNum(num + 1);
    }
  };
  const Last = () => {
    console.log("last");
    var num = listNum;
    if (num === 0) {
      setListNum(bannerList.length - 1);
    } else {
      setListNum(num - 1);
    }
  };
  const MixCard = (
    <>
      <div
        style={{ display: "flex", flexDirection: "row", marginRight: "20px" }}
      >
        <Pic img={bannerList[listNum]} key={bannerList[listNum]}>
          <button onClick={Next}>
            <CaretLeftOutlined style={{ fontSize: "26px", color: "black" }} />
          </button>
          <button onClick={Last}>
            <CaretRightOutlined style={{ fontSize: "26px", color: "black" }} />
          </button>
        </Pic>
      </div>
    </>
  );

  const onChange = (key) => {
    if (key === "1") {
      return <>{Table2}</>;
    }
  };
  return (
    <Tabs
      onChange={onChange}
      type="card"
      items={[
        {
          label: "Card Info",
          key: "1",
          children: <>{Table2}</>,
        },
        {
          label: "Pictures",
          key: "2",
          children: <>{MixCard}</>,
        },
      ]}
    />
  );
};

export default Tab;
