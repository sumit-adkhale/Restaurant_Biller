import React from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import Swal from "sweetalert2";

function DashboardHeader() {
  const navigate = useNavigate();
  const name = JSON.parse(localStorage.getItem("user"));

  const handleLogout = () => {
    // localStorage.removeItem("position")
    // localStorage.removeItem("user")
    Swal.fire({
      title: "Are you sure?",
      text: "Do you want to Logout!",
      icon: "question",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, Logout!",
    }).then((result) => {
      if (result.isConfirmed) {
        Swal.fire({
          title: "Loggedout!",
          text: "Your Account is logged Out.",
          icon: "success",
        });
        localStorage.clear();
        navigate("/login");
        window.location.reload();
      }
    });

    // localStorage.clear();
    // navigate("/login");

    // window.location.reload();
  };
  return (
    <div className="flex justify-between items-center">
      <h1 className="text-2xl">
        Hello, <br /> <span className="text-3xl font-semibold">{name}👋</span>
      </h1>
      {/* <div className='flex macondo-regular text-center justify-center text-5xl my-4'>
        Restaurant Biller
    </div> */}
      <button onClick={handleLogout} className="px-3 py-2 bg-red-600">
        Log Out
      </button>
    </div>
  );
}

export default DashboardHeader;
