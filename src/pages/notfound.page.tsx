import React from "react";
import { Button, Result } from "antd";
import useNavigateHook from "../hooks/useCustomNavigate";

const NotFoundPage: React.FC = () => {
  const { goTo } = useNavigateHook();
  return (
    <Result
      status="404"
      title="404"
      subTitle="Sorry, the page you visited does not exist."
      extra={
        <Button
          type="primary"
          className="bg-purple-500"
          onClick={() => {
            goTo("/");
          }}
        >
          Back Home
        </Button>
      }
    />
  );
};

export default NotFoundPage;
