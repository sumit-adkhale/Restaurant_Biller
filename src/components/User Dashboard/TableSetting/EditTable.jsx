import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import { FetchOneTable, updateTable } from "../../../Store/Slice";
import Swal from "sweetalert2";

function EditTable() {
  const { id } = useParams();
  const dispatch = useDispatch();
  const navigate = useNavigate();

  // ✅ Initialize state correctly
  const [tableData, setTableData] = useState({
    id: "",
    tablename: "",
    isTableEmpty: true,
    username: "",
  });

  useEffect(() => {
    async function fetchData() {
      const result = await dispatch(FetchOneTable(id));
      if (result.payload) {
        setTableData(result.payload); // ✅ Set the full object
      }
    }
    fetchData();
  }, [dispatch, id]);

  const handleChange = (e) => {
    setTableData({ ...tableData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    Swal.fire({
      title: "Are you sure?",
      text: "Do you want to Update!",
      icon: "question",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, Update!",
    }).then(async (result) => {
      if (result.isConfirmed) {
        Swal.fire({
          title: "Updated!",
          text: "Item Updated Successfully.",
          icon: "success",
        });

        try {
          await dispatch(updateTable(tableData)).unwrap();
          navigate(-1); // ✅ Navigate after successful update
        } catch (error) {
          console.error("Update failed:", error);
        }
        return false;
      }
    });
  };

  return (
    <div className="w-1/2 mx-auto my-6 py-5 px-8 bg-zinc-800 rounded-xl shadow-md shadow-orange-300">
      <h1 className="text-2xl font-semibold text-center my-5">Edit Table</h1>
      <form onSubmit={handleSubmit} className="flex justify-center gap-4 mb-4">
        <input
          className="placeholder-gray-700 pl-2"
          placeholder="Enter Table Name / No."
          type="text"
          name="tablename"
          onChange={handleChange}
          value={tableData.tablename || ""}
        />
        <button type="submit" className="bg-blue-700 px-2 py-1 rounded">
          Update
        </button>
        <button
          type="button"
          onClick={() => navigate(-1)}
          className="bg-red-700 px-2 py-1 rounded"
        >
          Cancel
        </button>
      </form>

      <button
        onClick={() => navigate(-1)}
        className="bg-sky-700 px-3 py-1 rounded"
      >
        Go Back
      </button>
    </div>
  );
}

export default EditTable;
