import React from "react";
import ImgCrop from "antd-img-crop";
import { InboxOutlined } from "@ant-design/icons";
import { message, Upload } from "antd";
const { Dragger } = Upload;
const props = {
  maxCount: 10,
  name: "file",
  accept: "image/png, image/jpeg, image/jpg,",
  multiple: true,
  action:
    process.env.NODE_ENV === "production"
      ? "/api/upload"
      : "http://localhost:4000/api/upload",
  listType: "picture-card",
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
const Drag = ({ imageList, setImageList }) => {
  const onChange = (info) => {
    const { status, response } = info.file;
    if (status === "done") {
      message.success(`${info.file.name} file uploaded successfully.`);
      const { id: id } = response;
      setImageList([...imageList, id]);
    } else if (status === "error") {
      message.error(`${info.file.name} file upload failed.`);
    }
  };
  return (
    <ImgCrop rotate aspect={1.6 / 1}>
      <Dragger {...props} style={{ height: "200px" }} onChange={onChange}>
        <p className="ant-upload-drag-icon">
          <InboxOutlined />
        </p>
        <p className="ant-upload-text">
          Click or drag picture to this area to upload
        </p>
        <p className="ant-upload-hint">
          The following file types can be uploaded: JPG, JPEG, PNG. Upload
          limites: 3 photos.
        </p>
      </Dragger>
    </ImgCrop>
  );
};
export default Drag;
