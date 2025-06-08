import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  fetchAllDining,
  fetchFoodDetails,
  fetchTakeAwayDetails,
} from "../../Store/Slice";

function FoodRank() {
  const dispatch = useDispatch();

  useEffect(() => {
    const fetchData = async () => {
      await dispatch(fetchTakeAwayDetails());
      await dispatch(fetchAllDining());
      await dispatch(fetchFoodDetails());
    };
    fetchData();
  }, [dispatch]);

  const { takeAwayDetails, allDiningDetails, foodDetails } = useSelector(
    (state) => state.restaurant
  );

  const countTakeAwayEachFood = (foodId) => {
    return takeAwayDetails
      .filter((item) => item.orderStatus === "Completed")
      .flatMap((item) => item.order) // flatten all order arrays
      .filter((foodItem) => foodItem.id === foodId)
      .reduce((acc, foodItem) => acc + foodItem.quantity, 0);
  };
  const countDiningEachFood = (foodId) => {
    return allDiningDetails
      .filter((item) => item.orderStatus === "Completed")
      .flatMap((item) => item.order) // flatten all order arrays
      .filter((foodItem) => foodItem.id === foodId)
      .reduce((acc, foodItem) => acc + foodItem.quantity, 0);
  };

  const foodWithCount = foodDetails.map((item) => {
    const takeAwayCount = countTakeAwayEachFood(item.id);
    const diningCount = countDiningEachFood(item.id);
    return {
      ...item,
      totalCount: takeAwayCount + diningCount,
    };
  });

  // Sort the array (descending order)
  const sortedFood = foodWithCount.sort((a, b) => b.totalCount - a.totalCount);

  return (
      <div class="w-1/3 relative overflow-x-auto shadow-md sm:rounded-lg">
        <table class="w-full text-sm text-center rtl:text-right text-gray-500 dark:text-gray-400">
          <thead class="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
            <tr>
              <th scope="col" class="px-6 py-3">Food Name</th>
              <th scope="col" class="px-6 py-3">No. of Time Ordered</th>
            </tr>
          </thead>
          <tbody>
            {sortedFood.map((item, i) => (
              <tr key={i} class="odd:bg-white odd:dark:bg-gray-900 even:bg-gray-50 even:dark:bg-gray-800 border-b dark:border-gray-700 border-gray-200">
                <td scope="row" class="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">{item.foodName}</td>
                <td class="px-6 py-4">{item.totalCount}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
  );
}

export default FoodRank;
