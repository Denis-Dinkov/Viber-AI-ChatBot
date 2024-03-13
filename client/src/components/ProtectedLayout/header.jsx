import { useState } from "react";
import { MenuFoldOutlined, MenuUnfoldOutlined } from "@ant-design/icons";

import { Layout, Button, theme } from "antd";
import CurrentUser from "./currentUser";
const { Header } = Layout;

const HeaderComponent = () => {
  const [collapsed, setCollapsed] = useState(false);

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
      <CurrentUser />
    </Header>
  );
};

export default HeaderComponent;
