import React from "react";
import { FaSearch } from "react-icons/fa";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";

const Header = () => {
  const { currentUser } = useSelector((state) => state.user);
  return (
    <header className="bg-slate-200 shadow-md">
      <div className="flex justify-between max-w-6xl items-center m-auto p-3">
        <Link to="/">
          <h1 className="font-bold flex flex-wrap text-sm sm:text-xl">
            <span className="text-blue-700">Real</span>
            <span className="text-red-500">Estate</span>
          </h1>
        </Link>
        <form className="bg-slate-100 rounded-lg w-24 sm:w-64 flex  justify-between px-2 items-center">
          <input
            placeholder="Search..."
            className="bg-transparent p-2 focus:outline-none "
          />
          <FaSearch />
        </form>
        <ul className="flex gap-4 ">
          <Link to="/">
            <li className="sm:inline hidden hover:underline text-gray-700 cursor-pointer">
              Home
            </li>
          </Link>
          <Link to="/about">
            <li className="sm:inline hidden hover:underline text-gray-700 cursor-pointer">
              About
            </li>
          </Link>
          <Link to="/sign-in">
            <li className="sm:inline hidden hover:underline text-gray-700 cursor-pointer">
              Sign In
            </li>
          </Link>
          {currentUser && (
            <img
              src={currentUser.avatar}
              className="rounded-full h-7 w-7 object-cover"
            />
          )}
        </ul>
      </div>
    </header>
  );
};

export default Header;
