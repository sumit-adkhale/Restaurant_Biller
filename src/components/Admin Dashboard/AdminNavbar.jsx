import React from 'react';
import { NavLink } from 'react-router-dom';

function AdminNavbar() {
  return (
    <div className='flex mx-3 z-10 flex-col gap-2 w-[17vw] justify-center h-[80%] sticky top-0 overflow-y-auto  text-white'>
      <NavLink style={(e) => {
                  return {
                    borderLeftColor: e.isActive ? "orange" : "",
                    borderLeftWidth: e.isActive ? "10px" : "",
                  };
                }} to="reports" className="px-7 all-ease duration-500 py-5 border-b bg-gray-900 text-white">Reports</NavLink>
      <NavLink style={(e) => {
        return {
          borderLeftColor: e.isActive ? "orange" : "",
          borderLeftWidth: e.isActive ? "10px" : "",
        };
      }} to="past-takeaway-orders" className="px-7 all-ease duration-500 py-5 border-b bg-gray-900 text-white">Past Take Aways</NavLink>
      <NavLink style={(e) => {
        return {
                    borderLeftColor: e.isActive ? "orange" : "",
                    borderLeftWidth: e.isActive ? "10px" : "",
                  };
                }} to="past-dining" className="px-7 all-ease duration-500 py-5 border-b bg-gray-900 text-white">Past Dining</NavLink>
      <NavLink style={(e) => {
                  return {
                    borderLeftColor: e.isActive ? "orange" : "",
                    borderLeftWidth: e.isActive ? "10px" : "",
                  };
                }} to="analysis" className="px-7 border-b all-ease duration-500 py-5 bg-gray-900 text-white">Analysis & Tgt</NavLink>
<NavLink style={(e) => {
            return {
              borderLeftColor: e.isActive ? "orange" : "",
              borderLeftWidth: e.isActive ? "10px" : "",
            };
          }} to="user-settings" className="px-7 all-ease duration-500 py-5 border-b bg-gray-900 text-white">User Settings</NavLink>
    </div>
  );
}

export default AdminNavbar;
