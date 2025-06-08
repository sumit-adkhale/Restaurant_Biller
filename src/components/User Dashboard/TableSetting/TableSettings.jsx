import React, { useEffect, useMemo, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { addTable, deleteTable, fetchTableDetails } from "../../../Store/Slice";
import Loading from "../../Other Components/Loading";
import Swal from "sweetalert2";

function TableSettings() {
  const dispatch = useDispatch();

  const navigate = useNavigate();

  const { tableDetails, tableLoading } = useSelector(
    (state) => state.restaurant
  );

  useEffect(() => {
    dispatch(fetchTableDetails());
  }, [dispatch]);
  const [ids, setIds] = useState("");
  const [input, setInput] = useState({
    id: "",
    tablename: "",
    isTableEmpty: true,
    username: name,
  });
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
          text: "Table Added Successfully.",
          icon: "success",
        });
    const allIds = tableDetails.map((data) => Number(data.id)); // Ensure IDs are numbers
    const maxId = allIds.length > 0 ? Math.max(...allIds) : 0; // Handle empty array
    const newId = maxId + 1;

    setIds(newId);
    const newInput = { ...input, id: newId.toString() };

    try {
      await dispatch(addTable(newInput)); // ✅ Dispatch the new food item

      dispatch(fetchTableDetails());
      setInput({
        id: "",
        tablename: "",
        isTableEmpty: true,
        username: name,
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
          text: "Table Deleted Successfully.",
          icon: "success",
        });
    try {
      const currentTable=tableDetails.filter((data)=>data.id===id)
      if(currentTable[0].isTableEmpty){
        await dispatch(deleteTable(id));
      }else{
        alert("Table is Occupied")
      }
      
      // dispatch(fetchTableDetails());
    } catch (error) {
      console.error("Error Deleting table:", error);
    }  }
    });



    
  };

  return (
    <div className="w-1/2 mx-auto my-6 py-5 px-8 bg-zinc-800 rounded-xl shadow-md shadow-orange-300">
      <h1 className="text-2xl font-semibold text-center my-5">
        Table Settings
      </h1>
      <form onSubmit={handleSubmit} className="flex justify-center gap-4 mb-4">
        <input
          className=" placeholder-gray-700 pl-2 rounded-md
                         border-gray-300 border-1 focus:outline-none
                          focus:border-blue-500"
          placeholder="Enter Name /No. Here"
          type="text"
          name="tablename"
          required
          onChange={(e) => {
            setInput({ ...input, [e.target.name]: e.target.value });
          }}
          value={input.tablename}
        />
        <button className="bg-blue-500 hover:bg-blue-700  px-2 py-1 rounded">
          Add
        </button>
      </form>
      {tableLoading && <Loading />}
      {!tableLoading && (
        <table className="w-full text-center">
          <thead className=" border-b-2">
            <tr className="font-semibold ">
              <td className="px-6 py-2">Sr. No.</td>
              <td>Table Name</td>
              <td>Action</td>
            </tr>
          </thead>

          <tbody className=" ">
            {tableDetails &&
              tableDetails.map((data, index) => {
                return (
                  <tr className="border-b-1 " key={data.id}>
                    <td className="px-6 py-2">{index + 1}</td>
                    <td>{data.tablename}</td>
                    <td>
                      <button
                        onClick={() => {
                          navigate(`/user/EditTable/${data.id}`);
                        }}
                        className="bg-blue-700 mx-2 px-2 rounded"
                      >
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
              })}
          </tbody>
        </table>
      )}
    </div>
  );
}

export default TableSettings;
