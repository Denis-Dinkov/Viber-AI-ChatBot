import { Col, Row } from "antd";
import BotUsersCard from "./BotUsersCard";
import ViberQrCodeCard from "./ViberQrCodeCard";
import UsersTable from "./UsersTable";
const Dashboard = () => {
  return (
    <>
      <Row gutter={[32, 32]}>
        <Col xs={24} sm={24} xl={8}>
          <ViberQrCodeCard />
        </Col>
        <Col xs={24} sm={24} xl={8}>
          <BotUsersCard resource="contacts" isLoading={false} totalCount={40} />
        </Col>
        <Col xs={24} sm={24} xl={8}>
          <h1>Dashboard</h1>
        </Col>
      </Row>
      <Row
        gutter={[32, 32]}
        style={{
          marginTop: "32px",
        }}
      >
        <Col xs={24} sm={24} xl={24}>
          <UsersTable />
        </Col>
      </Row>
    </>
  );
};

export default Dashboard;
