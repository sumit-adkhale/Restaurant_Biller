import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchAllDining, fetchTakeAwayDetails } from "../../Store/Slice";

function FootFallTime() {
  const dispatch = useDispatch();

  useEffect(() => {
    const fetchData = async () => {
      await dispatch(fetchTakeAwayDetails());
      await dispatch(fetchAllDining());
    };
    fetchData();
  }, [dispatch]);

  const { takeAwayDetails, allDiningDetails} = useSelector(
    (state) => state.restaurant
  );

  const getTimeRange = (timeStr) => {
    const [time, modifier] = timeStr.split(' ');
    let [hours, minutes, seconds] = time.split(':').map(Number);
    if (modifier === 'PM' && hours !== 12) hours += 12;
    if (modifier === 'AM' && hours === 12) hours = 0;
  
    if (hours >= 5 && hours < 12) return 'Morning';
    if (hours >= 12 && hours < 17) return 'Afternoon';
    if (hours >= 17 && hours < 24) return 'Evening';
    return 'Night'; // optional, for late night
  };

  
  const countOrdersByTimeRange = (orders) => {
    const timeCounts = {
      Morning: 0,
      Afternoon: 0,
      Evening: 0,
      Night: 0,
    };
  
    orders.forEach((item) => {
        const range = getTimeRange(item.PlacedTime);
        timeCounts[range]++;
    });
  
    return timeCounts;
  };
  
  const takeAwayTimeCounts = countOrdersByTimeRange(takeAwayDetails || []);
const diningTimeCounts = countOrdersByTimeRange(allDiningDetails || []);

// Total counts from both sources
const totalTimeCounts = {
  Morning: takeAwayTimeCounts.Morning + diningTimeCounts.Morning,
  Afternoon: takeAwayTimeCounts.Afternoon + diningTimeCounts.Afternoon,
  Evening: takeAwayTimeCounts.Evening + diningTimeCounts.Evening,
  Night: takeAwayTimeCounts.Night + diningTimeCounts.Night,
};

  const totalOrders = Object.values(totalTimeCounts).reduce((acc, count) => acc + count, 0);
  const morningPercentage = ((totalTimeCounts.Morning / totalOrders) * 100).toFixed(0);
  const afternoonPercentage = ((totalTimeCounts.Afternoon / totalOrders) * 100).toFixed(0);
  const eveningPercentage = ((totalTimeCounts.Evening / totalOrders) * 100).toFixed(0);
  const nightPercentage = ((totalTimeCounts.Night / totalOrders) * 100).toFixed(0);
  return (
    <div className="group/phyziro w-1/3 block items-center justify-center h-[50vh] bg-[#0f0f0f] rounded-2xl pt-3 pb-11 px-5 border-2 border-gray-800 bg-gradient-to-t from-gray-900">
      <h1 className="text-white text-xl  mb-2 selected_font w-full h-auto text-center">
        Timing Wise Footfall
      </h1>
      <div className="flex relative place-content-center  h-[50%] w-12/12 rounded-3xl p-3">
        <div className="relative grid grid-cols-4 items-end gap-4 z-10">
          <div className="flex group/bar1 place-items-center h-full w-auto">
            <center>
              <div className="block h-50 w-auto">
                <p className="block text-white text-center text-xs">
                  <span>Morning</span>
                  <br />
                  <span className="font-extralight"> {morningPercentage} %</span>
                </p>
                <div className={`shadow-inner sepia-[80%] mt-2 contrast-125 hue-rotate-180 saturate-100 flex align-center w-[30px] group-hover/bar1: bg-gray-900 rounded-3xl bg-gradient-to-t from-indigo-900 via-blue-700 to-blue-500 border border-indigo-900 hover:shadow-blue-500/50 place-content-center`}
                style={{ height: `${morningPercentage}%` }}>
                  <div className="shadow-inner relative top-[0px] rounded-3xl h-auto m-[6px] w-[20px] bg-gradient-to-t from-indigo-800 via-blue-600 to-blue-700 "></div>
                </div>
              </div>
            </center>
          </div>
          <div className="flex group/bar1 place-items-center h-full w-auto">
            <center>
              <div className="block h-50 w-auto">
                <p className="block text-white text-center text-xs">
                  <span>After Noon</span>
                  <br />
                  <span className="font-extralight"> {afternoonPercentage} %</span>
                </p>
                <div className={`shadow-inner mt-2 contrast-125 hue-rotate-90 saturate-100 flex align-center w-[30px] group-hover/bar1: bg-gray-900 rounded-3xl bg-gradient-to-t from-indigo-900 via-blue-700 to-blue-500 border border-indigo-900  hover:shadow-blue-500/50 place-content-center`}
                style={{ height: `${afternoonPercentage}%` }}>
                  <div className="shadow-inner relative top-[0px] rounded-3xl h-auto m-[6px] w-[20px] bg-gradient-to-t from-indigo-800 via-blue-600 to-blue-700 "></div>
                </div>
              </div>
            </center>
          </div>
          <div className="flex group/bar1 place-items-center h-full w-auto">
            <center>
              <div className="block h-50 w-auto">
                <p className="block text-white text-center text-xs">
                  <span>Evening</span>
                  <br />
                  <span className="font-extralight"> {eveningPercentage} %</span>
                </p>
                <div className="backdrop-opacity-60 mt-2 sepiacontrast-125 saturate-100 flex align-center  w-[30px] group-hover/bar1: bg-gray-900 rounded-3xl bg-gradient-to-t from-indigo-900 via-blue-700 to-blue-500 border border-indigo-900 shadow-md hover:shadow-blue-500/50 place-content-center"
                style={{ height: `${eveningPercentage}%` }}>
                  <div className="shadow-inner  relative top-[0px] rounded-3xl h-auto m-[6px] w-[20px] bg-gradient-to-t from-indigo-800 via-blue-600 to-blue-700 "></div>
                </div>
              </div>
            </center>
          </div>
          <div className="flex group/bar1 place-items-center h-full w-auto">
            <center>
              <div className="block h-50 w-auto">
                <p className="block text-white text-center text-xs">
                  <span>Night</span>
                  <br />
                  <span className="font-extralight"> {nightPercentage} %</span>
                </p>
                <div className="backdrop-opacity-60 mt-2 sepiacontrast-125 saturate-100 flex align-center h-[35%] w-[30px] group-hover/bar1: bg-gray-900 rounded-3xl bg-gradient-to-t from-zinc-900 via-gray-700 to-white-500 border border-indigo-900 shadow-md hover:shadow-blue-500/50 place-content-center"
                style={{ height: `${nightPercentage}%` }}>
                  <div className="shadow-inner  relative top-[0px] rounded-3xl h-auto m-[6px] w-[20px] bg-gradient-to-t from-gray-600 via-zinc-600 to-zinc-700 "></div>
                </div>
              </div>
            </center>
          </div>
        </div>
      </div>
    </div>
  );
}

export default FootFallTime;
