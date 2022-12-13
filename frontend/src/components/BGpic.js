import styled from "styled-components";
import MyImage from '../Pic/BG.png';

const Wrapper = styled.div`
    position: fixed;
    top: 0;
    left: 0;
    bottom: 0;
    right: 0;
    z-index: -999;
    
    img {
        min-height: 100%;
        width: 100%;
    }
`;

const BG =()=> (
        <Wrapper>
            <img src={MyImage} />
        </Wrapper>
)

export default BG