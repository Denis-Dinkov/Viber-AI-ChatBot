import { Table, Tag, Card, Avatar } from "antd";
import { useEffect, useState } from "react";
const columns = [
  {
    dataIndex: "avatar",
    key: "avatar",
    render: (avatar) => <Avatar size={36} src={avatar} key={Math.random()} />,
    width: "40px",
  },

  {
    title: "Name",
    dataIndex: "name",
    key: "name",
  },
  {
    title: "Subscriptions",
    dataIndex: "subscription",
    key: "subscription",
    render: (subscription) => {
      let color = subscription === "Free" ? "green" : "geekblue";
      return (
        <Tag color={color} key={subscription}>
          {subscription}
        </Tag>
      );
    },
  },
  {
    title: "Status",
    dataIndex: "status",
    key: "status",
  },
];

const UsersTable = () => {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    const fetchUsers = async () => {
      const response = await fetch(
        "http://localhost:3000/users?id=poxPTw8qu2TPGXlbK8aFUw=="
      );
      const res = await response.json();
      const users = res.map((user) => {
        return {
          key: user._id,
          avatar: user.avatar,
          name: user.name,
          subscription: user.subscription
            ? new Date(user.subscription).toLocaleString()
            : "Free",
          status: user.status ? "Active" : "Inactive",
        };
      });

      setUsers(users);
    };
    fetchUsers();
  }, []);

  return (
    <Card
      styles={{
        body: {
          padding: "8px 8px 8px 12px",
        },
      }}
    >
      <Table columns={columns} dataSource={users} />
    </Card>
  );
};

export default UsersTable;
