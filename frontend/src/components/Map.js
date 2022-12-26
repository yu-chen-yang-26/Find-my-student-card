import styled from "styled-components"
import Pic from "../Pic/東區.png";
const Map= styled.div`
  height: 400px;
  width: 700px;
  margin: 0 30px 0 20px;
  background-color: gray;
  border: 4px solid rgb(237,166,87);
  background-image: url(${props => props.img});
`;  
const map =()=> (
  <Map img={Pic}/>
)

export default map