import React, { useEffect, useState } from "react";
import Chart from "react-apexcharts";
import { useDispatch, useSelector } from "react-redux";
import { fetchTargets } from "../../Store/Slice";

function MonthlyTarget({totalSales, TodayTotalSales}) {
  const dispatch=useDispatch()

useEffect(() => {
    const fetchData = async () => {
      await dispatch(fetchTargets());
    };
    fetchData();
  }, [dispatch]);

  const { targets,targetLoading } = useSelector((state) => state.restaurant);

  let targetValue
  if(targets[0]?.MonthlyTargetType==="K"){
     targetValue = targets[0]?.MonthlyTarget * 1000;
    
  }else if(targets[0]?.MonthlyTargetType==="L"){
     targetValue = targets[0]?.MonthlyTarget * 100000;
  }else{
     targetValue = targets[0]?.MonthlyTarget * 10000000;
  }
  const percentage = (totalSales / targetValue) * 100;
  
  const series = [percentage.toFixed(2)];

  const values = {"Target":`${targets[0]?.MonthlyTarget}${targets[0]?.MonthlyTargetType}`, "Revenue":(totalSales/1000).toFixed(2)+"K", "Today":(TodayTotalSales/1000).toFixed(2)+"K"}

  
  const options = {
    colors: ["#465FFF"],
    chart: {
      fontFamily: "Outfit, sans-serif",
      type: "radialBar",
      height: 330,
      sparkline: {
        enabled: true,
      },
    },
    plotOptions: {
      radialBar: {
        startAngle: -85,
        endAngle: 85,
        hollow: {
          size: "80%",
        },
        track: {
          background: "#E4E7EC",
          strokeWidth: "100%",
          margin: 5,
        },
        dataLabels: {
          name: {
            show: false,
          },
          value: {
            fontSize: "36px",
            fontWeight: "600",
            offsetY: -40,
            color: "skyblue",
            formatter: function (val) {
              return val + "%";
            },
          },
        },
      },
    },
    fill: {
      type: "solid",
      colors: ["#465FFF"],
    },
    stroke: {
      lineCap: "round",
    },
    labels: ["Progress"],
  };


  return (
    <div className="rounded-2xl w-1/3 my-10 border border-gray-200 bg-gray-100 dark:border-gray-800 dark:bg-white/[0.03]">
      <div className="px-5 pt-5 bg-white shadow-default rounded-2xl pb-11 dark:bg-gray-900 sm:px-6 sm:pt-6">
        <div className="flex justify-between">
          <div>
            <h3 className="text-lg font-semibold text-gray-800 dark:text-white/90">
              Monthly Target
            </h3>
            <p className="mt-1 text-gray-500 text-theme-sm dark:text-gray-400">
              Target you’ve set for each month
            </p>
          </div>
        </div>

        <div className="relative">
          <div className="max-h-[330px]" id="chartDarkStyle">
            <Chart options={options} series={series} type="radialBar" height={330} />
          </div>

          <span className="absolute left-1/2 top-full -translate-x-1/2 -translate-y-[95%] rounded-full bg-success-50 px-3 py-1 text-xs font-medium text-success-600 dark:bg-success-500/15 dark:text-success-500">
            +10%
          </span>
        </div>

        <p className="mx-auto mt-10 w-full max-w-[380px] text-center text-sm text-gray-500 sm:text-base">
          You earn ₹{TodayTotalSales} today, it's higher than last month. Keep up your good
          work!
        </p>
      </div>

      <div className="flex items-center justify-center gap-5 px-6 py-3.5 sm:gap-8 sm:py-5">
      {Object.entries(values).map(([key, value]) => (
        <React.Fragment key={key}>
        
        <div>
          <p className="mb-1 text-center text-gray-500 text-theme-xs dark:text-gray-400 sm:text-sm">
            {key}
          </p>
          <p className="flex items-center justify-center gap-1 text-base font-semibold text-gray-800 dark:text-white/90 sm:text-lg">
          {value||0}
            <svg
              width="16"
              height="16"
              viewBox="0 0 16 16"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                fillRule="evenodd"
                clipRule="evenodd"
                d={`M7.60141 2.33683C7.73885 2.18084 7.9401 2.08243 8.16435 2.08243C8.35773 2.08219 8.54998 2.15535 8.69664 2.30191L12.6968 6.29924C12.9898 6.59203 12.9899 7.0669 12.6971 7.3599C12.4044 7.6529 11.9295 7.65306 11.6365 7.36027L8.91435 4.64004V13.5C8.91435 13.9142 8.57856 14.25 8.16435 14.25C7.75013 14.25 7.41435 13.9142 7.41435 13.5V4.64442L4.69679 7.36025C4.4038 7.65305 3.92893 7.6529 3.63613 7.35992C3.34333 7.06693 3.34348 6.59206 3.63646 6.29926L7.60141 2.33683Z`}
                fill={key === "Target" ? "#D92D20" : "#039855"}
              />
            </svg>
          </p>
        </div>
      </React.Fragment>
      ))}
          
      </div>
    </div>
  );
}

export default MonthlyTarget;
