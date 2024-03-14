import { AuditOutlined, ShopOutlined, TeamOutlined } from "@ant-design/icons";
import { Card, Skeleton, Typography, QRCode } from "antd";

const { Text, Title } = Typography;

const ViberQrCodeCard = ({ resource, isLoading, totalCount }) => {
  return (
    <Card
      style={{ height: "96px", padding: 0 }}
      bodyStyle={{
        padding: "8px 8px 8px 12px",
      }}
      size="small"
    >
      <div
        style={{
          display: "flex",
          alignItems: "center",
          gap: "8px",
          whiteSpace: "nowrap",
        }}
      >
        <AuditOutlined />
        <Text level={5} style={{ marginLeft: "8px" }}>
          Viber Bot
        </Text>
      </div>
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
        }}
      >
        <Title
          level={2}
          strong
          style={{
            flex: 1,
            whiteSpace: "nowrap",
            flexShrink: 0,
            textAlign: "start",
            fontVariantNumeric: "tabular-nums",
          }}
        >
          Bot Qr
        </Title>
        <QRCode value="https://ant.design/" size={80} />
      </div>
    </Card>
  );
};

export default ViberQrCodeCard;
