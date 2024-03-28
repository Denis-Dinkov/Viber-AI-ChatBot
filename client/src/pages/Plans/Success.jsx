import { useEffect } from "react";
import { useLocation } from "react-router-dom";
import { Button, Result } from "antd";

const Success = () => {
  const location = useLocation();
  const query = new URLSearchParams(location.search);
  const id = query.get("id");

  const handleRedirect = () => {
    window.location.href = "viber://pa?chatURI=test12312312312312312";
  };

  useEffect(() => {
    const checkSession = async () => {
      const res = await fetch(
        `http://localhost:3000/stripe/check-session?id=${id}`,
        {
          method: "GET",
        }
      );
      const data = await res.json();
      console.log(data);
    };

    checkSession();
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
        status="success"
        title={<span style={{ color: "black" }}>Success</span>}
        subTitle={
          <span style={{ color: "black" }}>Your payment was successful!</span>
        }
        extra={
          <Button type="primary" onClick={handleRedirect}>
            Back to Viber
          </Button>
        }
      />
    </div>
  );
};

export default Success;
