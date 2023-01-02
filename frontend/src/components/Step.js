import React, { useEffect, useState } from 'react';
import { Steps, ConfigProvider } from 'antd';

// const description = 'This is a description.';

const StepsBar = ({currentStep}) => {
  return (
  <ConfigProvider
    theme={{
      token: {
        colorPrimary: "#ba5370",
      },
    }}
  >
  <Steps
    style={{margin:'30px',width:'95%',position:'center'}}
    current={currentStep}
    items={[
      {
        title: 'Finished',
        description: "上傳學生證及相關照片",
      },
      {
        title: 'In Progress',
        description: "地圖定位",
        // subTitle: 'Left 00:00:08',
      },
      {
        title: 'Waiting',
        description: "填寫表單",
      },
    ]}
  /></ConfigProvider>
)}
export default StepsBar;