import Sidebar from "./Sidebar";
import { Outlet } from "react-router-dom";
import "../styles/layout.css";
import "../styles/sidebar.css";

export default function Layout() {
  return (
    <div className="layout">
      <Sidebar />
      <main className="layout-content">
        <Outlet /> 
      </main>
    </div>
  );
}
