import React, { useEffect, useRef, useState } from "react";
import { useSelector } from "react-redux";
import {
  getDownloadURL,
  getStorage,
  ref,
  uploadBytesResumable,
} from "firebase/storage";
import FormField from "../components/FormField";
import { app } from "../firebase";

const Profile = () => {
  const fileRef = useRef(null);
  const { currentUser } = useSelector((state) => state.user);
  const [file, setFile] = useState(undefined);
  const [filePercentage, setFilePercentage] = useState(0);
  const [fileUploadError, setFileUploadError] = useState(false);
  const [FormData, setFormData] = useState({});

  useEffect(() => {
    if (file) {
      handleFileChange(file);
    }
  }, [file]);
  useEffect(() => {
    console.log(FormData);
  }, [FormData]);

  const handleFileChange = (file) => {
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
      },
      async () => {
        const downloadURL = await getDownloadURL(uploadTask.snapshot.ref);
        console.log(downloadURL);
        setFormData({ ...FormData, avatar: downloadURL });
      }
    );
  };
  const handleChange = (e) => {};
  return (
    <div className="max-w-lg mx-auto p-2">
      <h1 className="text-center font-semibold text-3xl my-3">Profile</h1>
      <form className="flex flex-col gap-3">
        <input
          type="file"
          hidden
          ref={fileRef}
          accept="image/*"
          onChange={(e) => setFile(e.target.files[0])}
        />
        <img
          onClick={() => fileRef.current.click()}
          src={FormData.avatar || currentUser.avatar}
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
