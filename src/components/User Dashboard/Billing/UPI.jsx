import React from "react";
// import { QRCodeCanvas } from "qrcode.react";
import { QRCodeSVG } from "qrcode.react";
import { useDispatch } from "react-redux";
import { useNavigate, useOutletContext } from "react-router-dom";
import {
  addAllDining,
  fetchAllDining,
  updateOneDining,
  updateOneTakeAwayDetails,
} from "../../../Store/Slice";
import Swal from "sweetalert2";

function UPI() {
  const { singleOrder, dining } = useOutletContext();
  const upiId = "sumit.adkhale5-4@okaxis"; // Replace with your UPI ID
  const payeeName = "sumit"; // Replace with your name
  const amount = singleOrder.totalAmount; // Set the amount dynamically if needed
  const transactionNote = `${singleOrder.id}+"-"+${singleOrder.customerName}`; // Optional
  const currency = "INR"; // Currency (default: INR)
  const upiUrl = `upi://pay?pa=${upiId}&pn=${encodeURIComponent(
    payeeName
  )}&am=${amount}&cu=${currency}&tn=${encodeURIComponent(transactionNote)}`;

  const dispatch = useDispatch();
  const dispatch2 = useDispatch();
  const navigate = useNavigate();

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

    const modifyPayment = {
      paymentDone: true,
      paymentMode: "upi",
      PaymentDate: getCurrentDate(),
      PaymentTime: new Date().toLocaleTimeString(),
      PaymentDay:new Date().getDay(),
        orderStatus: `${dining?"Completed":"Pending"}`
    };
    const newModifyedPayment = { ...singleOrder, ...modifyPayment };
    if (dining) {
      const updateTableStatus = { ...newModifyedPayment, isTableEmpty: true };
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
                updateOneTakeAwayDetails({ id: singleOrder.id, updatedData:newModifyedPayment })
              )
      navigate("/user/take-away");
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
    <div className="mx-auto text-center">
      <h2>Scan and Pay</h2>
      {/* <QRCodeCanvas className='border-1' value={upiUrl} size={200}/> */}
      <QRCodeSVG value={upiUrl} fgColor="skyblue" bgColor="black" size={200} />
      <button
        onClick={handlePayment}
        className="px-3 py-1 bg-cyan-500 mt-10 font-semibold rounded-md hover:bg-cyan-700"
      >
        Mark as Paid by UPI
      </button>
    </div>
  );
}

export default UPI;
