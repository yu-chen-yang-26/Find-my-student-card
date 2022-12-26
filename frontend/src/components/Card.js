import { useState } from "react";
import { Carousel } from 'antd';
import long from "../Pic/長.png";
import Bear from "../Pic/bear.jpg";
import styled from "styled-components"
import Card2 from "./Card2";
import { Card } from 'antd';
const Table = styled.table`
  width: 500px;
  border-collapse: collapse;
  font-size: 1.5em;
 tr{
  border-bottom: solid 2px white;
}

 tr:last-child{
  border-bottom: none;
}

 th{
  position: relative;
  width: 30%;
  background-color: #7d7d7d;
  color: white;
  text-align: center;
  padding: 10px 0;
}

th:after{
  display: block;
  content: "";
  width: 0px;
  height: 0px;
  position: absolute;
  top:calc(50% - 10px);
  right:-10px;
  border-left: 10px solid #7d7d7d;
  border-top: 10px solid transparent;
  border-bottom: 10px solid transparent;
}

 td{
  text-align: left;
  width: 70%;
  text-align: center;
  background-color: #eee;
  padding: 10px 0;
}

 main {
  margin: 20px auto;
  item-align: center;
  width: 80%;
}
`
const Table2 = (
  <div className="site-card-border-less-wrapper">
    <Card
      title="拾獲資訊"
      bordered={false}
      style={{
        borderRadius: "0",
        width: 300,
        height: 250,
        fontSize: 20
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
    </Card>
  </div>
)

const MixCard = () => {
  const [bannerList, setBannerList] = useState([]);
  const Info = (
    <Table>
      <table>
        <thead>拾獲資訊</thead>
        <tbody>
          <tr>
            <th>學號</th>
            <td>R********</td>
          </tr>
          <tr>
            <th>拾獲地點</th>
            <td>土木系</td>
          </tr>
          <tr>
            <th>備註</th>
            <td>大門口右邊樹上</td>
          </tr>
        </tbody>
      </table>
    </Table>
  )
  return (
    <>
    {/* <Carousel autoplay>
      {bannerList.map((item, index)=>{
        return (
          
          <img
            src={item}
            alt=''
            style={{border: '2px solid palevioletred',
            width:'500px'}}
            />
        )
      })}
    </Carousel> */}
    
    {/* <div style={{border: '2px solid palevioletred',
      width:'200px',height:'160px',margin:'50px',padding:'50px'}}>
      拾獲資訊<br/>
      學號:R********<br/>
      拾獲地點:土木系<br/>
      備註:大門口右邊樹上 
    </div> */}
    
    <Card2 children={Table2}></Card2>
    </>
  )
}
  

export default MixCard