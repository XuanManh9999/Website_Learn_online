import React from "react";
import NavBarAdmin from "../../components/private/NavBarAdmin";
import { Outlet } from "react-router-dom";
function LayoutHomeAdmin() {
  return (
    <main
      style={{
        padding: "7px 10px",
      }}
    >
      <NavBarAdmin />
      <main>
        <Outlet />
      </main>
    </main>
  );
}

export default LayoutHomeAdmin;
