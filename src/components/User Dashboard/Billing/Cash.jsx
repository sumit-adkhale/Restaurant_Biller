import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigate, useOutletContext } from "react-router-dom";
import {
  addAllDining,
  fetchAllDining,
  updateOneDining,
  updateOneTakeAwayDetails,
} from "../../../Store/Slice";
import Swal from "sweetalert2";

function Cash() {
  const { singleOrder, dining } = useOutletContext(); // Extracting context data
  const dispatch = useDispatch();
  const dispatch2 = useDispatch();
  const navigate = useNavigate();
  const [givenAmount, setGivenAmount] = useState("");
  const returnAmount = givenAmount - singleOrder.totalAmount;

  const showText = returnAmount < 0 ? "Collect from" : "Return to";

  const handlePayment = async () => {

    Swal.fire({
          title: "Are you sure Payment is Complete?",
          text: "Do you want to Mark Complete!",
          icon: "question",
          showCancelButton: true,
          confirmButtonColor: "#3085d6",
          cancelButtonColor: "#d33",
          confirmButtonText: "Yes, Completed!",
        }).then(async (result) => {
          if (result.isConfirmed) {
            Swal.fire({
              title: "Payment Completed!",
              text: "Payment Completed Successfully.",
              icon: "success",
            });
    if (returnAmount < 0) {
      alert("Please collect the full amount from the customer");
    } else {
      const modifiedPayment = {
        paymentDone: true,
        paymentMode: "cash",
        PaymentDate: getCurrentDate(),
        PaymentTime: new Date().toLocaleTimeString(),
        PaymentDay:new Date().getDay(),
        orderStatus: `${dining?"Completed":"Pending"}`
      };

      const updatedData = { ...singleOrder, ...modifiedPayment };

      if (dining) {
        const updateTableStatus = { ...updatedData, isTableEmpty: true };
        // await dispatch(
        //   updateOneDining({ id: singleOrder.id,updatedData: updateTableStatus })
        // );

        const removeOrders = { ...updateTableStatus, order: [] };
        await dispatch2(updateOneDining({ id: singleOrder.id, updatedData: removeOrders }));

        navigate("/user");

        const diningRes = await dispatch(fetchAllDining());

        const diningData = diningRes.payload;

        const allIds = diningData.map((data) => Number(data.id)); // Ensure IDs are numbers
        const maxId = allIds.length > 0 ? Math.max(...allIds) : 0; // Handle empty array
        const newId = maxId + 1;
        const StringId = newId.toString();
        const updateId = { ...updateTableStatus, id: StringId };
        await dispatch(addAllDining(updateId));
      } else {
        await dispatch(
          updateOneTakeAwayDetails({ id: singleOrder.id, updatedData })
        );
        navigate("/user/take-away");
      }
    }
      }
    });




  };

  const getCurrentDate = () => {
    const date = new Date();
    return `${date.getDate().toString().padStart(2, "0")}/${(
      date.getMonth() + 1
    )
      .toString()
      .padStart(2, "0")}/${date.getFullYear()}`;
  };

  return (
    <div className="mx-auto ">
      <h1>Received Cash from Customer</h1>
      <input
        value={givenAmount}
        onChange={(e) => setGivenAmount(Number(e.target.value))}
        className="pl-3 border-1 rounded-md my-2"
        type="number"
        placeholder="Enter Received Amount"
        min={0}
      />
      <h1 className="mt-3">
        Cash Need to <span className="font-semibold">"{showText}"</span>{" "}
        Customer
      </h1>
      <h2 className={`${returnAmount < 0 ? "text-red-500" : "text-green-500"}`}>
        ₹ {returnAmount}
      </h2>
      <button
        onClick={handlePayment}
        className="px-3 py-1 bg-cyan-500 mt-10 font-semibold rounded-md hover:bg-cyan-700"
      >
        Mark as Paid
      </button>
    </div>
  );
}

export default Cash;
