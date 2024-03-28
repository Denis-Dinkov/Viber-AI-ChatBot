import { Col, Row } from "antd";
import UsersTable from "./UsersTable";
import { useEffect, useState } from "react";

import DashboardCard from "./DashboardCard";
const Dashboard = () => {
  const [users, setUsers] = useState([]);

  const subscribedUsers = users.filter(
    (user) => user.stripe_details.active_subscription === true
  );
  const notSubscribedUsers = users.filter(
    (user) => user.stripe_details.active_subscription === false
  );

  useEffect(() => {
    const fetchUsers = async () => {
      const response = await fetch("http://localhost:3000/users");
      const res = await response.json();

      setUsers(res);
    };

    fetchUsers();
  }, []);

  return (
    <>
      <Row gutter={[32, 32]}>
        <Col xs={24} sm={24} xl={8}>
          <DashboardCard
            resource="allUsers"
            totalCount={users.length}
            data={users}
          />
        </Col>
        <Col xs={24} sm={24} xl={8}>
          <DashboardCard
            resource="subscribedUsers"
            data={subscribedUsers}
            totalCount={subscribedUsers.length}
          />
        </Col>
        <Col xs={24} sm={24} xl={8}>
          <DashboardCard
            resource="notSubscribedUsers"
            isLoading={false}
            totalCount={notSubscribedUsers.length}
            data={notSubscribedUsers}
          />
        </Col>
      </Row>
      <Row
        gutter={[32, 32]}
        style={{
          marginTop: "32px",
        }}
      >
        <Col xs={24} sm={24} xl={24}>
          <UsersTable usersData={users} />
        </Col>
      </Row>
    </>
  );
};

export default Dashboard;
