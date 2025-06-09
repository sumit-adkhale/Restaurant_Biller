import React, { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchAdmin, fetchUser } from "../../Store/Slice";
import { useNavigate } from "react-router-dom";
import { FaEyeSlash } from "react-icons/fa";
import { FaEye } from "react-icons/fa";
import { toast } from "react-toastify";
import { MdOutlineContentCopy } from "react-icons/md";
import { TiTick } from "react-icons/ti";

function Login() {
  const navigate = useNavigate();
  const [input, setInput] = useState({
    username: "",
    password: "",
  });

  const userNameRef = useRef();
  const [userNameCopied, setUserNameCopied] = useState(true);

  const userpasswordRef = useRef();
  const [userPasswordCopied, setUserPasswordCopied] = useState(true);
  
  const adminUserNameRef = useRef();
  const [adminUserNameCopied, setAdminUserNameCopied] = useState(true);

  const adminPasswordRef = useRef();
  const [adminPasswordCopied, setAdminPasswordCopied] = useState(true);
  

  const [showPass, setShowPass] = useState({});

  const [showLogin, setShowLogin] = useState(false);

  const dispatch = useDispatch();
  const { users, admin, status, error } = useSelector(
    (state) => state.restaurant
  );

  useEffect(() => {
    try {
      const userdata = dispatch(fetchUser());
      const admindata = dispatch(fetchAdmin());
    } catch (err) {
      console.log(err);
    }
  }, []);

  const handleSumit = (e) => {
    e.preventDefault();
    handleLogin(input);
    setInput({
      username: "",
      password: "",
    });
  };
  const handleLogin = (input) => {
    let userFound = false;
    // Check users for a match
    for (const user of users) {
      if (
        user.username === input.username &&
        user.password === input.password
      ) {
        userFound = true;
        toast.success("User Login Successfully");
        localStorage.setItem("user", JSON.stringify(input.username));
        localStorage.setItem("position", "user");
        navigate("/user");
        return; // Exit the function after successful login
      }
    }

    // Check admins for a match
    for (const admins of admin) {
      if (
        admins.username === input.username &&
        admins.password === input.password
      ) {
        userFound = true;
        toast.success("Admin Login Successfully");
        localStorage.setItem("user", JSON.stringify(input.username));
        localStorage.setItem("position", "admin");
        navigate("/admin");
        return; // Exit the function after successful login
      }
    }

    // If no match is found
    if (!userFound) {
      toast.error("Invalid Credentials");
    }
  };

  return (
    <div className="relative">
      <div className="flex w-full flex-wrap">
        <div className="flex w-full flex-col md:w-1/2 lg:w-1/3">
          <div className="my-auto flex flex-col justify-center px-6 pt-8 sm:px-24 md:justify-start md:px-8 md:pt-0 lg:px-12">
            <p className="text-center text-3xl font-bold">Welcome</p>
            <p className="mt-2 text-center">Login to access your account.</p>
            <form onSubmit={handleSumit} className="flex flex-col pt-3 md:pt-8">
              <div className="flex flex-col pt-4">
                <div className="relative flex overflow-hidden rounded-lg border focus-within:border-transparent focus-within:ring-2 transition focus-within:ring-blue-600">
                  <span className="inline-flex items-center border-r border-gray-300 bg-white px-3 text-sm text-gray-500 shadow-sm">
                    <svg
                      width="15"
                      height="15"
                      fill="currentColor"
                      viewBox="0 0 1792 1792"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path d="M1792 710v794q0 66-47 113t-113 47h-1472q-66 0-113-47t-47-113v-794q44 49 101 87 362 246 497 345 57 42 92.5 65.5t94.5 48 110 24.5h2q51 0 110-24.5t94.5-48 92.5-65.5q170-123 498-345 57-39 100-87zm0-294q0 79-49 151t-122 123q-376 261-468 325-10 7-42.5 30.5t-54 38-52 32.5-57.5 27-50 9h-2q-23 0-50-9t-57.5-27-52-32.5-54-38-42.5-30.5q-91-64-262-182.5t-205-142.5q-62-42-117-115.5t-55-136.5q0-78 41.5-130t118.5-52h1472q65 0 112.5 47t47.5 113z"></path>
                    </svg>
                  </span>
                  <input
                    value={input.username}
                    onChange={(e) =>
                      setInput({ ...input, [e.target.name]: e.target.value })
                    }
                    type="text"
                    name="username"
                    className="w-full flex-1 appearance-none border-gray-300 bg-white py-2 px-4 text-base text-gray-700 placeholder-gray-400  focus:outline-none"
                    placeholder="Username"
                  />
                </div>
              </div>
              <div className="mb-12 flex flex-col pt-4">
                <div className="relative flex overflow-hidden rounded-lg border focus-within:border-transparent focus-within:ring-2 transition focus-within:ring-blue-600">
                  <span className="inline-flex items-center border-r border-gray-300 bg-white px-3 text-sm text-gray-500 shadow-sm">
                    <svg
                      width="15"
                      height="15"
                      fill="currentColor"
                      viewBox="0 0 1792 1792"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path d="M1376 768q40 0 68 28t28 68v576q0 40-28 68t-68 28h-960q-40 0-68-28t-28-68v-576q0-40 28-68t68-28h32v-320q0-185 131.5-316.5t316.5-131.5 316.5 131.5 131.5 316.5q0 26-19 45t-45 19h-64q-26 0-45-19t-19-45q0-106-75-181t-181-75-181 75-75 181v320h736z"></path>
                    </svg>
                  </span>
                  <input
                    value={input.password}
                    onChange={(e) =>
                      setInput({ ...input, [e.target.name]: e.target.value })
                    }
                    type={showPass ? "password" : "text"}
                    name="password"
                    className="w-full flex-1 appearance-none border-gray-300 bg-white py-2 px-4 text-base text-gray-700 placeholder-gray-400  focus:outline-none"
                    placeholder="Password"
                  />
                  <div
                    className="cursor-pointer flex items-center absolute top-3 right-3"
                    onClick={() => {
                      setShowPass(!showPass);
                    }}
                  >
                    {showPass ? (
                      <FaEye className="text-lg text-blue-500" />
                    ) : (
                      <FaEyeSlash className="text-lg text-blue-500" />
                    )}
                  </div>
                </div>
              </div>
              <button
                type="submit"
                className="w-full rounded-lg bg-blue-700 px-4 py-2 text-center text-base font-semibold text-white shadow-md transition ease-in hover:bg-blue-600 focus:outline-none focus:ring-2"
              >
                <span className="w-full"> Submit </span>
              </button>
            </form>
            <button
              onClick={() => {
                setShowLogin((prev) => !prev);
              }}
              className="py-2 mt-4 hover:border hover:animate-pulse rounded-xl text-center bg-gradient-to-r from-[#2A7B9B] via-[#57C785] to-[#EDDD53]"
            >
              {showLogin
                ? "Hide Credentials"
                : "Click Here To Get Login Credentials"}
            </button>
          </div>
        </div>
        <div className="pointer-events-none hidden select-none bg-black shadow-2xl md:block md:w-1/2 lg:w-2/3">
          <img
            className="h-full w-full object-cover opacity-90"
            src="login_img.jpg"
          />
        </div>
      </div>
      <div
        className={` h-[50vh] w-[50vw] flex justify-around rounded-xl bg-white/30 backdrop-blur-sm absolute top-10 right-7 ${
          showLogin ? "" : "hidden"
        }`}
      >
        <div className="flex flex-col w-[50%] justify-center items-center">
          <h1 className="text-2xl font-semibold text-black">Billing Desk Login</h1>
          <h2>Username</h2>
          <div class="relative w-full mb-3 max-w-[16rem]">
            <input
              ref={userNameRef}
              type="text"
              class="col-span-6 bg-gray-50 border border-gray-300 text-gray-500 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full px-2.5 py-4 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-gray-400 dark:focus:ring-blue-500 dark:focus:border-blue-500"
              value="user1"
              disabled
              readonly
            />
            <button
              onClick={() => {
                window.navigator.clipboard.writeText(userNameRef.current.value);
                setUserNameCopied(false);
              }}
              className="absolute end-2.5 top-1/2 -translate-y-1/2 text-gray-900 dark:text-gray-400 hover:bg-gray-100 dark:bg-gray-800 dark:border-gray-600 dark:hover:bg-gray-700 rounded-lg py-2 px-2.5 inline-flex items-center justify-center bg-white border-gray-200 border h-8"
            >
              <span class="inline-flex items-center">
                {userNameCopied ? <MdOutlineContentCopy /> : <TiTick />}
                <span class="text-xs font-semibold ml-1">
                  {userNameCopied ? "Copy" : "Copied"}
                </span>
              </span>
            </button>
          </div>

          <h2>Password</h2>
          <div class="relative w-full max-w-[16rem]">
            <input
              ref={userpasswordRef}
              type="text"
              class="col-span-6 bg-gray-50 border border-gray-300 text-gray-500 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full px-2.5 py-4 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-gray-400 dark:focus:ring-blue-500 dark:focus:border-blue-500"
              value="user123"
              disabled
              readonly
            />
            <button
              onClick={() => {
                window.navigator.clipboard.writeText(userpasswordRef.current.value);
                setUserPasswordCopied(false);
              }}
              className="absolute end-2.5 top-1/2 -translate-y-1/2 text-gray-900 dark:text-gray-400 hover:bg-gray-100 dark:bg-gray-800 dark:border-gray-600 dark:hover:bg-gray-700 rounded-lg py-2 px-2.5 inline-flex items-center justify-center bg-white border-gray-200 border h-8"
            >
              <span class="inline-flex items-center">
                {userPasswordCopied ? <MdOutlineContentCopy /> : <TiTick />}
                <span class="text-xs font-semibold ml-1">
                  {userPasswordCopied ? "Copy" : "Copied"}
                </span>
              </span>
            </button>
          </div>
        </div>
        <div className="flex flex-col justify-center items-center w-[50%]">
          <h1 className="text-2xl font-semibold text-black">Manager / Owner Login</h1>
          <h2>Username</h2>
          <div class="relative w-full max-w-[16rem] mb-3">
            <input
              ref={adminUserNameRef}
              type="text"
              class="col-span-6 bg-gray-50 border border-gray-300 text-gray-500 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full px-2.5 py-4 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-gray-400 dark:focus:ring-blue-500 dark:focus:border-blue-500"
              value="admin1"
              disabled
              readonly
            />
            <button
              onClick={() => {
                window.navigator.clipboard.writeText(adminUserNameRef.current.value);
                setAdminUserNameCopied(false);
              }}
              className="absolute end-2.5 top-1/2 -translate-y-1/2 text-gray-900 dark:text-gray-400 hover:bg-gray-100 dark:bg-gray-800 dark:border-gray-600 dark:hover:bg-gray-700 rounded-lg py-2 px-2.5 inline-flex items-center justify-center bg-white border-gray-200 border h-8"
            >
              <span class="inline-flex items-center">
                {adminUserNameCopied ? <MdOutlineContentCopy /> : <TiTick />}
                <span class="text-xs font-semibold ml-1">
                  {adminUserNameCopied ? "Copy" : "Copied"}
                </span>
              </span>
            </button>
          </div>

          <h2>Password</h2>
          <div class="relative w-full max-w-[16rem]">
            <input
              ref={adminPasswordRef}
              type="text"
              class="col-span-6 bg-gray-50 border border-gray-300 text-gray-500 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full px-2.5 py-4 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-gray-400 dark:focus:ring-blue-500 dark:focus:border-blue-500"
              value="admin123"
              disabled
              readonly
            />
            <button
              onClick={() => {
                window.navigator.clipboard.writeText(adminPasswordRef.current.value);
                setAdminPasswordCopied(false);
              }}
              className="absolute end-2.5 top-1/2 -translate-y-1/2 text-gray-900 dark:text-gray-400 hover:bg-gray-100 dark:bg-gray-800 dark:border-gray-600 dark:hover:bg-gray-700 rounded-lg py-2 px-2.5 inline-flex items-center justify-center bg-white border-gray-200 border h-8"
            >
              <span class="inline-flex items-center">
                {adminPasswordCopied ? <MdOutlineContentCopy /> : <TiTick />}
                <span class="text-xs font-semibold ml-1">
                  {adminPasswordCopied ? "Copy" : "Copied"}
                </span>
              </span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Login;
