import React, { useEffect, useState } from "react";
import Menu from "../Menu";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import AddOrderHeader from "../../Other Components/AddOrderHeader";
import { addDiningKOT, emptyTempCart, fetchTableDetails, removeTempItem, updateOneDining, updateQuantity, updateTempCart } from "../../../Store/Slice";
import { toast } from 'react-toastify';

function AddDining({ EditDining }) {
  const { id } = useParams();
  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    dispatch(fetchTableDetails());
  }, [dispatch]);

  const { tempCartDetails, tableDetails,tempKOT } = useSelector(
    (state) => state.restaurant
  );
  const currentTable = tableDetails?.find((data) => data.id === id)||{};

  useEffect(() => {
    if (currentTable && currentTable.order) {
      dispatch(updateTempCart(currentTable.order));
    }
  }, [currentTable, dispatch]);
  
  
  const [totalOrderValue, setTotalOrderValue] = useState(0);
  const [GST, setGST] = useState(0);
  const [grandTotal, setGrandTotal] = useState(0);

  useEffect(() => {
    // Calculate total order value whenever tempCartDetails changes
    const total = tempCartDetails.reduce(
      (sum, item) => sum + item.price * (item.quantity || 1),
      0
    );
    setTotalOrderValue(total);
    const calculateGST = total * 0.05;
    setGST(calculateGST.toFixed(2));

    setGrandTotal(Math.floor(total + calculateGST));
  }, [tempCartDetails]);

  const handleReset = () => {
    dispatch(emptyTempCart());
    setTotalOrderValue(0);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    e.stopPropagation()
    if (tempCartDetails.length === 0) {
      toast.warn("Please add some items to place order");
    } else {
      const getCurrentDate = () => {
      const date = new Date();
      const day = String(date.getDate()).padStart(2, "0"); // Ensure two digits
      const month = String(date.getMonth() + 1).padStart(2, "0"); // Months are 0-based
      const year = date.getFullYear();
      return `${day}/${month}/${year}`; // Format: DD/MM/YYYY
    };
    const currentTime=new Date().toLocaleTimeString()	
      const newOrder = {
        id: id,
        tablename: currentTable.tablename,
        isTableEmpty: false,
        username: currentTable.username,
        order: tempCartDetails,
        orderValue: totalOrderValue,
        GST: GST,
        totalAmount: grandTotal,
        paymentDone: false,
        paymentMode: "",
        orderStatus: "Pending",
        PlacedDate:getCurrentDate(),
        PlacedTime:currentTime
      };
      const KOTdata = {
        id: currentTable.id,
        tablename: currentTable.tablename,
        order: tempCartDetails,
      };

      
      await dispatch(updateOneDining({id,updatedData: newOrder})); // Dispatch the new object
      if(EditDining){
        const tempKOTData = {
          id: currentTable.id,
          tablename: currentTable.tablename,
          order: tempKOT,
        };
        await dispatch(addDiningKOT(tempKOTData));
      }else{
        await dispatch(addDiningKOT(KOTdata));

      }
      handleReset();
      navigate('/user')
    }
  };
  return (
    <>
      <AddOrderHeader
        handleReset={handleReset}
        heading={"Add Dining Order"}
        action={"AddDining"}
      />
      <div className="py-5 relative top-0 left-0">
        <div className="flex justify-between items-center px-10 mb-4">
          <h1 className="pb-2">
            Table Name :
            <span className="font-semibold">{currentTable.tablename||"Loading..."}</span>
          </h1>

          <h1>
            <span className="text-md ">
              ₹ {totalOrderValue} (orde value) +{" "}
            </span>
            <span className="text-md ">₹ {GST} (5% GST) = </span>
            <span className="text-xl ">Grand Total : </span>
            <span className="text-2xl font-semibold">₹ {grandTotal}</span>
          </h1>
        </div>
        <div
          className="flex justify-around items-center px-20"
        >
          <button 
          onClick={handleSubmit} className="bg-purple-600 cursor-pointer ml-7 text-xl px-3 rounded-md hover:bg-purple-700">
            Save
          </button>
          <button
            onClick={handleReset}
            className="bg-zinc-500 text-xl cursor-pointer px-3 rounded-md hover:bg-zinc-600"
          >
            Reset
          </button>
        </div>
        <div className="sticky top-0 left-0 mt-16 py-5 px-8 bg-zinc-800 rounded-xl shadow-md shadow-orange-300">
          <h1 className="text-2xl font-semibold text-center my-2">
            Added Food Menu
          </h1>
          <table className="w-full mt-2 text-center">
            <thead className="border-b-2 pb-2">
              <tr className=" font-semibold px-6 pr-16">
                <td className="px-6 py-2">Sr No.</td>
                <td>Food Items Name</td>
                <td>Veg / Non Veg</td>
                <td>cusine</td>
                <td>Price (Rs./₹)</td>
                <td>Quantity</td>
                <td>Action</td>
              </tr>
            </thead>
            <tbody className="gap-2 my-2">
              {tempCartDetails.length === 0 ? (
                <tr>
                  <td colSpan="7" className="text-2xl text-center">
                    Items Not Added !
                  </td>
                </tr>
              ) : (
                tempCartDetails.map((food, index) => (
                  <tr key={index} className="border-b-1 pb-2 px-8 mb-2">
                    <td className="px-6 py-2">{index + 1}</td>
                    <td>{food.foodName}</td>
                    <td>{food.type}</td>
                    <td>{food.cusine}</td>
                    <td className="pr-10">{food.price}</td>
                    <td>
                      <input
                        type="number"
                        value={food.quantity || 1}
                        min={1}
                        className="w-15 text-center"
                        onChange={(e) =>
                          dispatch(
                            updateQuantity({
                              id: food.id,
                              quantity: Number(e.target.value),
                            })
                          )
                        }
                      />
                    </td>
                    <td>
                      <button
                        onClick={() => dispatch(removeTempItem(food.id))}
                        className="bg-red-700 cursor-pointer mr-4 px-2 rounded"
                      >
                        Remove
                      </button>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>
      <Menu newCol={true} />
    </>
  );
}

export default AddDining;
