import React from 'react';
import { Steps, ConfigProvider } from 'antd';
// const description = 'This is a description.';
const StepsBar = () => (
  <ConfigProvider
    theme={{
      token: {
        colorPrimary: '#00b96b',
      },
    }}
  >
  <Steps
    style={{margin:'30px',width:'95%',position:'center'}}
    current={1}
    items={[
      {
        title: 'Finished',
        description: "上傳學生證",
      },
      {
        title: 'In Progress',
        description: "填寫表單",
        subTitle: 'Left 00:00:08',
      },
      {
        title: 'Waiting',
        description: "確認",
      },
    ]}
  /></ConfigProvider>
);
export default StepsBar;