import React, { useEffect, useState } from "react";
import AddOrderHeader from "../../Other Components/AddOrderHeader";
import { NavLink, Outlet, useLocation, useNavigate, useParams } from "react-router-dom";
import { useDispatch } from "react-redux";
import { fetchAllDining, fetchOneDining, fetchOneDiningFromAll, fetchOneTakeAwayDetails } from "../../../Store/Slice";

function BillingSummery({DiningBilling,admin}) {
  const { id } = useParams();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location =useLocation()
  const urlData=location.state
  
  const [singleOrder, setSingleOrder] = useState({});
  const [paymentBlock, setPaymentBlock] = useState({
    orderSummery: "",
    paymentSummery: "hidden",
    heading: "Order Summery"
  });
  const [display, setDisplay] = useState("hidden");
  useEffect(() => {
    const fetchSingleData = async () => {
      let data
      if(DiningBilling){
        if(urlData?.onlyViewBill){
          data=await dispatch(fetchOneDiningFromAll(id))
          
        }else{

          data=await dispatch(fetchOneDining(id))
        }
      }else{
        data = await dispatch(fetchOneTakeAwayDetails(id));
      }
      const singleData = data.payload;
      setSingleOrder(singleData);
    };
    fetchSingleData();
    setTimeout(()=>{
      window.print()
    },500)
  }, [id, dispatch]);
  const print = setTimeout(() => {
    setDisplay("");
  }, 1000);
  return (
    <div className="">
      <AddOrderHeader heading={paymentBlock.heading} print={print} admin={admin} dining={DiningBilling} onlyViewBill={urlData?.onlyViewBill} />
      <div className={`${paymentBlock.orderSummery}`}>
        <div className="text-center">
        {DiningBilling ? (
            <h1 className="mt-5">Table Name : {DiningBilling?.tablename || singleOrder.tablename}</h1>
          ) : (
            <h1 className="mt-5">Order Id : {DiningBilling?.id || singleOrder.id}</h1>
          )}
          {!DiningBilling && <h1>Customer Name: {DiningBilling?.customerName || singleOrder.customerName}</h1>}
          <h1>Date & Time : {singleOrder.PlacedDate} {singleOrder.PlacedTime}</h1>
          <h1 className="mt-5">Order Details</h1>
          <table className="text-center mx-auto mb-5 ">
            <thead className="border-y-1">
              <tr>

              <td className="pr-5">Items Name</td>
              <td className="pr-5">Quantity</td>
              <td className="pr-5">Price</td>
              <td className="pr-5">Total</td>
              </tr>
            </thead>
            <tbody>
              {singleOrder.order?.map((item, index) => (
                <tr key={index}>
                  <td>{item.foodName}</td>
                  <td>{item.quantity}</td>
                  <td>{item.price}</td>
                  <td>{item.price * item.quantity}</td>
                </tr>
              ))}
            </tbody>
          </table>
          <h2>Order Value : ₹ {singleOrder.orderValue}</h2>
          <h2>GST 5% : ₹ {singleOrder.GST}</h2>
          <h2>Grand Total : ₹ {singleOrder.totalAmount}</h2>
        </div>
        <button
          onClick={() => {
            // navigate(`/user/Payment/${id}`)
            setPaymentBlock({
              orderSummery: "hidden",
              paymentSummery: "",
              heading: "Payment Processing",
            });
          }}
          className={`bg-green-500 ${display} flex ${urlData?.onlyViewBill?"hidden":""} justify-self-center mt-10 cursor-pointer text-xl px-3 rounded-md hover:bg-green-700`}
        >
          Proccess Payment
        </button>
      </div>
      <div className={`${paymentBlock.paymentSummery}`}>
        <div className="mt-10 px-10 flex justify-between">
          <h1 className="font-semibold text-2xl">Choose Payment Method</h1>
          <h2 className="font-medium text-xl"> Grand Total : ₹ {singleOrder.totalAmount} </h2>
        </div>
        <div className=" flex justify-between mt-5 px-10">
          <div className="flex flex-col items-center gap-3 ">
            <NavLink
            className={"border px-10 py-2 bg-blue-600 "}
              style={(e) => {
                return {
                  color: e.isActive ? "orange" : "",
                  fontWeight: e.isActive ? "800" : "",
                };
              }}
              to="cash"
            >
              Cash
            </NavLink>
            <NavLink
            className={"border px-[46px] py-2 bg-blue-600 "}
              style={(e) => {
                return {
                  color: e.isActive ? "orange" : "",
                  fontWeight: e.isActive ? "800" : "",
                };
              }}
              to="UPI"
            >
              UPI
            </NavLink>
            <NavLink
            className={"border px-2 py-2 bg-blue-600 "}
              style={(e) => {
                return {
                  color: e.isActive ? "orange" : "",
                  fontWeight: e.isActive ? "800" : "",
                };
              }}
              to="cardPayment"
            >
              Card Payment
            </NavLink>
          </div>
          
          <Outlet context={{singleOrder:singleOrder,dining:DiningBilling}} />
        </div>
      </div>
    </div>
  );
}

export default BillingSummery;
