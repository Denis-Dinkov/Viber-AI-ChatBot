import { Col, Row } from "antd";
import UsersTable from "./UsersTable";

import DashboardCard from "./DashboardCard";
const Dashboard = () => {
  return (
    <>
      <Row gutter={[32, 32]}>
        <Col xs={24} sm={24} xl={8}>
          <DashboardCard
            resource="contacts"
            isLoading={false}
            totalCount={40}
          />
        </Col>
        <Col xs={24} sm={24} xl={8}>
          <DashboardCard
            resource="contacts"
            isLoading={false}
            totalCount={40}
          />
        </Col>
        <Col xs={24} sm={24} xl={8}>
          <DashboardCard resource="deals" isLoading={false} totalCount={40} />
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
