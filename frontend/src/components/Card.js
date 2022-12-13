import { useState } from "react";
import { Carousel } from 'antd';


const Card = () => {
  const [bannerList, setBannerList] = useState(["./Pic/bear.jpg"]);
  return (
    <>
    <Carousel autoplay>
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
    </Carousel>
    <div style={{border: '2px solid palevioletred',
      width:'300px',height:'160px',margin:'50px 20px 0 40px',padding:'50px'}}></div>
    <div style={{border: '2px solid palevioletred',
      width:'200px',height:'160px',margin:'50px',padding:'50px'}}>
      拾獲資訊<br/>
      學號:R********<br/>
      拾獲地點:土木系<br/>
      備註:大門口右邊樹上 
    </div>
    </>
  )
}
  

export default Card