import { Steps, ConfigProvider } from "antd";
const StepsBar = ({ currentStep }) => {
  return (
    <ConfigProvider
      theme={{
        token: {
          colorPrimary: "#c8d4ff",
        },
      }}
    >
      <Steps
        direction="vertical"
        style={{
          width: "100%",
          height: "60%",
        }}
        current={currentStep}
        items={[
          {
            title: currentStep === 0 ? "In Progress" : "Finished",
            description: "上傳拾獲物品照片",
          },
          {
            title:
              currentStep === 1
                ? "In Progress"
                : currentStep === 0
                ? "Waiting"
                : "Finished",
            description: "地圖定位",
          },
          {
            title:
              currentStep === 2
                ? "In Progress"
                : currentStep === 3
                ? "Finished"
                : "Waiting",
            description: "填寫表單",
          },
        ]}
      />
    </ConfigProvider>
  );
};
export default StepsBar;
