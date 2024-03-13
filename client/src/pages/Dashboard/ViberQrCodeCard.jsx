import { Card, Typography, Statistic, QRCode } from "antd";
import { AuditOutlined, ShopOutlined, TeamOutlined } from "@ant-design/icons";

const { Title, Paragraph, Text, Link } = Typography;

const ViberQrCodeCard = () => {
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
      <div
        style={{
          display: "flex",
          alignItems: "center",
          gap: "8px",
          whiteSpace: "nowrap",
        }}
      >
        <TeamOutlined />
        <Text strong className="secondary" style={{ marginLeft: "8px" }}>
          Users
        </Text>
      </div>
      <QRCode value={"https://www.google.com/" || "-"} size={64} />
    </Card>
  );
};

export default ViberQrCodeCard;
