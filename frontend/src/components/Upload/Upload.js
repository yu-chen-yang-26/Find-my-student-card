import { UploadOutlined } from "@ant-design/icons";
import { Button, Upload } from "antd";
import ImgCrop from "antd-img-crop";
import { useTranslation } from "react-i18next";
import { useHooks } from "../../hook/useHooks";
const UploadImg = () => {
  const { t } = useTranslation();
  const { fileList, setFileList } = useHooks();
  const props = {
    maxCount: 1,
    name: "file",
    accept: "image/png, image/jpeg, image/jpg,",
    multiple: true,
    action:
      process.env.NODE_ENV === "production"
        ? "/api/upload"
        : "http://localhost:4000/api/upload",
    async onPreview(file) {
      let src = file.thumbUrl;
      if (!src) {
        src = await new Promise((resolve) => {
          const reader = new FileReader();
          reader.readAsDataURL(file.originFileObj);
          reader.onload = () => resolve(reader.result);
        });
      }
      const image = new Image();
      image.src = src;
      const imgWindow = window.open(src);
      imgWindow?.document.write(image.outerHTML);
    },
    showUploadList: {
      showRemoveIcon: true,
    },
  };

  const onChange = ({ fileList: newFileList }) => {
    console.log(newFileList);
    setFileList(newFileList);
  };
  return (
    <ImgCrop rotationSlider aspectSlider modalWidth={700}>
      <Upload {...props} fileList={fileList} onChange={onChange}>
        <Button icon={<UploadOutlined />}>{t("Click to Upload")}</Button>
      </Upload>
    </ImgCrop>
  );
};
export default UploadImg;
