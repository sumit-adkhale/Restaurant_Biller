import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { addUser, deleteUser, fetchUser, editOneUser } from "../../Store/Slice";
import { FaEyeSlash } from "react-icons/fa";
import { FaEye } from "react-icons/fa";
import Loading from "../Other Components/Loading";
import Swal from "sweetalert2";

function UserSettings() {
  const dispatch = useDispatch();

  const navigate = useNavigate();

  const { users, usersLoding } = useSelector((state) => state.restaurant);

  const [showPass, setShowPass] = useState({});
  const [editUser, setEditUser] = useState(false);

  useEffect(() => {
    dispatch(fetchUser());
  }, [dispatch]);
  const [ids, setIds] = useState("");
  const [input, setInput] = useState({
    id: "",
    username: "",
    password: ""
  });

  const handleSubmit = async (e) => {
    e.preventDefault();

    Swal.fire({
      title: "Are you sure?",
      text: "Do you want to Add User!",
      icon: "question",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, Add!",
    }).then(async(result) => {
      if (result.isConfirmed) {
        Swal.fire({
          title: "User Added!",
          text: "User Added Successfully.",
          icon: "success",
        });
    const allIds = users.map((data) => Number(data.id)); // Ensure IDs are numbers
    const maxId = allIds.length > 0 ? Math.max(...allIds) : 0; // Handle empty array
    const newId = maxId + 1;
    setIds(newId);
    const newInput = { ...input, id: newId.toString() };

    try {
      await dispatch(addUser(newInput)); // ✅ Dispatch the new food item

      dispatch(fetchUser());
      setInput({
        id: "",
        username: "",
        password: ""
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
          text: "User Deleted Successfully.",
          icon: "success",
        });
    try {
        await dispatch(deleteUser(id));
    } catch (error) {
      console.error("Error Deleting table:", error);
    }
      }
    });
  };

  const injectData=(id)=>{
    users.map((data)=>{
      if(data.id===id){
        setInput({
          id:data.id,
          username:data.username,
          password:data.password
        })
      }
    })
  }
  const cancelEdit=()=>{
    setEditUser(!editUser)
    setInput({
        id:"",
        username:"",
        password:""
      })
  }

  const EditSubmit=async(e)=>{
    e.preventDefault();

        Swal.fire({
          title: "Are you sure?",
          text: "Do you want to Update User!",
          icon: "question",
          showCancelButton: true,
          confirmButtonColor: "#3085d6",
          cancelButtonColor: "#d33",
          confirmButtonText: "Yes, Update!",
        }).then((result) => {
          if (result.isConfirmed) {
            Swal.fire({
              title: "Updated!",
              text: "User is Updated Successfully.",
              icon: "success",
            });
            localStorage.clear();
            navigate("/login");
            window.location.reload();
          }
        });
    

    try {
        await dispatch(editOneUser({id:input.id,data:input})); // ✅ Dispatch the new food item
  
        dispatch(fetchUser());
        setInput({
          id: "",
          username: "",
          password: ""
        });
      } catch (error) {
        console.error("Error adding food:", error);
      }
  }
  return (
    <div className="w-full px-[15vw]">
      <h1 className="text-2xl font-semibold text-center my-5">
        {editUser?"Edit":""} Users Settings
      </h1>
      <form onSubmit={editUser?EditSubmit:handleSubmit} className="flex justify-center gap-4 mb-4">
        <input
          className=" placeholder-gray-700 pl-2 rounded-md
                         border-gray-300 border-1 focus:outline-none
                          focus:border-blue-500"
          placeholder="Enter usename"
          type="text"
          name="username"
          required
          onChange={(e) => {
            setInput({ ...input, [e.target.name]: e.target.value });
          }}
          value={input.username}
        />
        <div className="relative">
        <input
          className=" placeholder-gray-700 pl-2 rounded-md
                         border-gray-300 border-1 focus:outline-none
                          focus:border-blue-500"
                          minLength={8}
                          pattern="(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,}" title="Must contain at least one number and one uppercase and lowercase letter, and at least 8 or more characters"
          placeholder="Enter password"
          type={showPass ? "password" : "text"}
          name="password"
          required
          onChange={(e) => {
            setInput({ ...input, [e.target.name]: e.target.value });
          }}
          value={input.password}
        />
        <div
          className="cursor-pointer flex items-center absolute top-1 right-3"
          onClick={() => {
            setShowPass(!showPass);
            
          }}
        >
          {showPass ? <FaEye /> : <FaEyeSlash className="text-lg" />}
        </div>
        </div>
        <button className="bg-blue-500 hover:bg-blue-700  px-2 py-1 rounded">
        {editUser?"Update":"Add"}
        </button>
        {editUser&&<div onClick={cancelEdit} className="bg-red-500 hover:bg-red-700  px-2 py-1 rounded">
          cancel
        </div>}
      </form>
          <div className={`${editUser?"hidden":""}`}>
      {usersLoding && <Loading />}
      {!usersLoding && (
        <table className="w-full text-center">
          <thead className=" border-b-2">
            <tr className="font-semibold ">
              <td className="py-2">Sr. No.</td>
              <td>User Name</td>
              <td className="">Password</td>
              <td>Action</td>
            </tr>
          </thead>

          <tbody>
            {users &&
              users.map((data, index) => {
                return (
                  <tr className="border-b-1 " key={data.id}>
                    <td className="py-2 ">{index + 1}</td>
                    <td>{data.username}</td>
                    <td className="pl-12">
                      {showPass[data.id] ? data.password : "********"}
                      <button
                        className="cursor-pointer mx-2"
                        onClick={() =>
                          setShowPass((prev) => ({
                            ...prev,
                            [data.id]: !prev[data.id],
                          }))
                        }
                      >
                        {showPass[data.id] ?  (
                          <FaEyeSlash className="text-lg" />
                        ):(
                          <FaEye className="text-lg"/>
                        ) }
                      </button>
                    </td>
                    <td>
                      <button
                        onClick={() => {
                            setEditUser(true)
                            injectData(data.id)
                        }}
                        className="bg-blue-600 mx-2 px-2 rounded hover:bg-blue-700"
                      >
                        Edit
                      </button>
                      <button
                        onClick={() => handleDelete(data.id)}
                        className="bg-red-600 px-2 rounded hover:bg-red-700"
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
    </div>
  );
}

export default UserSettings;
