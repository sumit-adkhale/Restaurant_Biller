import React, { useEffect, useState } from "react";
import { MdOutlineDinnerDining } from "react-icons/md";
import { PiPackageDuotone } from "react-icons/pi";
import { BiFoodMenu } from "react-icons/bi";
import { Link, NavLink, useLocation, useNavigate } from "react-router-dom";
import { RiBillLine } from "react-icons/ri";
import { MdOutlineSettingsSuggest } from "react-icons/md";
import { TbReportAnalytics } from "react-icons/tb";
import { IoIosArrowDropdown } from "react-icons/io";
import { MdOutlineTableBar } from "react-icons/md";
import { MdOutlineFoodBank } from "react-icons/md";

function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [dropdown, setDropdown] = useState(true);
  useEffect(() => {
    setDropdown(true); 
  }, [window.location.pathname])

  const navigate = useNavigate()
  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };
  const toggleDropDown = () => {
    setDropdown(!dropdown);
  };
  const location = useLocation();
  const settingsActive =
    location.pathname === "/user/table-settings" ||
    location.pathname === "/user/food-settings";
  return (
    <nav className="bg-white z-10 border-gray-200 dark:bg-gray-900 sticky top-0">
      <div className="max-w-screen-xl flex flex-wrap items-center justify-between mx-auto p-4">
        <button
          onClick={toggleMenu}
          type="button"
          className="inline-flex items-center p-2 w-10 h-10 justify-center text-sm text-gray-500 rounded-lg md:hidden hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200 dark:text-gray-400 dark:hover:bg-gray-700 dark:focus:ring-gray-600"
          aria-controls="navbar-default"
          aria-expanded={isMenuOpen}
        >
          <span className="sr-only">Open main menu</span>
          <svg
            className="w-5 h-5"
            aria-hidden="true"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 17 14"
          >
            <path
              stroke="currentColor"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M1 1h15M1 7h15M1 13h15"
            />
          </svg>
        </button>
        <div
          className={`${
            isMenuOpen ? "block" : "hidden"
          } w-full md:block md:w-auto`}
          id="navbar-default"
        >
          <ul className="font-medium flex flex-col p-4 md:p-0 mt-4 border border-gray-100 rounded-lg bg-gray-50 md:flex-row md:space-x-8 rtl:space-x-reverse md:mt-0 md:border-0 md:bg-white dark:bg-gray-800 md:dark:bg-gray-900 dark:border-gray-700">
            <li>
              <NavLink
                style={(e) => {
                  return {
                    color: e.isActive ? "red" : "",
                  };
                }}
                end
                className="flex gap-2 py-2 px-3 text-gray-900 rounded-sm hover:bg-gray-100 md:hover:bg-transparent md:border-0 md:hover:text-blue-700 md:p-0 dark:text-white md:dark:hover:text-blue-500 dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent"
                to="/user"
                aria-current="page"
              >
                <span className="text-2xl">
                  <MdOutlineDinnerDining />
                </span>
                <span>Dining</span>
              </NavLink>
            </li>
            <li>
              <NavLink
                style={(e) => {
                  return {
                    color: e.isActive ? "red" : "",
                  };
                }}
                to={"take-away"}
                className="flex gap-2 py-2 px-3 text-gray-900 rounded-sm hover:bg-gray-100 md:hover:bg-transparent md:border-0 md:hover:text-blue-700 md:p-0 dark:text-white md:dark:hover:text-blue-500 dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent"
              >
                <span className="text-2xl">
                  <PiPackageDuotone />
                </span>
                <span>Take Away</span>
              </NavLink>
            </li>
            <li>
              <NavLink
                style={(e) => {
                  return {
                    color: e.isActive ? "red" : "",
                  };
                }}
                to={"menu"}
                className="flex gap-2 py-2 px-3 text-gray-900 rounded-sm hover:bg-gray-100 md:hover:bg-transparent md:border-0 md:hover:text-blue-700 md:p-0 dark:text-white md:dark:hover:text-blue-500 dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent"
              >
                <span className="text-2xl">
                  <BiFoodMenu />
                </span>
                <span>Menu Card</span>
              </NavLink>
            </li>
            <li>
              <NavLink
                style={(e) => {
                  return {
                    color: e.isActive ? "red" : "",
                  };
                }}
                to={"reports"}
                className="flex gap-2 py-2 px-3 text-gray-900 rounded-sm hover:bg-gray-100 md:hover:bg-transparent md:border-0 md:hover:text-blue-700 md:p-0 dark:text-white md:dark:hover:text-blue-500 dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent"
              >
                <span className="text-2xl">
                  <TbReportAnalytics />
                </span>
                <span>Reports</span>
              </NavLink>
            </li>
            <li>
              <NavLink
                style={(e) => {
                  return {
                    color: e.isActive ? "red" : "",
                  };
                }}
                to={"Past-bills"}
                className="flex gap-2 py-2 px-3 text-gray-900 rounded-sm hover:bg-gray-100 md:hover:bg-transparent md:border-0 md:hover:text-blue-700 md:p-0 dark:text-white md:dark:hover:text-blue-500 dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent"
              >
                <span className="text-2xl">
                  <RiBillLine />
                </span>
                <span>Past Bills</span>
              </NavLink>
            </li>
            <div
            className="flex flex-col relative px-3 text-white-900 rounded-sm "
            onClick={toggleDropDown}
          >
            <button className={`flex gap-2 items-center hover:text-blue-700 ${
    settingsActive ? "text-red-700" : "text-white"
  }`}>
              <MdOutlineSettingsSuggest className="text-2xl" />
              <span>Settings</span>
              <IoIosArrowDropdown className="text-lg" />
            </button>
            {!dropdown && (
              <div className="absolute top-10 bg-gray-800 text-white">
                <ul className="text-nowrap">
                  <li
                    className="hover:text-blue-600 flex gap-2 items-center py-1 px-1 border-black border-2 cursor-pointer"
                    onClick={() => navigate("/user/table-settings")} // ✅ Use navigate
                  >
                    <MdOutlineTableBar />
                    <span>Tables Settings</span>
                  </li>
                  <li
                    className="hover:text-blue-600 flex gap-2 items-center py-1 px-1 border-black border-2 cursor-pointer"
                    onClick={() => {navigate("/user/food-settings")
                      
                    }}
                  >
                    <MdOutlineFoodBank />
                    <span>Food Menu Settings</span>
                  </li>
                </ul>
              </div>
            )}
          </div>
          </ul>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;
