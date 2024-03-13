import { Layout, Space, theme, Row, Col } from "antd";

const { useToken } = theme;

const Login = () => {
  const { token } = useToken();

  return (
    <Layout>
      <Row
        justify="center"
        align="middle"
        style={{
          padding: "16px 0",
          minHeight: "100dvh",
          paddingTop: "16px",
        }}
      >
        <Col xs={22}></Col>
      </Row>
    </Layout>
  );
};

export default Login;
