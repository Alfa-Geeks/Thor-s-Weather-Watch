import React from "react";
import { useNavigate } from "react-router-dom";

const Header = ({ userData }) => {
  // console.log(userData);
  const navigate = useNavigate();

  const logout = () => {
    sessionStorage.removeItem("accessToken");
    navigate("/login");
  };
  return (
    <>
      <div className="bg-gray-900 px-3 py-5 flex justify-between">
        <div className="text-white text-xl my-auto flex">
          <img
            src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcToiRnzzyrDtkmRzlAvPPbh77E-Mvsk3brlxQ&s"
            alt=""
            className="w-14 h-14 rounded-full selection:scale-150 mx-9"
          />
          <p className="my-auto">Hi {userData.username}</p>
        </div>
        <div className="text-white text-xl flex gap-6 my-auto mx-16">
          <p className="hover:cursor-pointer my-auto">Home</p>
          <p className="hover:cursor-pointer my-auto">Profile</p>
          <button
            className=" border-gray-50 border-2 rounded-lg hover:bg-gray-800 px-3 py-2 my-auto
            text-xl font-semibold dark:text-white mr-16"
            onClick={logout}
          >
            Log Out
          </button>
        </div>
      </div>
    </>
  );
};

export default Header;
