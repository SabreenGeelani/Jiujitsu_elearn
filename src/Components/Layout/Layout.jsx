import { useState } from "react";
import { Navbar } from "../Navbar/Navbar";
import { Sidebar } from "../Sidebar/Sidebar";

import "./Layout.css";

export const Layout = ({ children }) => {
  const [collapsed, setCollapsed] = useState(false);

  const handleToggle = () => {
    setCollapsed(!collapsed);
  };
  localStorage.removeItem("role");
  return (
    <>
      <div className="layout">
        <Navbar collapsed={collapsed} />
        <Sidebar collapsed={collapsed} handleToggle={handleToggle} />
        <main className={`content ${collapsed ? "collapsed" : ""}`}>
          {children}
        </main>
      </div>
    </>
  );
};
