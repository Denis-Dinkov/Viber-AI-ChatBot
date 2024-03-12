import { Popover, Button } from "antd";
import CustomAvatar from "./customAvatar";
import { useGetIdentity } from "@refinedev/core";

import type { User } from "@/graphql/schema.types";

const CurrentUser = () => {
  const { data: user } = useGetIdentity<User>();

  return (
    <>
      <Popover
        placement="bottomRight"
        trigger="click"
        overlayInnerStyle={{ padding: 0 }}
        overlayStyle={{ zIndex: 1000 }}
      >
        <CustomAvatar />
      </Popover>
    </>
  );
};

export default CurrentUser;
