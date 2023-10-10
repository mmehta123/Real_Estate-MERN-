import React from "react";
import { GoogleAuthProvider, getAuth, signInWithPopup } from "firebase/auth";
import { app } from "../firebase";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { signInSuccess } from "../redux/user/userSlice";

const Oauth = () => {
  const dispatch = useDispatch();
  const Navigate = useNavigate();
  const handleOauthSubmit = async (e) => {
    e.preventDefault();
    try {
      const provider = new GoogleAuthProvider();
      const auth = getAuth(app);
      const result = await signInWithPopup(auth, provider);
      const response = await axios.post("/api/auth/google", {
        name: result.user.displayName,
        email: result.user.email,
        photo: result.user.photoURL,
      });
      dispatch(signInSuccess(response.data));
      Navigate("/");
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <button
      type="button"
      className=" text-white bg-[#b83939] font-medium rounded-md text-sm w-full sm:w-auto px-5 py-2.5 text-center"
      onClick={handleOauthSubmit}
    >
      Continue With Google
    </button>
  );
};

export default Oauth;
