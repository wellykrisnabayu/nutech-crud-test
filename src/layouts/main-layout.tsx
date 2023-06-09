import { ConfigProvider } from "antd";
import React, { FC } from "react";
import { Outlet } from "react-router-dom";
const MainLayout: FC = () => {
  return (
    <ConfigProvider
      theme={{
        token: {
          colorPrimary: "#aa00ff",
        },
      }}
    >
      <div className="h-screen flex items-center justify-center overflow-scroll">
        <Outlet />
      </div>
    </ConfigProvider>
  );
};

export default MainLayout;
