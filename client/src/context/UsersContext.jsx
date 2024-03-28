import { createContext, useEffect, useState } from "react";

const UsersContext = createContext();

const UsersProvider = ({ children }) => {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    const fetchUsers = async () => {
      const response = await fetch("http://localhost:3000/users");
      const res = await response.json();
      setUsers(res);
    };

    fetchUsers();
  }, []);

  return (
    <UsersContext.Provider value={users}>{children}</UsersContext.Provider>
  );
};

export { UsersProvider, UsersContext };
