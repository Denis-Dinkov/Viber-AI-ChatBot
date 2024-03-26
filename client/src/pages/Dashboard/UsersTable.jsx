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
    title: "Start Date",
    dataIndex: "start_date",
    key: "start_date",
    render: (start_date) => {
      return start_date
        ? new Date(start_date).toLocaleDateString("bg-BG")
        : "N/A";
    },
  },
  {
    title: "End Date",
    dataIndex: "end_date",
    key: "end_date",
    render: (end_date) => {
      return end_date ? new Date(end_date).toLocaleDateString("bg-BG") : "N/A";
    },
  },
];

const UsersTable = () => {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    const fetchUsers = async () => {
      const response = await fetch("http://localhost:3000/users");
      const res = await response.json();
      const users = res.map((user) => {
        return {
          key: user._id,
          avatar: user.avatar,
          name: user.name,
          subscription: user.stripe_details.active_subscription
            ? "Premium"
            : "Free",
          start_date: user.stripe_details.start_date,
          end_date: user.stripe_details.end_date,
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
