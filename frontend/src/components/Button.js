import styled from "styled-components"
import { useNavigate } from 'react-router-dom'
import { notification } from 'antd';

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
  const navigate = useNavigate();
  const ToHome = () => {
    navigate('/home');
  }
  const ToUpload = () => {
    navigate('/upload/0');
  }
  const [api, contextHolder] = notification.useNotification();
  const openNotification = (placement) => {
    api.info({
      message: `Notification`,
      description:
        '抱歉，此功能暫不開放，請由訪客登入',
      placement,
      duration: 2,
    });
  };
    return (
      
        <Container>
          {contextHolder}
        {mode?
        <>
          <Button>尋找學生證</Button>
          <Button onClick={ToUpload}>拾獲學生證</Button>
        </>
        :<>
        <Button style={{fontSize: "1.5em"}} onClick={ToHome}>訪客登入</Button>
        <Button style={{fontSize: "1.5em"}} onClick={() => openNotification('top')}>學號登入</Button>
        </>}
      </Container>
    )

};

export default BigButton;