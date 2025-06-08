import React from "react";
import DashboardHeader from "../DashboardHeader";
import AdminNavbar from "../Admin Dashboard/AdminNavbar";
import { Outlet } from "react-router-dom";

function Admin() {
  return (
    <>
      <DashboardHeader />
      <div className="mt-5 flex relative">
        <AdminNavbar/>
        <div className="w-full">
          <Outlet context={"adminUse"} />
        </div>
      </div>
    </>
  );
}

export default Admin;
