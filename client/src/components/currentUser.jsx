import React from "react";

import { SettingOutlined } from "@ant-design/icons";
import { Button, Popover, Avatar } from "antd";
// import { AccountSettings } from "../account-settings";
import { UserOutlined } from "@ant-design/icons";

export const CurrentUser = () => {
  const [opened, setOpened] = React.useState(false);

  const content = (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
      }}
    >
      <p
        style={{
          padding: "8px 12px",
          fontWeight: "bold",
        }}
      >
        Gosho
      </p>
      <div
        style={{
          borderTop: "1px solid #d9d9d9",
          padding: "4px",
          display: "flex",
          flexDirection: "column",
          gap: "4px",
        }}
      >
        <Button
          style={{ textAlign: "left" }}
          icon={<SettingOutlined />}
          type="text"
          block
          onClick={() => setOpened(true)}
        >
          Account settings
        </Button>
      </div>
    </div>
  );

  return (
    <>
      <Popover
        placement="bottomRight"
        content={content}
        trigger="click"
        overlayInnerStyle={{ padding: 0 }}
        overlayStyle={{ zIndex: 999 }}
      >
        <Avatar
          size="medium"
          src="https://refine-crm.ams3.cdn.digitaloceanspaces.com/avatars/1.jpg"
          style={{ cursor: "pointer" }}
        />
      </Popover>
      {/* {user && (
        <AccountSettings
          opened={opened}
          setOpened={setOpened}
          userId={user.id}
        />
      )} */}
    </>
  );
};
