import { useState } from "react";
import {
  DesktopOutlined,
  FileOutlined,
  PieChartOutlined,
  TeamOutlined,
  UserOutlined,
} from "@ant-design/icons";
import { Layout, Menu, theme } from "antd";
const { Sider } = Layout;
function getItem(label, key, icon, children) {
  return {
    key,
    icon,
    children,
    label,
  };
}
const items = [
  getItem("Dashboard", "1", <PieChartOutlined />),
  getItem("Message", "2", <DesktopOutlined />),
];

const SiderComponent = () => {
  const {
    token: { colorBgContainer, borderRadiusLG },
  } = theme.useToken();

  return (
    <Sider
      breakpoint="lg"
      collapsedWidth="0"
      onBreakpoint={(broken) => {
        console.log(broken);
      }}
      onCollapse={(collapsed, type) => {
        console.log(collapsed, type);
      }}
    >
      <div
        className="demo-logo-vertical"
        style={{
          height: "32px",
          margin: "16px",
          background: "rgba(255, 255, 255, .2)",
          borderRadius: "6px",
          display: "flex",
          alignItems: "center",
        }}
      >
        <span
          style={{
            color: "white",
            marginLeft: "8px",
            // display: collapsed ? "none" : "block",
          }}
        >
          Logo
        </span>
      </div>
      <Menu
        theme="dark"
        defaultSelectedKeys={["1"]}
        mode="inline"
        items={items}
      />
    </Sider>
  );
};

export default SiderComponent;
