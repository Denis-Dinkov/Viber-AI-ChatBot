import {
  EditOutlined,
  EllipsisOutlined,
  SettingOutlined,
} from "@ant-design/icons";
import { Avatar, Card, Col, Row, Layout } from "antd";
import PlanCard from "./PlanCard";

const { Meta } = Card;

const Plans = () => {
  return (
    <Layout
      style={{
        padding: 24,
        minHeight: 280,
        height: "100vh",
        display: "flex", // Add this
        alignItems: "center", // Add this
        justifyContent: "center", // Add this
      }}
    >
      <Row gutter={[192, 192]} justify="center" align="middle">
        <Col xs={24} sm={24} xl={8}>
          <PlanCard />
        </Col>
        <Col xs={24} sm={24} xl={8}>
          <PlanCard />
        </Col>
        <Col xs={24} sm={24} xl={8}>
          <PlanCard />
        </Col>
      </Row>
    </Layout>
  );
};

export default Plans;
