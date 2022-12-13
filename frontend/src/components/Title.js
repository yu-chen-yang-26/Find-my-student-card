import styled from "styled-components"
const Wrapper = styled.div`
    display: flex;
    justify-content: center;
    border: 5px solid palevioletred;
    margin: 15px;
    margin-bottom: 50px;
    h1 {
    font-size: 1.5em;
    margin: 10px ;
    color: palevioletred;
 }`;
const Title = () => (
    <Wrapper><h1>Find my student card</h1></Wrapper>
);
export default Title