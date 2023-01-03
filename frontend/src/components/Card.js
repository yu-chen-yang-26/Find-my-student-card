import { useState } from "react";
import { Carousel,Card,Col  } from 'antd';
import { CaretRightOutlined, CaretLeftOutlined} from '@ant-design/icons';
import long from "../Pic/長.png";
import Bear from "../Pic/bear.jpg";
import NTU from "../Pic/NTU.jpg";
import galaxy from "../Pic/Galaxy.jpg";
import styled from "styled-components";
import Card2 from "./Card2";


const Pic = styled.div`
  height: 250px;
  width: 350px;
  // margin: 0 30px 0 0px;
  background-size: contain;
  border-radius: 10px 0px 0px 10px;
  box-shadow:0 0 20px 0px Gray;
  background-image: url(${props => props.img});
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: flex-end;
  @media (max-width: 1000px) {
    display:none;
  }
  button{
    cursor:pointer;
    height: 40px;
    width: 40px;
    border-color: transparent;
    background-color: transparent;
  }
`

const Button = styled.button`
  width: 100px;
  height: 45px;
  background: #f5af19;
  border-radius: 15px;
  border: 2px solid #FFD700;
  color: white;
  margin: 0.5em 0 0 0;
//   padding: 0.25em 1em;
  font-size: 1em;
  box-shadow: 6px 2px 5px 1px rgba(0, 0, 0, 0.2);

  &:hover {
    font-size: 1.2em;
    width: 120px;
    height: 50px;
    background: #FFD700;
    color: white;
    cursor: pointer;
    font-weight:bold;
  }
`;
const Table2 = (
  <div className="site-card-border-less-wrapper" style={{boxShadow:"0 0 20px 0px Gray"}}>
    <Card
      title="拾獲資訊"
      bordered={true}
      style={{
        borderRadius: "0",
        width: 300,
        height: 250,
        fontSize: 20,
      }}
    >
      <tr>
        <th>學號</th>
        <td>R********</td>
      </tr>
      <tr>
        <th>地點</th>
        <td>土木系</td>
      </tr>
      <tr>
        <th>備註</th>
        <td>大門口右邊樹上</td>
      </tr>
      <Button >物歸原主</Button>

    </Card>
  </div>
)

const MixCard = () => {
  const bannerList = [long,Bear,NTU,galaxy]
  const [listNum, setListNum] = useState(0);
  const Next = () => {
    var num = listNum
    if (num === bannerList.length-1){
      setListNum(0)
    }
    else{setListNum(num+1)}
  }
  const Last = () => {
    var num = listNum
    if (num === 0){
      setListNum(bannerList.length-1)
    }
    else{setListNum(num-1)}
  }
  
  return (
    <>
      <div style={{display:"flex", flexDirection: "row" ,marginRight:"20px",marginTop:"20px"}}>
        {/* <Col  xs={{ span: 0}}  md={{ span:3, offset:0}} lg={{ span:8, offset:0}} xl={{ span:13, offset:0}}> */}
          <Pic img={bannerList[listNum]} >
            <button onClick={Next}><CaretLeftOutlined style={{ fontSize: '26px', color: 'black' }}/></button>
            <button onClick={Last}><CaretRightOutlined style={{ fontSize: '26px', color: 'black' }}/></button>
          </Pic>
        {/* </Col> */}
        {Table2}
      </div>
    </>
  )
}
  

export default MixCard