import { Layout, theme } from "antd";

const { Content } = Layout;
import SiderComponent from "./sider";
import HeaderComponent from "./header";

const ProtectedLayout = ({ children, toggleTheme }) => {
  const {
    token: { colorBgContainer, borderRadiusLG },
  } = theme.useToken();
  return (
    <Layout style={{ height: "100vh" }}>
      <SiderComponent />
      <Layout>
        <HeaderComponent toggleTheme={toggleTheme} />
        <Content
          style={{
            margin: "24px 16px",
            padding: 24,
            minHeight: 280,
            background: colorBgContainer,
            borderRadius: borderRadiusLG,
          }}
        >
          {children}
        </Content>
      </Layout>
    </Layout>
  );
};
export default ProtectedLayout;
