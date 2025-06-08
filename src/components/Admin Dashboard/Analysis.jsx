import React from "react";
import SetTarget from "./SetTarget";
import FoodRank from "./FoodRank";
import FootFallTime from "./FootFallTime";
import DayWiseFootFall from "./DayWiseFootFall";

function Analysis() {
  return (
    <div>
      <SetTarget />
      <div className="flex mt-5 gap-2">
        <FoodRank />
        <FootFallTime />
        <DayWiseFootFall />
      </div>
    </div>
  );
}

export default Analysis;
