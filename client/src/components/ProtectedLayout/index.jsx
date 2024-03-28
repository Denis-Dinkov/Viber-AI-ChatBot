import { Layout, theme } from "antd";

const { Content } = Layout;
import SliderComponent from "./Slider";
import HeaderComponent from "./Header";

const ProtectedLayout = ({ children, toggleTheme, currentTheme }) => {
  const {
    token: { colorBgContainer, borderRadiusLG },
  } = theme.useToken();
  return (
    <Layout style={{ height: "100vh" }}>
      <SliderComponent />
      <Layout>
        <HeaderComponent
          toggleTheme={toggleTheme}
          currentTheme={currentTheme}
        />
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
