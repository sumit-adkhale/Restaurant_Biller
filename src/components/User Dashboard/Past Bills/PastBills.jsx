import React from "react";
import { NavLink, Outlet } from "react-router-dom";

function PastBills() {
  return (
    <>
      <section className="pb-24 pt-10 bg-black">
        <div className="w-full max-w-7xl mx-auto px-4 md:px-8">
          <div className="main-data p-8 sm:p-14 bg-gray-600 rounded-3xl">
            <h2 className="text-center font-manrope font-semibold text-4xl text-black">
              Order History
            </h2>
            <nav className="py-2 text-2xl border-b-2 font-semibold flex justify-around">
              <NavLink to={"takeAways-past-bills"} style={(e) => {
                  return {
                    color: e.isActive ? "Orange" : ""
                  };
                }}>
                Take Away Bills
              </NavLink>
              <NavLink to={"dining-past-bills"} style={(e) => {
                  return {
                    color: e.isActive ? "Orange" : ""
                  };
                }}>
                Dining Bills
              </NavLink>
            </nav>
            <Outlet/>
          </div>
        </div>
      </section>
    </>
  );
}

export default PastBills;
