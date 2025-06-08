import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { removeDiningKOT, removeKOT } from "../../Store/Slice";
import Swal from "sweetalert2";

function AddOrderHeader({
  handleReset,
  heading,
  print,
  id,
  action,
  dining,
  onlyViewBill,
  admin,
}) {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [afterTimeOut, setAfterTimeOut] = useState({
    justify: "center",
    display: "hidden",
  });
  if (heading) {
    setTimeout(() => {
      setAfterTimeOut({
        justify: "between",
        display: "",
      });
    }, 2000);
  }
  const emptyKOT = () => {
    if (dining) {
      dispatch(removeDiningKOT(id));
    } else {
      dispatch(removeKOT(id));
    }
  };
  return (
    <>
      <div
        className={`w-full  px-10 flex justify-${
          heading ? afterTimeOut.justify : "normal"
        } py-5 gap-[30%]":""}`}
      >
        <button
          onClick={() => {
            
                if (action === "AddDining" || dining) {
                  if (onlyViewBill) {
                    // navigate("/user/Past-bills");
                    navigate(
                      `${admin ? "/admin/past-dining" : "/user/Past-bills"}`
                    );
                  } else {
                    navigate("/user");
                  }
                } else {
                  if (onlyViewBill) {
                    // navigate("/user/Past-bills");
                    navigate(
                      `${
                        admin
                          ? "/admin/past-takeaway-orders"
                          : "/user/Past-bills"
                      }`
                    );
                  } else {
                    navigate("/user/take-away");
                  }
                }
                if (!heading || action === "AddDining") {
                  handleReset();
                }
                if (heading == "KOT") {
                  emptyKOT();
                }
          }}
          className={`bg-sky-600 ${
            heading ? afterTimeOut.display : "mr-[30%]"
          } cursor-pointer text-xl px-3 rounded-md hover:bg-blue-700`}
        >
          Go Back
        </button>
        <h1 className="text-center  text-2xl font-semibold">
          {heading || "Place Take Away Orders"}
        </h1>
        {heading && (
          <button
            onClick={() => window.location.reload()}
            className={` ${heading ? afterTimeOut.display : ""} ${
              "Add Dining Order" === heading || admin
                ? "bg-transparent text-black"
                : "bg-yellow-500 hover:bg-yellow-700 cursor-pointer"
            }  text-xl px-3 rounded-md`}
          >
            {action ? "" : "Print"}
          </button>
        )}
      </div>
      <hr />
    </>
  );
}

export default AddOrderHeader;
