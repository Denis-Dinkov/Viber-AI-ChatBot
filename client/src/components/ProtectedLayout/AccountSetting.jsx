import { CloseOutlined } from "@ant-design/icons";
import { Button, Drawer, Typography } from "antd";
const { Text, Link } = Typography;

const AccountSettings = ({ opened, setOpened, userId }) => {
  const closeModal = () => {
    setOpened(false);
  };

  return (
    <Drawer
      onClose={closeModal}
      open={opened}
      width={756}
      styles={{
        body: { background: "#f5f5f5", padding: 0 },
        header: { display: "none" },
      }}
    >
      <div
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          padding: "16px",
          backgroundColor: "#fff",
        }}
      >
        <Text strong>Account Settings</Text>
        <Button
          type="text"
          icon={<CloseOutlined />}
          onClick={() => closeModal()}
        />
      </div>
      <div
        style={{
          padding: "16px",
        }}
      >
        {/* <Card>
          <Form {...formProps} layout="vertical">
            <CustomAvatar
              shape="square"
              src={avatarUrl}
              name={getNameInitials(name || "")}
              style={{
                width: 96,
                height: 96,
                marginBottom: "24px",
              }}
            />
            <Form.Item label="Name" name="name">
              <Input placeholder="Name" />
            </Form.Item>
            <Form.Item label="Email" name="email">
              <Input placeholder="email" />
            </Form.Item>
            <Form.Item label="Job title" name="jobTitle">
              <Input placeholder="jobTitle" />
            </Form.Item>
            <Form.Item label="Phone" name="phone">
              <Input placeholder="Timezone" />
            </Form.Item>
          </Form>
          <SaveButton
            {...saveButtonProps}
            style={{
              display: "block",
              marginLeft: "auto",
            }}
          />
        </Card> */}
      </div>
    </Drawer>
  );
};

export default AccountSettings;
