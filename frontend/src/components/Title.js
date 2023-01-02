import styled from "styled-components"
const Wrapper = styled.div`
    display: flex;
    justify-content: center;
    border: 5px solid palevioletred;
    margin: 30px;
    margin-bottom: 20px;
    h1 {
    font-size: 2em;
    margin: 10px ;
    color: palevioletred;

 }`;
const Title = () => (
    <Wrapper><h1>Find my student card</h1></Wrapper>
);
export default Title