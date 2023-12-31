import { useEffect, useState } from "react";
import { FaSearch } from "react-icons/fa";
import { Link, useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";

const Header = () => {
  const { currentUser } = useSelector((state) => state.user);
  const [searchString, setSearchString] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    const urlParams = new URLSearchParams(location.search);
    const searchTermFromUrl = urlParams.get("search");
    if (searchTermFromUrl) {
      setSearchString(searchTermFromUrl);
    }
  }, [location.search]);

  const handleSubmit = (e) => {
    e.preventDefault();
    const urlParams = new URLSearchParams(location.search);
    urlParams.set("search", searchString);
    const searchQuery = urlParams.toString();
    navigate(`/search?${searchQuery}`);
  };
  return (
    <header className="bg-slate-200 shadow-md ">
      <div className="flex justify-between max-w-6xl items-center m-auto p-3">
        <Link to="/">
          <h1 className="font-bold flex flex-wrap text-sm sm:text-xl">
            <span className="text-blue-700">Real</span>
            <span className="text-red-500">Estate</span>
          </h1>
        </Link>
        <form
          onSubmit={handleSubmit}
          className="bg-slate-100 rounded-lg w-24 sm:w-64 flex  justify-between px-2 items-center"
        >
          <input
            onChange={(e) => setSearchString(e.target.value)}
            placeholder="Search..."
            value={searchString}
            className="bg-transparent p-2 focus:outline-none "
          />
          <button>
            <FaSearch />
          </button>
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
          {!currentUser && (
            <Link to="/sign-in">
              <li className="sm:inline hidden hover:underline text-gray-700 cursor-pointer">
                Sign In
              </li>
            </Link>
          )}
          <Link to="/profile">
            {currentUser && (
              <img
                src={currentUser.avatar}
                className="rounded-full h-7 w-7 object-cover"
              />
            )}
          </Link>
        </ul>
      </div>
    </header>
  );
};

export default Header;
