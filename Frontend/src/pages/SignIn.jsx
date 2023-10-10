import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import Loader from "../components/Loader";
import FormField from "../components/FormField";
import {
  signInStart,
  signInSuccess,
  signInFail,
} from "../redux/user/userSlice";
import { useSelector, useDispatch } from "react-redux";
import Oauth from "../components/Oauth";

const SignIn = () => {
  const { loading, error } = useSelector((state) => state.user);
  const [userData, setUserData] = useState({
    email: "",
    password: "",
  });

  const Navigate = useNavigate();
  const Dispatch = useDispatch();

  const handleInputChange = (e) => {
    setUserData({ ...userData, [e.target.name]: e.target.value });
  };
  const handleSubmit = async (e) => {
    Dispatch(signInStart());
    e.preventDefault();
    try {
      const response = await axios.post("/api/auth/signin/", userData);
      if (response?.data.success == false) {
        Dispatch(signInFail(response?.data?.message));
      } else {
        Dispatch(signInSuccess(response.data));
        Navigate("/");
      }
    } catch (e) {
      Dispatch(signInFail(e?.response?.data?.message));
    }
  };
  return (
    <div className="max-w-lg mx-auto ">
      <h2 className=" text-3xl font-bold my-7 text-grey-900 text-center">
        Sign In
      </h2>
      {loading ? (
        <div className="flex justify-center">
          <Loader />
        </div>
      ) : (
        <form onSubmit={handleSubmit} className="flex flex-col gap-2">
          <FormField
            type="email"
            name="email"
            value={userData.email}
            handleChange={handleInputChange}
            placeholder="Email"
          />
          <FormField
            type="password"
            name="password"
            value={userData.password}
            handleChange={handleInputChange}
            placeholder="Password"
          />
          <button
            type="submit"
            className=" text-white bg-[#6469ff] font-medium rounded-md text-sm w-full sm:w-auto px-5 py-2.5 text-center"
          >
            Sign In
          </button>
          <Oauth />
          <div className="flex">
            <p>Don't have an account?</p>
            <Link to="/sign-up">
              <span className="ml-1 text-blue-500">Sign Up</span>
            </Link>
          </div>
          {error && <span className="text-red-500">{error}</span>}
        </form>
      )}
    </div>
  );
};

export default SignIn;
