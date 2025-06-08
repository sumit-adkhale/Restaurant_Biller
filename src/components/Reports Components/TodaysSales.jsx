import React from "react";
import { FaArrowUpLong } from "react-icons/fa6";
import { IoArrowDown, IoArrowUp } from "react-icons/io5";
import { GrGroup } from "react-icons/gr";
import { IoCubeOutline } from "react-icons/io5";

function TodaysSales({totalDiningSales,totalTakeAwaySales}) {
  return (
    <div className=" flex h-[33%] mt-10 gap-5 w-full">
      {/* <!-- Metric Item Start --> */}
      <div className="rounded-2xl border w-[50%] border-gray-200 bg-white p-5 dark:border-gray-800 dark:bg-white/[0.03] md:p-6">
        <div className="flex items-center justify-center w-12 h-12 bg-gray-100 rounded-xl dark:bg-gray-800">
          <GrGroup className="text-xl"/>
        </div>

        <div className="flex items-end justify-between mt-5">
          <div>
            <span className="text-sm text-gray-500 dark:text-gray-400">
              Dining
            </span>
            <h4 className="mt-2 font-bold text-gray-800 text-title-sm dark:text-white/90">
            ₹ {totalDiningSales}
            </h4>
          </div>
          <div className="bg-green-50 flex items-center rounded-xl px-1 py-1 text-green-600 dark:bg-green-500/15 dark:text-green-500">
            <IoArrowUp  />
            11.01%
          </div>
        </div>
      </div>
      {/* <!-- Metric Item End --> */}

      {/* <!-- Metric Item Start --> */}
      <div className="rounded-2xl border w-[50%] border-gray-200 bg-white p-5 dark:border-gray-800 dark:bg-white/[0.03] md:p-6">
        <div className="flex items-center justify-center w-12 h-12 bg-gray-100 rounded-xl dark:bg-gray-800">
          <IoCubeOutline className="text-2xl"/>
        </div>
        <div className="flex items-end justify-between mt-5">
          <div>
            <span className="text-sm text-gray-500 dark:text-gray-400">
              Take Away Orders
            </span>
            <h4 className="mt-2 font-bold text-gray-800 text-title-sm dark:text-white/90">
            ₹ {totalTakeAwaySales}
            </h4>
          </div>

          <div className="bg-red-50 flex items-center rounded-xl px-1 py-1 text-red-600 dark:bg-red-500/15 dark:text-red-500">
            <IoArrowDown />
            9.01%
          </div>
        </div>
      </div>
      {/* <!-- Metric Item End --> */}
    </div>
  );
}

export default TodaysSales;
