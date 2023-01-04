import React from 'react';
import ImgCrop from 'antd-img-crop';
import { InboxOutlined } from '@ant-design/icons';
import { message, Upload } from 'antd';
const { Dragger } = Upload;
const props = {
  maxCount: 3,
  name: 'file',
  accept: "image/png, image/jpeg, image/jpg,",
  multiple: true,
  action: 'http://localhost:4000/upload',
  listType: "picture-card",
  onDrop(e) {
    console.log('Dropped files', e.dataTransfer.files);
  },
  async onPreview(file)  {
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
    showDownloadIcon: true,
    showRemoveIcon: true,
  },
};
const Drag = ({imageList, setImageList}) => {
  const onChange = (info) => {
    const { status, response } = info.file;
    if (status !== 'uploading') {
      console.log(info.file, info.fileList);
    }
    if (status === 'done') {
      message.success(`${info.file.name} file uploaded successfully.`);
      const { id: id } = response;
      setImageList([...imageList, id]);
    } else if (status === 'error') {
      message.error(`${info.file.name} file upload failed.`);
    }
  }
  return(
    <ImgCrop rotate aspect={1.6/1}>
        <Dragger {...props} style={{height:"110px"}} onChange={onChange}>
            <p className="ant-upload-drag-icon">
            <InboxOutlined />
            </p>
            <p className="ant-upload-text">Click or drag picture to this area to upload</p>
            <p className="ant-upload-hint">
            The following file types can be uploaded: JPG, JPEG, PNG. Three pictures is the upper limit.
            </p>
        </Dragger>
    </ImgCrop>
)};
export default Drag;