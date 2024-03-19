import { useLocation } from "react-router-dom";
import { Layout } from "antd";
import { useEffect } from "react";

const Plans = () => {
  const location = useLocation();
  const query = new URLSearchParams(location.search);
  const id = query.get("id"); // Get the id query parameter

  useEffect(() => {
    const createSession = async () => {
      const response = await fetch(
        `http://localhost:3000/stripe/create-session?id=${id}`,
        { method: "POST" }
      );
      const session = await response.json();
      console.log(session.url);
      window.location.href = session.url;
    };

    createSession();
  }, [id]);

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
      <h1>Loading...</h1>
    </Layout>
  );
};

export default Plans;
