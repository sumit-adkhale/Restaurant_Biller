import React, { useEffect, useState } from "react";
import { Route, Routes, Navigate } from "react-router-dom";
import Login from "./Dashboards/Login";
import Admin from "./Dashboards/Admin";
import User from "./Dashboards/User";
import ProtectiveRoute from "./Auth/ProtectiveRoute";
import PageNotFound from "./PageNotFound";
import Dining from "./User Dashboard/Dining/Dining";
import TakeAway from "./User Dashboard/TakeAway/TakeAway";
import Menu from "./User Dashboard/Menu";
import PastBills from "./User Dashboard/Past Bills/PastBills";
import Reports from "./User Dashboard/Reports";
import TableSettings from "./User Dashboard/TableSetting/TableSettings";
import FoodSettings from "./User Dashboard/FoodSetting/FoodSettings";
import EditTable from "./User Dashboard/TableSetting/EditTable";
import EditFood from "./User Dashboard/FoodSetting/EditFood";
import AddTakeAway from "./User Dashboard/TakeAway/AddTakeAway";
import BillingSummery from "./User Dashboard/Billing/BillingSummery";
import Payment from "./User Dashboard/Billing/Payment";
import Cash from "./User Dashboard/Billing/Cash";
import UPI from "./User Dashboard/Billing/UPI";
import CardPayment from "./User Dashboard/Billing/CardPayment";
import KOTprint from "./User Dashboard/KOT/KOTprint";
import RePrintKOT from "./User Dashboard/KOT/RePrintKOT";
import EditTakeAway from "./User Dashboard/TakeAway/EditTakeAway";
import AddDining from "./User Dashboard/Dining/AddDining";
import DiningKOTPrint from "./User Dashboard/KOT/DiningKOTPrint";
import DiningRePrint from "./User Dashboard/KOT/DiningRePrint";
import DiningBillingSummery from "./User Dashboard/Billing/DiningBillingSummery";
import EditDining from "./User Dashboard/Dining/EditDining";
import TakeAwayPastBills from "./User Dashboard/Past Bills/TakeAwayPastBills";
import DiningPastBills from "./User Dashboard/Past Bills/DiningPastBills";
import UserSettings from "./Admin Dashboard/UserSettings";
import Analysis from "./Admin Dashboard/Analysis";

function Routers() {
  const [position, setPosition] = useState(localStorage.getItem("position"));

  // Listen for changes in localStorage
  useEffect(() => {
    const handleStorageChange = () =>
      setPosition(localStorage.getItem("position"));
    window.addEventListener("storage", handleStorageChange);

    return () => window.removeEventListener("storage", handleStorageChange);
  }, []);

  return (
    <Routes>
      {/* Public Routes */}
      <Route
        path="/"
        element={
          position === "admin" ? (
            <Navigate to="/admin" />
          ) : position === "user" ? (
            <Navigate to="/user" />
          ) : (
            <Navigate to="/login" />
          )
        }
      />
      <Route
        path="/login"
        element={
          position === "admin" ? (
            <Navigate to="/admin" />
          ) : position === "user" ? (
            <Navigate to="/user" />
          ) : (
            <Login />
          )
        }
      />

      {/* Protected Routes */}
      <Route path="/admin" element={<ProtectiveRoute allowedRole="admin" />}>
        <Route path="/admin" element={<Admin />}>
          <Route index element={<Reports />} />
          <Route path="reports" element={<Reports />} />
          <Route path="user-settings" element={<UserSettings />} />
          <Route
            path="past-takeaway-orders"
            element={<TakeAwayPastBills admin={true} />}
          />
          <Route path="OrderSummery/:id" element={<BillingSummery admin={true} />} />
          <Route
            path="past-dining"
            element={<DiningPastBills admin={true} />}
          />
          <Route
            path="DiningBillingSummery/:id"
            element={<DiningBillingSummery admin={true}/>}
          />
          <Route path="analysis" element={<Analysis/>} />
        </Route>
      </Route>

      <Route path="/user" element={<ProtectiveRoute allowedRole="user" />}>
        <Route path="" element={<User />}>
          {/* Nested Routes */}
          <Route index element={<Dining />} />
          <Route path="take-away" element={<TakeAway />} />
          <Route path="menu" element={<Menu />} />
          <Route path="reports" element={<Reports />} />
          <Route path="past-bills" element={<PastBills />}>
            <Route
              index
              element={<Navigate to="takeAways-past-bills" replace />}
            />
            <Route
              path="takeAways-past-bills"
              element={<TakeAwayPastBills />}
            />
            <Route path="dining-past-bills" element={<DiningPastBills />} />
          </Route>
          <Route path="table-settings" element={<TableSettings />} />
          <Route path="food-settings" element={<FoodSettings />} />
        </Route>
        <Route path="addDining/:id" element={<AddDining />} />
        <Route path="editDining/:id" element={<EditDining />} />
        <Route path="DiningKOT/:id" element={<DiningKOTPrint />} />
        <Route path="DiningReKOT/:id" element={<DiningRePrint />} />
        <Route
          path="DiningBillingSummery/:id"
          element={<DiningBillingSummery />}
        >
          <Route index element={<Cash />} />
          <Route path="cash" element={<Cash />} />
          <Route path="UPI" element={<UPI />} />
          <Route path="cardPayment" element={<CardPayment />} />
        </Route>
        <Route path="EditTable/:id" element={<EditTable />} />
        <Route path="EditFood/:id" element={<EditFood />} />
        <Route path="KOT/:id" element={<KOTprint />} />
        <Route path="re-printKOT/:id" element={<RePrintKOT />} />
        <Route path="add-take-away" element={<AddTakeAway />} />
        <Route path="edit-take-away/:id" element={<EditTakeAway />} />
        <Route path="OrderSummery/:id" element={<BillingSummery />}>
          <Route index element={<Cash />} />
          <Route path="cash" element={<Cash />} />
          <Route path="UPI" element={<UPI />} />
          <Route path="cardPayment" element={<CardPayment />} />
        </Route>
      </Route>

      {/* Redirect for unknown routes */}
      <Route path="*" element={<PageNotFound />} />
    </Routes>
  );
}

export default Routers;
