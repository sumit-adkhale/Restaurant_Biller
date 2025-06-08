import React, { useEffect, useState } from "react";
import { TbTargetArrow } from "react-icons/tb";
import { useDispatch, useSelector } from "react-redux";
import { fetchTargets, modifyTargets } from "../../Store/Slice";
import Loading from "../Other Components/Loading";
import Swal from "sweetalert2";

function SetTarget() {
  const [input, setInput] = useState({
    MonthlyTarget: "",
    MonthlyTargetType: "K",
    WeeklyTarget: "",
    WeeklyTargetType: "K",
  });

  const [targetData, setTargetData] = useState();
  const dispatch = useDispatch();

  const { targets,targetLoading } = useSelector((state) => state.restaurant);

  useEffect(() => {
    const fetchData = async () => {
      await dispatch(fetchTargets());
    };
    fetchData();
  }, [dispatch]);

  useEffect(() => {
    if (Array.isArray(targets) && targets.length > 0) {
      setTargetData(targets);
    } else {
      setTargetData(undefined); // fallback
    }
  }, [targets]);

  const getInputData = (e) => {
    setInput({ ...input, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    Swal.fire({
      title: "Are you sure?",
      text: "Do you want to Update target!",
      icon: "question",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, Update!",
    }).then(async(result) => {
      if (result.isConfirmed) {
        Swal.fire({
          title: "Updated!",
          text: "Target is Updated Successfully.",
          icon: "success",
        });
    try {
      await dispatch(modifyTargets(input));
      setInput({
        MonthlyTarget: "",
        MonthlyTargetType: "K",
        WeeklyTarget: "",
        WeeklyTargetType: "K",
      });
    } catch (error) {
      console.error("Error adding Target:", error);
    }
      }
    });


  };

  if (targetLoading) {
    return (
      <div className="bg-gradient-to-bl from-sky-500 to-indigo-500 rounded px-5 py-3">
        <h1 className="flex items-center gap-1 font-semibold text-2xl ">
          Set Targets <TbTargetArrow />
        </h1>
        <Loading />
      </div>
    );
  }
  return (
    <div className="bg-gradient-to-bl from-sky-500 to-indigo-500 rounded px-5 py-3">
      <h1 className="flex items-center gap-1 font-semibold text-2xl ">
        Set Targets <TbTargetArrow />
      </h1>
      {/* {targetLoading?<Loading/>:``} */}
      {!targetData?.[0] ? (
        <form onSubmit={handleSubmit} className="mt-5">
          <input
            type="number"
            placeholder="Monthly Target"
            className="w-34 mr-2  border-gray-300 border focus:outline-none
                       focus:border-purple-900 rounded pl-2"
            value={input.MonthlyTarget}
            name="MonthlyTarget"
            onChange={getInputData}
            required
          />
          <select
            className="text-gray-900  rounded
                      border-gray-300 border focus:outline-none
                       focus:border-purple-900 mr-5"
            name="MonthlyTargetType"
            required
            value={input.MonthlyTargetType}
            onChange={getInputData}
          >
            <option value="K" defaultValue>
              Thousand
            </option>
            <option value="L">Lac</option>
            <option value="Cr">Crore </option>
          </select>

          <input
            type="number"
            placeholder="Weekly Target"
            name="WeeklyTarget"
            className="w-34 mr-2  border-gray-300 border focus:outline-none
                       focus:border-purple-900 rounded pl-2 "
            value={input.WeeklyTarget}
            onChange={getInputData}
            required
          />
          <select
            className="text-gray-900  rounded
                      border-gray-300 border focus:outline-none
                       focus:border-purple-900"
            name="WeeklyTargetType"
            onChange={getInputData}
            required
            value={input.WeeklyTargetType}
          >
            <option value="K" defaultValue>
              Thousand
            </option>
            <option value="L">Lac</option>
            <option value="Cr">Crore </option>
          </select>

          <button className="bg-emerald-700 hover:bg-emerald-800 rounded px-2 ml-5">
            Submit
          </button>
          <div className={`bg-red-700  ${targets?.[0]?"inline":"hidden"} hover:bg-red-800 rounded px-2 py-[3px] ml-5`}
          onClick={()=>setTargetData(targets)}
          >Cancel</div>
        </form>
      ) : (
        <div className="mt-3 flex justify-between items-center px-10">
          <div>
            <div>
              Monthly Targets :{" "}
              <span className=" font-semibold ">
                {targetData[0].MonthlyTarget}
                {targetData[0].MonthlyTargetType}
              </span>
            </div>
            <div>
              Weekly Targets :{" "}
              <span className=" font-semibold ">
                {targetData[0].WeeklyTarget}
                {targetData[0].WeeklyTargetType}
              </span>
            </div>
          </div>
          <button className="bg-amber-600 hover:bg-amber-700 h-7 px-2 rounded"
          onClick={()=>setTargetData(null)}
          >
            Modify Targets
          </button>
        </div>
      )}
    </div>
  );
}

export default SetTarget;
