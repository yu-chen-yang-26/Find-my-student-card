import styled from "styled-components"
import Title from "../components/Title";
import Button from "../components/Button";
import { useState } from "react";
const Wrapper = styled.div`
  top:150px;
  width: 300px;
  height: 400px;
  background-color: black;
  text-align: center;
}`
const Container = styled.div`
  
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  height: 100vh;
}`
const Login=({setHome})=> {
  
  return (
    <Container>
      <Wrapper>
        <Title />
        <Button setHome={setHome}/>
      </Wrapper>
    </Container>


  );
}

export default Login;