import { AuditOutlined, ShopOutlined, TeamOutlined } from "@ant-design/icons";
import { Area } from "@ant-design/plots";
import { Card, Typography } from "antd";
import IconWrapper from "../../components/IconWrapper";

const DashboardCard = ({ resource, data, totalCount }) => {
  const { Text, Title } = Typography;
  const { primaryColor, secondaryColor, icon, title } = variants[resource];

  const config = {
    appendPadding: [1, 0, 0, 0],
    padding: 0,
    syncViewPadding: true,
    data: data,
    autoFit: true,
    tooltip: false,
    animation: false,
    xField: "_id",
    yField: "name",
    xAxis: false,
    yAxis: {
      tickCount: 12,
      label: {
        style: {
          fill: "transparent",
        },
      },
      grid: {
        line: {
          style: {
            stroke: "transparent",
          },
        },
      },
    },
    smooth: true,
    areaStyle: () => {
      return {
        fill: `l(270) 0:#fff 0.2:${secondaryColor} 1:${primaryColor}`,
      };
    },
    line: {
      color: primaryColor,
    },
  };

  return (
    <Card
      style={{ height: "96px", padding: 0 }}
      styles={{
        body: {
          padding: "8px 8px 8px 12px",
        },
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
        {icon}
        <Text level={5} style={{ marginLeft: "8px" }}>
          {title}
        </Text>
      </div>
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
        }}
      >
        <Title
          level={1}
          strong
          style={{
            flex: 1,
            whiteSpace: "nowrap",
            flexShrink: 0,
            textAlign: "start",
            marginLeft: "48px",
            fontVariantNumeric: "tabular-nums",
          }}
        >
          {totalCount}
        </Title>
        <Area
          {...config}
          style={{
            height: "53px",
            width: "70%",
          }}
        />
      </div>
    </Card>
  );
};

const variants = {
  allUsers: {
    primaryColor: "#1677FF",
    secondaryColor: "#BAE0FF",
    icon: (
      <IconWrapper color="#E6F4FF">
        <ShopOutlined
          className="md"
          style={{
            color: "#1677FF",
          }}
        />
      </IconWrapper>
    ),
    title: "Total users",
  },
  subscribedUsers: {
    primaryColor: "#52C41A",
    secondaryColor: "#D9F7BE",
    icon: (
      <IconWrapper color="#F6FFED">
        <TeamOutlined
          className="md"
          style={{
            color: "#52C41A",
          }}
        />
      </IconWrapper>
    ),
    title: "Subscribed users",
  },
  notSubscribedUsers: {
    primaryColor: "#FA541C",
    secondaryColor: "#FFD8BF",
    icon: (
      <IconWrapper color="#FFF2E8">
        <AuditOutlined
          className="md"
          style={{
            color: "#FA541C",
          }}
        />
      </IconWrapper>
    ),
    title: "Not subscribed users",
  },
};

export default DashboardCard;
