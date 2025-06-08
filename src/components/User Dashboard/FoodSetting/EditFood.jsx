import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import { FetchOneFood, FetchOneTable, updateFood, updateTable } from "../../../Store/Slice";
import Swal from "sweetalert2";

function EditFood() {

     const { id } = useParams();
      const dispatch = useDispatch();
      const navigate = useNavigate();
    
      // ✅ Initialize state correctly
      const [input, setInput] = useState({
        id: "",
        foodName: "",
        type: "",
        cusine: "",
        price: "",
      });
    
      useEffect(() => {
        async function fetchData() {
          const result = await dispatch(FetchOneFood(id));
          if (result.payload) {
            setInput(result.payload); // ✅ Set the full object
          }
        }
        fetchData();
      }, [dispatch, id]);
    
  const getInputData=(e)=>{
    setInput({ ...input, [e.target.name]: e.target.value });
  }
  
      const handleSubmit = async (e) => {
        e.preventDefault()

    Swal.fire({
      title: "Are you sure?",
      text: "Do you want to Update!",
      icon: "question",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, Update!",
    }).then(async(result) => {
      if (result.isConfirmed) {
        Swal.fire({
          title: "Updated!",
          text: "Item Updated Successfully.",
          icon: "success",
        });
        try {
          await dispatch(updateFood(input)).unwrap();
          navigate(-1); // ✅ Navigate after successful update
        } catch (error) {
          console.error("Update failed:", error);
        }
      }
    });



      };
    
  return (
    <div className="w-3/4 mx-auto my-6 py-5 px-8 bg-zinc-800 rounded-xl shadow-md shadow-orange-300">
      <h1 className="text-2xl font-semibold text-center my-5">Food Settings</h1>
      <form onSubmit={handleSubmit} className="flex justify-center gap-4 mb-4">
        <input
          className=" placeholder-gray-700 pl-2"
          placeholder="Enter Food Name"
          type="text"
          name="foodName"
          onChange={getInputData}
          value={input.foodName}
          required
        />

        <select
          className="text-black"
          name="type"
          onChange={getInputData}
          value={input.type}
        >
          <option value="veg">Veg</option>
          <option value="Non-veg">Non-Veg </option>
          <option value="Eggiterian">Eggiterian </option>
          <option value="Jain">Jain </option>
        </select>
        <select
          className="text-black"
          name="cusine"
          onChange={getInputData}
          value={input.cusine}
        >
          <option value="Indian">Indian</option>
          <option value="Chinese">Chinese</option>
          <option value="Tandoor">Tandoor</option>
          <option value="Fast Food">Fast Food</option>
        </select>
        <input
          className="text-black placeholder-gray-700 pl-2 w-24"
          placeholder="Price"
          type="number"
          name="price"
          min="0"
          onChange={getInputData}
          value={input.price || ""}
          required
        />
        <button type="submit" className="bg-blue-700 px-2 py-1 rounded">Update</button>
        <button type="button" onClick={()=>navigate(-1)} className="bg-red-700 px-2 py-1 rounded">Cancel</button>
      </form>

      <button onClick={()=>navigate(-1)} className="bg-sky-700 px-3 py-1 rounded">Go Back</button>
  </div>

  )
}

export default EditFood