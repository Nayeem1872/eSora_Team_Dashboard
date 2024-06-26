import React from "react";

import Sidebar from "@/components/layout/sidebar";
import Content from "@/components/layout/content";

const Layout = ({ children }) => {
  return (
    <div className="flex h-[100vh]">
      <Sidebar />
      <Content>{children}</Content>
    </div>
  );
};

export default Layout;
