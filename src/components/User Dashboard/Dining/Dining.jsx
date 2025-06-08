import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addAllDining, fetchAllDining, fetchTableDetails, updateOneDining } from "../../../Store/Slice";
import { useNavigate } from "react-router-dom";
import Loading from "../../Other Components/Loading";
import Swal from "sweetalert2";

function Dining() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [openFAQ, setOpenFAQ] = useState(null);

  useEffect(() => {
    dispatch(fetchTableDetails());
  }, []);

  const { tableDetails, tableLoading } = useSelector(
    (state) => state.restaurant
  );

  const toggleFAQ = (index) => {
    setOpenFAQ(openFAQ === index ? null : index);
  };
  
  const getCurrentDate = () => {
    const date = new Date();
    const day = String(date.getDate()).padStart(2, "0"); // Ensure two digits
    const month = String(date.getMonth() + 1).padStart(2, "0"); // Months are 0-based
    const year = date.getFullYear();
    return `${day}/${month}/${year}`; // Format: DD/MM/YYYY
  };
  const handleCancel=(id)=>{

    Swal.fire({
      title: "Are you sure?",
      text: "Do you want to Cancel All Orders!",
      icon: "question",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      cancelButtonText: "Close",
      confirmButtonText: "Yes, Cancel All Orders!",
    }).then(async(result) => {
      if (result.isConfirmed) {
        Swal.fire({
          title: "Cancelled!",
          text: "All Orders of this table Cancelled.",
          icon: "success",
        });
    const currentTable = tableDetails?.filter((data) => data.id === id)
      const data={...currentTable[0],orderStatus:"Cancelled"}
      const newData={...data,
        isTableEmpty: true,
        CancelledDate: getCurrentDate(),
        CancelledTime: new Date().toLocaleTimeString(),

      }
      
      await dispatch(updateOneDining({id,updatedData: newData}))
      const removeOrders={...newData,order:[]}
      await dispatch(updateOneDining({id,updatedData:removeOrders}))
      const diningRes = await dispatch(fetchAllDining())
      const diningData = diningRes.payload
      console.log(diningRes);
      
      const allIds = diningData.map((data) => Number(data.id)); // Ensure IDs are numbers
        const maxId = allIds.length > 0 ? Math.max(...allIds) : 0; // Handle empty array
        const newId = maxId + 1;
        const StringId= newId.toString()
        const updateId= {...newData,id:StringId}
      await dispatch(addAllDining(updateId))
      }
    });

    }

  return (
    <>
      {tableDetails
        .filter((data) => data.isTableEmpty)
        ?.map((data, i) => {
          return (
            <button
              key={i}
              onClick={() => navigate(`addDining/${data.id}`)}
              className="bg-blue-500 hover:bg-blue-700 
                        text-black mt-5 mr-2 font-bold py-2 px-4 rounded"
            >
              + Add {data.tablename}
            </button>
          );
        })}
      <div className=" max-w-3xl mx-auto space-y-4">
      {tableLoading && 
      <div className="mt-[20%]">
      <Loading />
      </div>
      }
        {!tableLoading &&
        tableDetails.filter((data) => !data.isTableEmpty).length === 0 ? (
          <h1 className="text-2xl mt-15 text-center">
            Restaurant Tables are Empty !!
          </h1>
        ) : (
          tableDetails
            .filter((data) => !data.isTableEmpty)
            ?.map((order, index) => (
              <div
                key={index}
                className="bg-transparent mt-5 border-1 xs:p-4 p-2 rounded-lg shadow"
              >
                <button
                  onClick={() => toggleFAQ(index)}
                  className="w-full flex justify-between items-center font-semibold cursor-pointer"
                >
                  <span className="xs:text-xl text-base text-left">
                    {order.tablename}
                  </span>
                  <img
                    className={`w-[30px] transition-transform duration-300
                               ${openFAQ === index ? "rotate-180" : ""}`}
                    src="/down-arrow.png"
                    alt="Toggle"
                  />
                </button>
                {openFAQ === index && (
                  <div className="flex justify-between mt-2 p-2 border border-gray-300 rounded">
                    <div className="">
                      <p className="text-sm">
                        <strong>Ordered Details:</strong>
                      </p>
                      <ul className="list-disc pl-6">
                        {order.order.map((item, i) => (
                          <li key={i} className="text-sm">
                            {item.foodName} - {item.quantity} x ₹{item.price}
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
                          onClick={() => navigate(`/user/DiningKOT/${order.id}`)}
                          className="bg-yellow-600 hover:bg-yellow-700 cursor-pointer mr-2 px-2 py-1 rounded-sm"
                        >
                          Print KOT
                        </button>

                        <button
                          onClick={() =>
                            navigate(`/user/DiningReKOT/${order.id}`)
                          }
                          className="bg-amber-600 hover:bg-amber-800 cursor-pointer mr-2 px-2 py-1 rounded-sm"
                        >
                          Re-Print KOT
                        </button>

                        <button
                          onClick={() =>
                            navigate(`/user/editDining/${order.id}`)
                          }
                          className="bg-sky-600 hover:bg-sky-800  cursor-pointer mr-2 px-2 py-1 rounded-sm"
                        >
                          Edit Order
                        </button>
                      </div>
                      <div className="mt-2">
                        <button
                          onClick={() =>
                            navigate(`/user/DiningBillingSummery/${order.id}`)
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
                      </div>
                    </div>
                  </div>
                )}
              </div>
            ))
        )}
      </div>
    </>
  );
}

export default Dining;
