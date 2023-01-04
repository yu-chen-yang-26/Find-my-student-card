import React, { useEffect, useState } from 'react';
import { Steps, ConfigProvider } from 'antd';

// const description = 'This is a description.';

const StepsBar = ({currentStep}) => {
  return (
  <ConfigProvider
    theme={{
      token: {
        colorPrimary: "#ba5370", //#ba5370
      },
    }}
  >
  <Steps
    style={{top:'10px',width:'95%',position:'relative',height:"50px" }}
    current={currentStep}
    items={[
      {
        title: currentStep === 0? 'In Progress':'Finished',
        description: "上傳學生證及相關照片",
      },
      {
        title: currentStep === 1? 'In Progress': currentStep === 0? 'Waiting': 'Finished',
        description: "地圖定位",
        // subTitle: 'Left 00:00:08',
      },
      {
        title: currentStep === 2? 'In Progress': currentStep === 3? 'Finished': 'Waiting',
        description: "填寫表單",
      },
    ]}
  /></ConfigProvider>
)}
export default StepsBar;