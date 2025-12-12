import React from "react";
import { FaSearch, FaUserCircle, FaBell } from "react-icons/fa";
import { MdDashboard } from "react-icons/md";
import { IoLogOut } from "react-icons/io5";
import logo from "../../assets/images/logo.png";
import { useDispatch, useSelector } from "react-redux";
import { removeUser } from "../../Redux/slices/userSlice";
import { useNavigate } from "react-router-dom";
import { useMutation } from "@tanstack/react-query";
import { logout } from "../../https";

const Header = () => {
  const userData = useSelector((state) => state.user);
  const dispatch = useDispatch();
  const navigate = useNavigate();

 const logoutMutation = useMutation({
  mutationFn: logout,
  onSuccess: () => {
    dispatch(removeUser());
    navigate("/auth");
  },
  onError: (error) => {
    console.log(error);
  }
});
console.log("HEADER USER:", userData);


  const handleLogout = () => logoutMutation.mutate();

  return (
    <header className="flex justify-between items-center py-4 px-8 bg-[#1a1a1a]">
      
      {/* LOGO */}
      <div
        onClick={() => navigate("/")}
        className="flex items-center gap-2 cursor-pointer"
      >
        <img src={logo} className="h-8 w-8" alt="restro logo" />
        <h1 className="text-lg font-semibold text-[#f5f5f5] tracking-wide">
          Restro
        </h1>
      </div>

      {/* SEARCH */}
      <div className="flex items-center gap-4 bg-[#1f1f1f] rounded-[15px] px-5 py-2 flex-1 max-w-[500px] mx-10">
        <FaSearch className="text-[#f5f5f5]" />
        <input
          type="text"
          placeholder="Search"
          className="bg-[#1f1f1f] outline-none text-[#f5f5f5] w-full"
        />
      </div>

      {/* USER SECTION */}
      <div className="flex items-center gap-4">

        {/* Admin Dashboard Button */}
        {userData?.role === "Admin" && (
          <div
            onClick={() => navigate("/dashboard")}
            className="bg-[#1f1f1f] rounded-[15px] p-3 cursor-pointer"
          >
            <MdDashboard className="text-[#f5f5f5] text-2xl" />
          </div>
        )}

        {/* Notifications */}
        <div className="bg-[#1f1f1f] rounded-[15px] p-3 cursor-pointer">
          <FaBell className="text-[#f5f5f5] text-2xl" />
        </div>

        {/* User Info */}
        <div className="flex items-center gap-3">
          <FaUserCircle className="text-[#f5f5f5] text-4xl" />

          <div className="flex flex-col items-start">
            <h1 className="text-md text-[#f5f5f5] font-semibold tracking-wide">
              {userData?.name || "TEST USER"}
            </h1>
            <p className="text-xs text-[#ababab] font-medium">
              {userData?.role || "Role"}
            </p>
          </div>

          {/* Logout */}
          <IoLogOut
            onClick={handleLogout}
            className={`text-[#f5f5f5] ml-2 cursor-pointer ${
              logoutMutation.isPending && "opacity-50"
            }`}
            size={40}
          />
        </div>
      </div>
    </header>
  );
};

export default Header;
