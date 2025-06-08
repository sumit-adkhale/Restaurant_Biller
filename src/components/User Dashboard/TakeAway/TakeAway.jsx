import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import {
  fetchOneTakeAwayDetails,
  fetchTakeAwayDetails,
  updateOneDining,
  updateOneTakeAwayDetails,
} from "../../../Store/Slice";
import Loading from "../../Other Components/Loading";
import Swal from "sweetalert2";

function TakeAway() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [openFAQ, setOpenFAQ] = useState(null);

  useEffect(() => {
    dispatch(fetchTakeAwayDetails());
  }, [dispatch]);
  const { takeAwayDetails, takeAwayLoading } = useSelector(
    (state) => state.restaurant
  );

  const toggleFAQ = (index) => {
    setOpenFAQ(openFAQ === index ? null : index);
  };
  const handleCancel = async (id) => {
    Swal.fire({
      title: "Are you sure?",
      text: "Do you want to Cancel Order!",
      icon: "question",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      cancelButtonText: "Close",
      confirmButtonText: "Yes, Cancel Order!",
    }).then(async (result) => {
      if (result.isConfirmed) {
        Swal.fire({
          title: "Cancelled!",
          text: "Order is Cancelled.",
          icon: "success",
        });
        const res = await dispatch(fetchOneTakeAwayDetails(id));
        const data = res.payload;
        const updatedData = {
          ...data,
          orderStatus: "Cancelled",
          CancelledDate: getCurrentDate(),
          CancelledTime: new Date().toLocaleTimeString(), // Current Time
        };

        await dispatch(updateOneTakeAwayDetails({ id, updatedData }));
      }
    });
  };

  const handleCompleted = async (id) => {
    Swal.fire({
      title: "Are you sure?",
      text: "Do you want to Mark As Complete",
      icon: "question",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, Mark Complete",
    }).then(async (result) => {
      if (result.isConfirmed) {
        Swal.fire({
          title: "Order Completed!",
          text: "Order is Completed Successfully.",
          icon: "success",
        });
        const res = await dispatch(fetchOneTakeAwayDetails(id));
        const data = res.payload;
        if (data.paymentDone) {
          const updatedData = {
            ...data,
            orderStatus: "Completed",
            CancelledDate: getCurrentDate(),
            CancelledTime: new Date().toLocaleTimeString(), // Current Time
          };
          // const updatedData={...data,orderStatus:"Completed"}
          await dispatch(updateOneTakeAwayDetails({ id, updatedData }));
        } else {
          alert("Complete payment !!");
        }
      }
    });
  };

  const getCurrentDate = () => {
    const date = new Date();
    const day = String(date.getDate()).padStart(2, "0"); // Ensure two digits
    const month = String(date.getMonth() + 1).padStart(2, "0"); // Months are 0-based
    const year = date.getFullYear();
    return `${day}/${month}/${year}`; // Format: DD/MM/YYYY
  };

  return (
    <>
      <div className=" sticky top-15">
        <button
          onClick={() => navigate("/user/add-take-away")}
          className="bg-blue-500 hover:bg-blue-700 
                        text-black mt-5 font-bold py-2 px-4 rounded"
        >
          + Add New TakeAway Order
        </button>
      </div>
      <div>
        <h1 className="text-center mb-2 text-3xl font-semibold">
          Pending Orders
        </h1>
        <section className=" w-full ">
          <div className=" max-w-3xl mx-auto space-y-4">
            {takeAwayLoading && <Loading />}
            {!takeAwayLoading && takeAwayDetails.length === 0 ? (
              <h1 className="text-2xl text-center">No Pending Orders</h1>
            ) : (
              takeAwayDetails
                ?.filter((order) => order.orderStatus === "Pending")
                .map((order, index) => (
                  <div
                    key={index}
                    className="bg-transparent border-1 xs:p-4 p-2 rounded-lg shadow"
                  >
                    <button
                      onClick={() => toggleFAQ(index)}
                      className="w-full flex justify-between items-center font-semibold cursor-pointer"
                    >
                      <span className="xs:text-xl text-base text-left">
                        Order ID: {order.id} - {order.customerName}
                      </span>
                      <img
                        className={`w-[30px] transition-transform duration-300 ${
                          openFAQ === index ? "rotate-180" : ""
                        }`}
                        src="/down-arrow.png"
                        alt="Toggle"
                      />
                    </button>
                    {openFAQ === index && (
                      <div className="flex justify-between mt-2 p-2 border border-gray-300 rounded">
                        <div className="">
                          <p className="text-sm">
                            <strong>Contact:</strong> {order.customerContact}
                          </p>
                          <p className="text-sm">
                            <strong>Ordered Details:</strong>
                          </p>
                          <ul className="list-disc pl-6">
                            {order.order.map((item, i) => (
                              <li key={i} className="text-sm">
                                {item.foodName} - {item.quantity} x ₹
                                {item.price}
                              </li>
                            ))}
                          </ul>
                          <p className="text-sm">
                            <strong>Total: </strong> ₹ {order.totalAmount}
                          </p>
                        </div>
                        <div>
                          <div>
                            <button
                              onClick={() => navigate(`/user/KOT/${order.id}`)}
                              className="bg-yellow-600 hover:bg-yellow-700 cursor-pointer mr-2 px-2 py-1 rounded-sm"
                            >
                              Print KOT
                            </button>

                            <button
                              onClick={() =>
                                navigate(`/user/re-printKOT/${order.id}`)
                              }
                              className="bg-amber-600 hover:bg-amber-800 cursor-pointer mr-2 px-2 py-1 rounded-sm"
                            >
                              Re-Print KOT
                            </button>

                            <button
                              onClick={() =>
                                navigate(`/user/edit-take-away/${order.id}`)
                              }
                              className="bg-sky-600 hover:bg-sky-800  cursor-pointer mr-2 px-2 py-1 rounded-sm"
                            >
                              Edit Order
                            </button>
                          </div>
                          <div className="mt-2">
                            <button
                              onClick={() =>
                                navigate(`/user/OrderSummery/${order.id}`)
                              }
                              className={` mr-2 px-2 py-1 rounded-sm ${
                                order.paymentDone
                                  ? "bg-gray-500 cursor-not-allowed"
                                  : "bg-emerald-600 cursor-pointer hover:bg-emerald-800 "
                              }`}
                              disabled={order.paymentDone}
                            >
                              {order.paymentDone ? "Paid" : "Process Payment"}
                            </button>

                            <button
                              onClick={() => handleCancel(order.id)}
                              className="bg-red-600 mr-2 hover:bg-red-800 cursor-pointer px-2 py-1 rounded-sm"
                            >
                              Cancel Order
                            </button>
                            <button
                              onClick={() => handleCompleted(order.id)}
                              className="bg-purple-500 hover:bg-purple-700 cursor-pointer px-2 py-1 rounded-sm"
                            >
                              Mark Complete
                            </button>
                          </div>
                        </div>
                      </div>
                    )}
                  </div>
                ))
            )}
          </div>
        </section>
      </div>
    </>
  );
}

export default TakeAway;
