import { UploadOutlined } from "@ant-design/icons";
import { Button, Upload } from "antd";
import { useState } from "react";
import ImgCrop from "antd-img-crop";

const UploadImg = () => {
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
  const [fileList, setFileList] = useState([]);

  const onChange = ({ fileList: newFileList }) => {
    setFileList(newFileList);
  };
  return (
    <ImgCrop rotationSlider aspectSlider modalWidth={700}>
      <Upload
        {...props}
        action="https://www.mocky.io/v2/5cc8019d300000980a055e76"
        fileList={fileList}
        onChange={onChange}
      >
        <Button icon={<UploadOutlined />}>Click to Upload</Button>
      </Upload>
    </ImgCrop>
  );
};
export default UploadImg;
