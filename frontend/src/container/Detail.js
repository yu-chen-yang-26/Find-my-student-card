import Card from "../components/Card";
import Background from "../components/Background";
import styled from "styled-components";
import Map from "../components/Map";
const Button = styled.button`
  width: 160px;
  height: 80px;
  background: transparent;
  border-radius: 3px;
  border: 2px solid palevioletred;
  color: palevioletred;
  margin: 1em 0 0 0;
//   padding: 0.25em 1em;
  font-size: 2em;

  &:hover {
    background: palevioletred;
    color: white;
    cursor: pointer;
  }
`;
const Detail = ({ setInfo }) => {
    return (
        <Background component={
            <>
              {/* <div style={{ height: '200px', width:"200px"}}/> */}
              <Map></Map>
              <Card />
              <Button style={{ margin: '20px',position:"absolute", right:"30%", bottom:"10px"}} >物歸原主</Button>
            </>} 
        setInfo={setInfo} />
    )
}

export default Detail