import styled from "styled-components"
import { useState } from "react";
import { usePage } from "../container/hooks/useContext";
const Button = styled.button`
  width: 200px;
  height: 50px;
  background: transparent;
  border-radius: 3px;
  border: 2px solid palevioletred;
  color: palevioletred;
  margin: 1em 1em;
  padding: 0.25em 1em;
  font-size: 1.2em;

  &:hover {
    background: palevioletred;
    color: white;
    cursor: pointer;
  }
`;

const Container = styled.div`
  
  text-align: center;
  display: flex;
  flex-direction: column;
  align-items: center;
`

const BigButton =({mode})=>{
  const {setHome, setUpload} = usePage();
  const ToHome = () => {
    setHome(true);
  }
  const ToUpload = () => {
    setUpload(true);
  }
    return (
        <Container>
        {mode?
        <>
          <Button>尋找學生證</Button>
          <Button onClick={ToUpload}>拾獲學生證</Button>
        </>
        :<>
        <Button onClick={ToHome}>訪客登入</Button>
        <Button>學號登入</Button>
        </>}
      </Container>
    )

};

export default BigButton;