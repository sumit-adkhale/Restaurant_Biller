import React, { useEffect } from "react";
import MonthlyTarget from "../Reports Components/MonthlyTarget";
import TodaysSales from "../Reports Components/TodaysSales";
import MonthlySalesChart from "../Reports Components/MonthlySalesChart";
import { useOutletContext } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { fetchAllDining, fetchTakeAwayDetails } from "../../Store/Slice";

function Reports() {
  const adminUse = useOutletContext();
  const dispatch = useDispatch();

  useEffect(() => {
    const fetchData = async () => {
      await dispatch(fetchTakeAwayDetails());
      await dispatch(fetchAllDining());
    };
    fetchData();
  }, [dispatch]);

  const { takeAwayDetails, allDiningDetails } = useSelector(
    (state) => state.restaurant
  );

  const currentDate = new Date();
  const todayDate = `${currentDate.getDate().toString().padStart(2, "0")}/${(
    currentDate.getMonth() + 1
  )
    .toString()
    .padStart(2, "0")}/${currentDate.getFullYear()}`;

  const currentMonth = currentDate.getMonth(); // 0-indexed: Jan = 0
  const currentYear = currentDate.getFullYear();

  //Monthly Sales Take Away
  const totalMonthlyTakeAwaySales = takeAwayDetails
    .filter((item) => item.orderStatus === "Completed")
    .filter((dateStr) => {
      const [day, month, year] = dateStr.PaymentDate?.split("/").map(Number);
      return month - 1 === currentMonth && year === currentYear;
    })
    .reduce((acc, item) => acc + item.totalAmount, 0);

  //Monthly Sales Dining
  const totalMonthlyDiningSales = allDiningDetails
    .filter((item) => item.orderStatus === "Completed")
    .filter((dateStr) => {
      const [day, month, year] = dateStr.PaymentDate?.split("/").map(Number);
      return month - 1 === currentMonth && year === currentYear;
    })
    .reduce((acc, item) => acc + item.totalAmount, 0);

    //Today's Sales Take Away
  const totalTodayTakeAwaySales = takeAwayDetails
    .filter((item) => item.orderStatus === "Completed")
    .filter((dateStr) => {
      return dateStr.PaymentDate === todayDate;
    })
    .reduce((acc, item) => acc + item.totalAmount, 0);

    //Today's Sales Dining
  const totalTodayDiningSales = allDiningDetails
    .filter((item) => item.orderStatus === "Completed")
    .filter((dateStr) => {
      return dateStr.PaymentDate === todayDate;
    })
    .reduce((acc, item) => acc + item.totalAmount, 0);

  return (
    <>
      <div className={`flex gap-5 ${adminUse ? "" : "px-20"}`}>
        <MonthlyTarget
          totalSales={totalMonthlyTakeAwaySales + totalMonthlyDiningSales}
          TodayTotalSales={totalTodayTakeAwaySales + totalTodayDiningSales}
        />
        <div className="flex flex-col gap-5 w-full">
          <TodaysSales
            totalTakeAwaySales={totalMonthlyTakeAwaySales}
            totalDiningSales={totalMonthlyDiningSales}
          />
          <MonthlySalesChart />
        </div>
      </div>
    </>
  );
}

export default Reports;
