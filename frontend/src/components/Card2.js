import styled, { css } from 'styled-components';
import Pic from "../Pic/bear.jpg";
import { Card } from 'antd';
import { EditOutlined, EllipsisOutlined, SettingOutlined } from '@ant-design/icons';

const verticalStyle = css`
  display: inline-flex;
  flex-direction: column;
`;

const horizontalStyle = css`
  display: flex;
`;

const horizontalReverseStyle = css`
  display: flex;
  flex-direction: row-reverse;
`;

const variantMap = {
    vertical: verticalStyle,
    horizontal: horizontalStyle,
    'horizontal-reverse': horizontalReverseStyle,
  };

const StyledCard = styled.div`
  border: 3px solid black;
  border-radius: 4px;
  overflow: hidden;

  ${(props) => variantMap[props.$variant] || variantMap.vertical}
`;

const Cover = styled.div`
  overflow: hidden;
  width: 300px;
  img {
    width: 100%;
    display: block;
  }
`;

const SpaceBetween = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
`;

const Card2 = ({
    className, cover, variant,
    children, footer, ...props
  }) => (
    <StyledCard  $variant='horizontal' >
      <Card 
        hoverable
        style={{ height: 250 }} className="card__cover" 
        cover={<img src={Pic}/>}
        actions={[
            <SettingOutlined key="setting" />,
            <EditOutlined key="edit" />,
            <EllipsisOutlined key="ellipsis" />,
        ]}></Card>
      <SpaceBetween>
        {children}
        {footer}
      </SpaceBetween>
    </StyledCard>
  );

export default Card2