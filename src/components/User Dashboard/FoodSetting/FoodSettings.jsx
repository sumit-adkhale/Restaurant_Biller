import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { addFood, deleteFood, fetchFoodDetails } from "../../../Store/Slice";
import Loading from "../../Other Components/Loading";
import Swal from "sweetalert2";

function FoodSettings() {

  const [ids, setIds] = useState("");

  const navigate=useNavigate()

  const [input, setInput] = useState({
    id: "",
    foodName: "",
    type: "",
    cusine: "",
    price: "",
  });

  const dispatch = useDispatch();

  const name = JSON.parse(localStorage.getItem("user"));

  const { foodDetails, foodLoading } = useSelector((state) => state.restaurant);

  useEffect(() => {
    const foodData = dispatch(fetchFoodDetails());
    
  }, []);


  const getInputData=(e)=>{
    setInput({ ...input, [e.target.name]: e.target.value });
  }
  
  const handleSubmit = async (e) => {
    e.preventDefault();

    Swal.fire({
      title: "Are you sure?",
      text: "Do you want to Add!",
      icon: "question",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, Add!",
    }).then(async(result) => {
      if (result.isConfirmed) {
        Swal.fire({
          title: "Added!",
          text: "Item Added Successfully.",
          icon: "success",
        });
    const allIds = foodDetails.map((data) => Number(data.id)); // Ensure IDs are numbers
    const maxId = allIds.length > 0 ? Math.max(...allIds) : 0; // Handle empty array
    const newId = maxId + 1;

    setIds(newId);
    const newInput = { ...input, id: newId.toString() };

    try {
      await dispatch(addFood(newInput)); // ✅ Dispatch the new food item
      dispatch(fetchFoodDetails()); // ✅ Refresh food list after adding

      // Reset input state
      setInput({
        foodName: "",
        type: "",
        cusine: "",
        price: "",
      });
    } catch (error) {
      console.error("Error adding food:", error);
    }
      }
    });



  };

  const handleDelete = async (id) => {
    Swal.fire({
      title: "Are you sure?",
      text: "Do you want to Delete!",
      icon: "question",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, Delete!",
    }).then(async(result) => {
      if (result.isConfirmed) {
        Swal.fire({
          title: "Deleted!",
          text: "Item Deleted Successfully.",
          icon: "success",
        });
    try {
      await dispatch(deleteFood(id));
      // dispatch(fetchTableDetails());
    } catch (error) {
      console.error("Error Deleting food:", error);
    }
      }
    });


  };

  return (
    <div className="w-3/4 mx-auto my-6 py-5 px-8 bg-zinc-800 rounded-xl shadow-md shadow-orange-300">
      <h1 className="text-2xl font-semibold text-center my-5">Food Settings</h1>
      <form onSubmit={handleSubmit} className="flex justify-center gap-4 mb-4">
        <input
          className=" placeholder-gray-600 pl-2 rounded-md
                         border-gray-300 border focus:outline-none
                          focus:border-blue-500"
          placeholder="Enter Food Name"
          type="text"
          name="foodName"
          onChange={getInputData}
          value={input.foodName}
          required
        />

        <select
          className="text-gray-600  rounded-md
                         border-gray-300 border focus:outline-none
                          focus:border-blue-500"
          name="type"
          onChange={getInputData}
          required
        >
          <option value="" defaultValue>
            Select Type
          </option>
          <option value="veg">Veg</option>
          <option value="Non-veg">Non-Veg </option>
          <option value="Eggiterian">Eggiterian </option>
          <option value="Jain">Jain </option>
        </select>
        <select
          className="text-gray-600  rounded-md
                         border-gray-300 border focus:outline-none
                          focus:border-blue-500"
          name="cusine"
          onChange={getInputData}
          required
        >
          <option value="" defaultValue>
            Select Cusine
          </option>
          <option value="Indian">Indian</option>
          <option value="Chinese">Chinese</option>
          <option value="Tandoor">Tandoor</option>
          <option value="Fast Food">Fast Food</option>
        </select>
        <input
          className=" placeholder-gray-600 pl-2 w-24 rounded-md
                         border-gray-300 border focus:outline-none
                          focus:border-blue-500"
          placeholder="Price"
          type="number"
          name="price"
          min="0"
          onChange={getInputData}
          value={input.price || ""}
          required
        />
        <button className="bg-blue-500 hover:bg-blue-700  px-2 py-1 rounded">Add</button>
      </form>
        {foodLoading && (
          <Loading/>
        )}
      {!foodLoading && <table className="w-full text-center">
        <thead className=" gap-2 my-2">
          <tr className=" border-b-2  font-semibold ">
            <td  className="px-6 py-2">Sr. No.</td>
            <td>Item Name</td>
            <td>Veg / Non-Veg</td>
            <td>Cusine</td>
            <td>Price</td>
            <td>Action</td>
          </tr>
        </thead>

        <tbody>
        {foodDetails &&
          foodDetails.map((data, index) => {
            return (
                  <tr className=" border-b-1"  key={index}>
                    <td  className="px-6 py-2">{index + 1}</td>
                    <td>{data.foodName}</td>
                    <td>{data.type}</td>
                    <td>{data.cusine}</td>
                    <td>{data.price}</td>
                    <td>
                        <button onClick={()=>{
                          navigate(`/user/EditFood/${data.id}`)}} className="bg-blue-700 mx-2 px-2 rounded">
                          Edit
                        </button>
                      <button
                        onClick={() => handleDelete(data.id)}
                        className="bg-red-700 px-2 rounded"
                      >
                        Delete
                      </button>
                    </td>
                  </tr>
            );
          })
          
        }
        </tbody>
      </table>}
    </div>
  );
}

export default FoodSettings;
