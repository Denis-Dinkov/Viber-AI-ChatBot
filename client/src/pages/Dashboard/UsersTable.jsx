import { Space, Table, Tag, Card, Avatar } from "antd";
import { useEffect, useState } from "react";
const columns = [
  {
    title: "Avatar",
    dataIndex: "avatar",
    key: "avatar",
    render: (avatar) => <Avatar size={32} src={avatar} />,
  },

  {
    title: "Name",
    dataIndex: "name",
    key: "name",
  },
  {
    title: "subscription",
    dataIndex: "subscription",
    key: "subscription",
  },
  {
    title: "status",
    dataIndex: "status",
    key: "status",
  },
];
const data = [
  {
    _id: {
      $oid: "65f4116c48552e05e3fade55",
    },
    uid: "vGBp+n/o9uOEB0up7+KK2A==",
    name: "Daniel Valchev",
    avatar: "https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png",
    subscription: "premium",
    isActive: true,
    isAdmin: false,
    __v: 0,
  },
];
const UsersTable = () => {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    const fetchUsers = async () => {
      const response = await fetch(
        "http://localhost:3000/users?id=poxPTw8qu2TPGXlbK8aFUw=="
      );
      const data = await response.json();
      setUsers(data);
    };
    fetchUsers();
  }, []);

  console.log(users);
  return (
    <Card
      styles={{
        body: {
          padding: "8px 8px 8px 12px",
        },
      }}
      size=""
    >
      <Table columns={columns} dataSource={data} />
    </Card>
  );
};

export default UsersTable;
