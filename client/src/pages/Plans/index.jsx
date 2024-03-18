import { useNavigate } from "react-router-dom";
import { Layout } from "antd";
import { useEffect } from "react";

const Plans = () => {
  useEffect(() => {
    const createSession = async () => {
      const response = await fetch(
        "http://localhost:3000/stripe/create-session",
        { method: "POST" }
      );
      const session = await response.json();
      window.location.href = session.url;
    };

    createSession();
  }, []);

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
