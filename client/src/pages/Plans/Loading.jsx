import { useLocation } from "react-router-dom";
import { useEffect } from "react";
import { Result } from "antd";
import { LoadingOutlined } from "@ant-design/icons";
import { Spin } from "antd";

const Loading = () => {
  const location = useLocation();
  const query = new URLSearchParams(location.search);
  const id = query.get("id");

  useEffect(() => {
    const createSession = async () => {
      const response = await fetch(
        `http://localhost:3000/stripe/create-session?id=${id}`,
        { method: "POST" }
      );
      const session = await response.json();
      window.location.href = session.url;
    };

    createSession();
  }, [id]);

  return (
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        height: "100vh",
      }}
    >
      <Result
        title={<span style={{ color: "black" }}>Redirecting</span>}
        subTitle={
          <span style={{ color: "black" }}>
            We are redirecting you to payment page.
          </span>
        }
        icon={
          <Spin indicator={<LoadingOutlined style={{ fontSize: 84 }} spin />} />
        }
      />
    </div>
  );
};

export default Loading;
