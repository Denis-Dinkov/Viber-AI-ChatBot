import { useEffect } from "react";
import { useLocation } from "react-router-dom";

const Success = () => {
  const location = useLocation();
  const query = new URLSearchParams(location.search);
  const id = query.get("id"); // Get the id query parameter

  // window.location.href = "viber://pa?chatURI=test12312312312312312";

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
  }, []);

  return (
    <div>
      <h1>Success</h1>
    </div>
  );
};

export default Success;
