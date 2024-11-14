import React from "react";
import NavBarAdmin from "../../components/private/NavBarAdmin";
import { Outlet } from "react-router-dom";
function LayoutHomeAdmin() {
  return (
    <>
      <NavBarAdmin />
      <main>
        <Outlet />
      </main>
    </>
  );
}

export default LayoutHomeAdmin;
