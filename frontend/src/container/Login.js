import styled from "styled-components";
import { Form, Input, Button, Row, Col, Divider, Typography } from "antd";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const navigate = useNavigate();
  const ToHome = () => {
    navigate("/home");
  };
  const Container = styled(Row)(() => ({
    width: "100vw",
    height: "100vh",
  }));
  const Logo = styled(Col)(() => ({
    height: "100vh",
    backgroundColor: "#c8d4ff",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    fontSize: "36px",
  }));
  const LoginButton = styled(Button)(() => ({
    backgroundColor: "#c8d4ff",
  }));
  return (
    <Container>
      <Logo span={12}>Logo</Logo>
      <Col span={12}>
        <Row justify="center" align="middle" style={{ height: "100vh" }}>
          <Col span={16}>
            <Form>
              <Form.Item name="username">
                <Typography>Email</Typography>
                <Input />
              </Form.Item>
              <Form.Item name="password">
                <Typography>Password</Typography>
                <Input.Password />
              </Form.Item>
              <Form.Item>
                <LoginButton htmlType="submit" block>
                  Login
                </LoginButton>
              </Form.Item>
            </Form>
            <Row justify="space-between">
              <Col>
                <a href="/">Register</a>
              </Col>
              <Col>
                <a href="/">Forget password?</a>
              </Col>
            </Row>
            <Divider />
            <Row
              style={{ display: "flex", flexDirection: "column", gap: "2vmin" }}
            >
              <Row justify="center">
                <Col span={24}>
                  <LoginButton block>Sign in with Google</LoginButton>
                </Col>
              </Row>
              <Row justify="center">
                <Col span={24}>
                  <LoginButton block onClick={() => ToHome()}>
                    Guest Login
                  </LoginButton>
                </Col>
              </Row>
            </Row>
          </Col>
        </Row>
      </Col>
    </Container>
  );
};

export default Login;
