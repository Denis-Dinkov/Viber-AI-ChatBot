import { MoonOutlined, SunOutlined } from "@ant-design/icons";
import { Layout, Button, theme } from "antd";
import CurrentUser from "./CurrentUser";
const { Header } = Layout;

const HeaderComponent = ({ toggleTheme, currentTheme }) => {
  const {
    token: { colorBgContainer },
  } = theme.useToken();

  return (
    <Header
      style={{
        background: colorBgContainer,
        display: "flex",
        justifyContent: "flex-end",
        alignItems: "center",
        padding: "0px 24px",
        height: "64px",
        position: "sticky",
        top: 0,
        zIndex: 999,
      }}
    >
      <Button
        style={{ marginRight: "1rem" }}
        type="text"
        icon={currentTheme === "dark" ? <SunOutlined /> : <MoonOutlined />}
        onClick={() => toggleTheme()}
      />
      <CurrentUser />
    </Header>
  );
};

export default HeaderComponent;
