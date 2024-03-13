import { Card, Statistic } from "antd";

import { ArrowUpOutlined } from "@ant-design/icons";

const BotUsersCard = () => {
  return (
    <Card
      styles={{
        body: {
          padding: "8px 8px 8px 12px",
        },
      }}
      size="small"
      style={{ height: "96px", padding: 0 }}
    >
      <Statistic
        title="Active Users"
        value={11.28}
        precision={2}
        valueStyle={{ color: "#3f8600" }}
        prefix={<ArrowUpOutlined />}
        suffix="%"
      />
    </Card>
  );
};

export default BotUsersCard;
