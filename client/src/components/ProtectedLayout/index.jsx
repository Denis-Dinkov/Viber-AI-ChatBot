import { Layout, theme } from "antd";

const { Content } = Layout;
import SiderComponent from "./sider";
import HeaderComponent from "./header";
import Dashboard from "../../pages/Dashboard/index.jsx";

const App = () => {
  const {
    token: { colorBgContainer, borderRadiusLG },
  } = theme.useToken();
  return (
    <Layout style={{ height: "100vh" }}>
      <SiderComponent />
      <Layout>
        <HeaderComponent />
        <Content
          style={{
            margin: "24px 16px",
            padding: 24,
            minHeight: 280,
            background: colorBgContainer,
            borderRadius: borderRadiusLG,
          }}
        >
          <Dashboard />
        </Content>
      </Layout>
    </Layout>
  );
};
export default App;
