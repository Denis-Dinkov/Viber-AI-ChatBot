import { useState } from "react";
import { DesktopOutlined, PieChartOutlined } from "@ant-design/icons";
import { Layout, Menu } from "antd";
const { Sider } = Layout;
import MessageModal from "../MessageModal";

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
  getItem("Send Message", "2", <DesktopOutlined />),
];

const SiderComponent = () => {
  const [isVisibleModal, setIsVisibleModal] = useState(false);

  const handleItemClick = (key) => {
    if (key === "2") {
      setIsVisibleModal(true);
    }
  };

  console.log(isVisibleModal);

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
        onClick={({ key }) => handleItemClick(key)}
      />
      <MessageModal
        show={isVisibleModal}
        handleClose={() => setIsVisibleModal(false)}
      />
    </Sider>
  );
};

export default SiderComponent;
