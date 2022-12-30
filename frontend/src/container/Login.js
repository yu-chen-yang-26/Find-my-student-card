import styled from "styled-components"
import Title from "../components/Title";
import Button from "../components/Button";
import Pic from "../Pic/NTU.jpg";

import { useState } from "react";
const Wrapper = styled.div`
  top:100px;
  margin: 100px;
  width: 450px;
  height: 150px;
  border-radius: 15px;
  transition-duration:1.2s;
  opacity: 0.6;
  cursor: pointer;
  text-align: center;
  button{
    display: none;
  }
  Title{
    opacity: 1;
  }
  &:hover {
    opacity: 0.9;
    height: 350px;
    background-color: black;
  }
  &:hover button{
    display: block;
  }
}`
const Container = styled.div`
  
  display: flex;
  flex-direction: column;
  // justify-content: center;
  align-items: center;
  height: 100vh;
  background-image: url(${Pic});
  background-size: cover;
  background-position: center bottom; //預設圖片左上方
}`
const Login=()=> {
  return (
    <Container>
      <Wrapper>
        <Title />
        <Button/>
      </Wrapper>
    </Container>


  );
}

export default Login;