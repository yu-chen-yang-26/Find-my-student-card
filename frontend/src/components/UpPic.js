import React, { useEffect, useState } from 'react';
import { Upload } from 'antd';
import ImgCrop from 'antd-img-crop';
import styled from "styled-components";
const Wrapper = styled.div`
  width: 500px;
  border-radius: 3px;
  // border: 2px solid palevioletred;
  background-color: #F5F5F5;
  
`;
const UploadPic = ({component}) => {
  const [fileList, setFileList] = useState([
    {
      uid: '-1',
      name: 'image.png',
      status: 'done',
      url: 'https://zos.alipayobjects.com/rmsportal/jkjgkEfvpUPVyRjUImniVslZfWPnJuuZ.png',
    },
  ]);
  const onChange = ({ fileList: newFileList }) => {
    setFileList(newFileList);
    console.log(fileList);
  };
  const onPreview = async (file) => {
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
  };
  return (
    <Wrapper style={{position:"relative"}}>
        <ImgCrop rotate aspect={1.6/1}>
            <Upload
                style={{ width: 300 }}
                action={"http://localhost:4000/upload"}
                listType="picture-card"
                accept=".jpg, .png, .jpeg"
                // beforeUpload={(file)=>{
                //   console.log(file);
                //   // return false;
                // }}
                fileList={fileList}
                onChange={onChange}
                onPreview={onPreview}
            >
                + Upload 
            </Upload>
        </ImgCrop>
        {component}
    </Wrapper>
    
  );
};
export default UploadPic;