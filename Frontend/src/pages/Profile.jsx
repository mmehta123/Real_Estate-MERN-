import React from "react";
import { useSelector } from "react-redux";
import FormField from "../components/FormField";
const Profile = () => {
  const { currentUser } = useSelector((state) => state.user);
  const handleChange = (e) => {};
  return (
    <div className="max-w-lg mx-auto p-2">
      <h1 className="text-center font-semibold text-3xl my-3">Profile</h1>
      <form className="flex flex-col gap-3">
        <img
          src={currentUser.avatar}
          className="rounded-full w-24 h-24 self-center cursor-pointer"
        />
        <FormField
          type="text"
          name="username"
          placeholder="Username"
          value={currentUser.username}
          onChange={handleChange}
        />
        <FormField
          type="email"
          name="email"
          placeholder="Email"
          value={currentUser.email}
          onChange={handleChange}
        />
        <FormField
          type="password"
          name="password"
          placeholder="Password"
          value=""
          onChange={handleChange}
        />
        <button
          type="submit"
          className=" text-white bg-[#6469ff] font-medium rounded-md text-sm w-full sm:w-auto px-5 py-2.5 text-center"
        >
          Update Profile
        </button>
      </form>
      <div className="flex justify-between my-2">
        <button className="text-red-600 cursor-pointer">Delete Account</button>
        <button className="text-red-600 cursor-pointer">Sign Out</button>
      </div>
    </div>
  );
};

export default Profile;
