import React, { useEffect, useRef, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import axios from "axios";
import { Navigate, useNavigate } from "react-router-dom";
import {
  getDownloadURL,
  getStorage,
  ref,
  uploadBytesResumable,
} from "firebase/storage";
import FormField from "../components/FormField";
import { app } from "../firebase";
import {
  updateStart,
  updateSuccess,
  updateFail,
  deleteStart,
  deleteSuccess,
  deleteFail,
  signOutStart,
  signOutSuccess,
} from "../redux/user/userSlice";
import Loader from "../components/Loader";
import SignIn from "./SignIn";
import CreateListing from "./CreateListing";

const Profile = () => {
  const fileRef = useRef(null);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { currentUser, loading, error } = useSelector((state) => state.user);
  const [file, setFile] = useState(undefined);
  const [filePercentage, setFilePercentage] = useState(0);
  const [fileUploadError, setFileUploadError] = useState(false);
  const [uploading, setUploading] = useState(false);
  const [updateUserSuccess, setUpdateUserSuccess] = useState(false);
  const [formData, setFormData] = useState({
    email: currentUser.email,
    password: "",
    avatar: currentUser.avatar,
    username: currentUser.username,
  });

  useEffect(() => {
    if (file) {
      handleFileChange(file);
    }
  }, [file]);

  const handleFileChange = (file) => {
    setUploading(true);
    const storage = getStorage(app);
    const fileName = new Date().getTime() + file.name;
    const storageRef = ref(storage, fileName);
    const uploadTask = uploadBytesResumable(storageRef, file);
    uploadTask.on(
      "state_changed",
      (snapshot) => {
        const progress =
          (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
        setFilePercentage(Math.round(progress));
      },
      (error) => {
        setFileUploadError(true);
        setUploading(false);
      },
      async () => {
        const downloadURL = await getDownloadURL(uploadTask.snapshot.ref);
        setFormData({ ...formData, avatar: downloadURL });
        setUploading(false);
      }
    );
  };
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };
  const handleDelete = async () => {
    dispatch(deleteStart());
    try {
      const response = await axios.delete(
        `/api/user/delete/${currentUser._id}`
      );
      dispatch(deleteSuccess());
      <Navigate to={<SignIn />} />;
    } catch (e) {
      dispatch(deleteFail(e.response.data.message));
    }
  };
  const handleSignOut = async () => {
    dispatch(signOutStart());
    try {
      await axios.get("/api/auth/signout");
      dispatch(signOutSuccess());
      <Navigate to={<SignIn />} />;
    } catch (error) {
      dispatch(signOutFail(error.response.data.message));
    }
  };
  const handleCreateListing = () => {
    // <Navigate to={<CreateListing/>} /> //Not working??
    navigate("/create-listing");
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    dispatch(updateStart());
    setUpdateUserSuccess(false);
    try {
      const response = await axios.post(
        `/api/user/update/${currentUser._id}`,
        formData
      );
      if (response.success === false) {
        dispatch(updateFail(response.data.message));
        return;
      }
      dispatch(updateSuccess(response.data));
      setUpdateUserSuccess(true);
    } catch (error) {
      dispatch(updateFail(error.message));
      setUpdateUserSuccess(false);
    }
  };
  return (
    <div className="max-w-lg mx-auto p-2">
      <h1 className="text-center font-semibold text-3xl my-3">Profile</h1>
      <form onSubmit={handleSubmit} className="flex flex-col gap-3">
        <input
          type="file"
          hidden
          ref={fileRef}
          accept="image/*"
          onChange={(e) => setFile(e.target.files[0])}
        />
        <img
          onClick={() => fileRef.current.click()}
          src={formData.avatar || currentUser.avatar}
          className="rounded-full w-24 h-24 self-center cursor-pointer"
        />
        <p className="text-center">
          {fileUploadError ? (
            <span className="text-red-500 ">Error while uploading</span>
          ) : filePercentage > 0 && filePercentage < 100 ? (
            <span className="text-slate-500">
              Uploading File {filePercentage}%
            </span>
          ) : filePercentage == 100 ? (
            <span className="text-green-500">File Uploaded Succesfully</span>
          ) : (
            "Click on image to Change/Create profile picture"
          )}
        </p>
        <FormField
          type="text"
          name="username"
          placeholder="Username"
          value={formData.username}
          handleChange={handleChange}
        />
        <FormField
          type="email"
          name="email"
          placeholder="Email"
          value={formData.email}
          handleChange={handleChange}
        />
        <FormField
          type="password"
          name="password"
          notRequired
          placeholder="Password"
          value={formData.password}
          handleChange={handleChange}
        />
        {loading || uploading ? (
          <div className="flex justify-center items-center">
            <Loader />
          </div>
        ) : (
          <button
            type="submit"
            className=" text-white bg-[#6469ff] font-medium rounded-md text-sm w-full sm:w-auto px-5 py-2.5 text-center disabled:bg-slate-500"
          >
            Update Profile
          </button>
        )}
        <button
          type="button"
          onClick={handleCreateListing}
          className=" text-white bg-[#3b8f27] font-medium rounded-md text-sm w-full sm:w-auto px-5 py-2.5 text-center disabled:bg-slate-500"
        >
          Create Listing
        </button>
      </form>
      <div className="flex justify-between my-2">
        <button className="text-red-600 cursor-pointer" onClick={handleDelete}>
          Delete Account
        </button>
        <button className="text-red-600 cursor-pointer" onClick={handleSignOut}>
          Sign Out
        </button>
      </div>
      <p className="text-red-500 mt-2">{error ? error : " "}</p>
      <p className="text-green-500 mt-2">
        {updateUserSuccess && !error ? "User updated succesfully" : " "}
      </p>
    </div>
  );
};

export default Profile;
