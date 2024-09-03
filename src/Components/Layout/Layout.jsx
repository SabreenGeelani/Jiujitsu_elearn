import { useState } from "react";
import { Navbar } from "../Navbar/Navbar";
import { Sidebar } from "../Sidebar/Sidebar";

import "./Layout.css";

export const Layout = ({ children, search, setSearch }) => {
  const [collapsed, setCollapsed] = useState(false);

  const handleToggle = () => {
    setCollapsed(!collapsed);
  };
  localStorage.removeItem("role");
  return (
    <>
      <div className="layout">
        <Navbar collapsed={collapsed} search={search} setSearch={setSearch} />
        <Sidebar collapsed={collapsed} handleToggle={handleToggle} />
        <main className={`content ${collapsed ? "collapsed" : ""}`}>
          {children}
        </main>
      </div>
    </>
  );
};
