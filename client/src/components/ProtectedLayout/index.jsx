import { Layout, theme, ConfigProvider } from "antd";

const { Content } = Layout;
import SiderComponent from "./sider";
import HeaderComponent from "./header";
import useTheme from "../../hooks/useTheme.jsx";
import { useEffect } from "react";

const ProtectedLayout = ({ children }) => {
  const [currentTheme, toggleTheme] = useTheme();

  const {
    token: { colorBgContainer, borderRadiusLG },
  } = theme.useToken();
  return (
    <ConfigProvider
      theme={{
        algorithm:
          currentTheme === "dark"
            ? theme.darkAlgorithm
            : theme.defaultAlgorithm,
      }}
    >
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
    </ConfigProvider>
  );
};
export default ProtectedLayout;
