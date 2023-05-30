import { Steps, ConfigProvider } from "antd";
const { Step } = Steps;

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
          height: "70%",
          paddingLeft: "5vmin",
        }}
        current={currentStep}
      >
        <Step
          style={{}}
          title={currentStep === 0 ? "In Progress" : "Finished"}
          description="上傳拾獲物品照片"
        />
        <Step
          title={
            currentStep === 1
              ? "In Progress"
              : currentStep === 0
              ? "Waiting"
              : "Finished"
          }
          description="地圖定位"
        />
        <Step
          title={
            currentStep === 2
              ? "In Progress"
              : currentStep === 3
              ? "Finished"
              : "Waiting"
          }
          description="填寫表單"
        />
      </Steps>
    </ConfigProvider>
  );
};
export default StepsBar;
