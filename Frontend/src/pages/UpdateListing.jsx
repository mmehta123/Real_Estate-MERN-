import axios from "axios";
import {
  getDownloadURL,
  getStorage,
  ref,
  uploadBytesResumable,
} from "firebase/storage";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import FormField from "../components/FormField";
import Loader from "../components/Loader";
import { app } from "../firebase";

const UpdateListing = () => {
  const { currentUser } = useSelector((state) => state.user);
  const Navigate = useNavigate();
  const Params = useParams();
  const [formData, setFormData] = useState({
    name: "",
    description: "",
    address: "",
    imageUrls: [],
    type: "rent",
    bedrooms: 1,
    bathrooms: 1,
    offer: false,
    parking: false,
    furnished: false,
    regularPrice: 0,
    discountedPrice: 0,
    userRef: currentUser._id,
  });
  const [files, setFiles] = useState([]);
  const [imageUploadError, setImageUploadError] = useState("");
  const [uploading, setUploading] = useState(false);
  const [loading, setloading] = useState(false);
  const [error, setError] = useState("");

  const handleInputChange = (e) => {
    if (e.target.id === "sale" || e.target.id === "rent") {
      setFormData({ ...formData, type: e.target.id });
    }
    if (
      e.target.name === "parking" ||
      e.target.name === "offer" ||
      e.target.name === "furnished"
    ) {
      setFormData({ ...formData, [e.target.name]: e.target.checked });
    }
    if (
      e.target.type === "number" ||
      e.target.type === "text" ||
      e.target.type === "textarea"
    )
      setFormData({ ...formData, [e.target.name]: e.target.value });
  };
  useEffect(() => {
    const fetchListings = async () => {
      const response = await axios.get(
        `/api/listing/getsinglelisting/${Params.listingId}`
      );
      setFormData(response.data);
    };
    fetchListings();
  }, []);
  const handleUploadImage = () => {
    if (files.length > 0 && files.length + formData.imageUrls.length <= 6) {
      setUploading(true);
      const promises = [];
      for (let i = 0; i < files.length; i++) {
        promises.push(storeImage(files[i]));
      }
      Promise.all(promises)
        .then((url) => {
          setFormData({
            ...formData,
            imageUrls: formData.imageUrls.concat(url),
          });
          setUploading(false);
          setImageUploadError("");
        })
        .catch((err) => {
          setUploading(false);
          setImageUploadError("Failed! file size upload limit exceeds");
        });
    } else {
      setUploading(false);
      setImageUploadError("You can only add total upto 6 images");
    }
  };
  const storeImage = (file) => {
    return new Promise((resolve, reject) => {
      const storage = getStorage(app);
      const fileName = new Date().getTime() + file.name;
      const storageRef = ref(storage, fileName);
      const uploadTask = uploadBytesResumable(storageRef, file);
      uploadTask.on(
        "state_changed",
        (snapshot) => {
          let progress =
            (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
          console.log(`Processing Images`, progress, "%");
        },
        (error) => {
          reject(error);
        },
        () => {
          const uploadURL = getDownloadURL(uploadTask.snapshot.ref).then(
            (downloadURL) => resolve(downloadURL)
          );
        }
      );
    });
  };
  const handleDelete = (index) => {
    setFormData({
      ...formData,
      imageUrls: formData.imageUrls.filter((_, i) => i !== index),
    });
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (formData.imageUrls.length < 1)
        return setError("Atleast One Image is Needed");
      if (+formData.regularPrice < +formData.discountedPrice)
        return setError("Regular Price must be greater than discounted price");
      setloading(true);
      setError(false);
      const response = await axios.post(
        `/api/listing/updatelisting/${Params.listingId}`,
        formData
      );
      if (response.status === 200) {
        setError(false);
        setloading(false);
        Navigate(`/listing/${response.data._id}`);
      }
    } catch (error) {
      setloading(false);
      setError(error.response.data.message);
    }
  };

  return (
    <main className=" max-w-5xl mx-auto ">
      <h1 className="font-bold text-4xl text-center p-4">Update Listing</h1>
      <form
        onSubmit={handleSubmit}
        className="p-4 flex  gap-2 flex-col sm:flex-row"
      >
        <div className="flex gap-4 flex-col flex-1 mt-2">
          <FormField
            value={formData.name}
            type="text"
            minlength="10"
            maxlength="62"
            name="name"
            placeholder="Name"
            handleChange={handleInputChange}
          />
          <textarea
            placeholder="Description"
            name="description"
            value={formData.description}
            className="bg-grey-50 border  border-gray-300 text-gray-900 text-sm rounded-lg  focus:ring-[#6469ff] focus:border-[#4649ff] outline-none block w-full p-2 "
            type="text"
            onChange={handleInputChange}
          />
          <FormField
            value={formData.address}
            type="text"
            name="address"
            placeholder="Address"
            handleChange={handleInputChange}
          />
          {/* checkbox divs */}
          <div className="flex gap-6 flex-wrap">
            <div className="flex gap-2">
              <input
                type="checkbox"
                name="sale"
                id="sale"
                className="w-5 p-2"
                onChange={handleInputChange}
                checked={formData.type === "sale"}
              />

              <span>Sell</span>
            </div>
            <div className="flex gap-2">
              <input
                type="checkbox"
                name="rent"
                id="rent"
                className="w-5 p-2"
                onChange={handleInputChange}
                checked={formData.type === "rent"}
              />
              <span>Rent</span>
            </div>
            <div className="flex gap-2">
              <input
                type="checkbox"
                name="parking"
                className="w-5 p-2"
                onChange={handleInputChange}
                checked={formData.parking}
              />
              <span>Parking Spot</span>
            </div>
            <div className="flex gap-2">
              <input
                type="checkbox"
                name="furnished"
                className="w-5 p-2"
                onChange={handleInputChange}
                checked={formData.furnished}
              />
              <span>Furnished</span>
            </div>
            <div className="flex gap-2">
              <input
                type="checkbox"
                name="offer"
                className="w-5 p-2"
                onChange={handleInputChange}
                checked={formData.offer}
              />
              <span>Offer</span>
            </div>
          </div>
          {/* Text Field divs */}
          <div className="flex gap-4">
            <div className="flex gap-2 items-center">
              <input
                type="number"
                name="bedrooms"
                min="1"
                max="10"
                required
                className="bg-grey-50 border p-2 border-gray-300 text-gray-900 text-sm rounded-lg  focus:ring-[#6469ff] focus:border-[#4649ff] outline-none"
                onChange={handleInputChange}
                value={formData.bedrooms}
              />
              <p>Beds</p>
            </div>
            <div className="flex gap-2 items-center">
              <input
                type="number"
                name="bathrooms"
                min="1"
                max="10"
                required
                onChange={handleInputChange}
                value={formData.bathrooms}
                className="bg-grey-50 border p-2 border-gray-300 text-gray-900 text-sm rounded-lg  focus:ring-[#6469ff] focus:border-[#4649ff] outline-none"
              />
              <p>Baths</p>
            </div>
          </div>
          {/* pricing divs */}
          <div className="flex flex-col gap-4">
            <div className="flex gap-2 items-center">
              <input
                type="text"
                name="regularPrice"
                min="50"
                max="1000000"
                required
                className="bg-grey-50 border p-2 border-gray-300 text-gray-900 text-sm rounded-lg  focus:ring-[#6469ff] focus:border-[#4649ff] outline-none"
                onChange={handleInputChange}
                value={formData.regularPrice}
              />
              <div>
                <p>Regular Price</p>
                <span className="text-xs"> ( $/month )</span>
              </div>
            </div>
            {formData.offer && (
              <div className="flex gap-2 items-center">
                <input
                  type="text"
                  name="discountedPrice"
                  min="50"
                  max="100000"
                  required
                  className="bg-grey-50 border p-2 border-gray-300 text-gray-900 text-sm rounded-lg  focus:ring-[#6469ff] focus:border-[#4649ff] outline-none"
                  onChange={handleInputChange}
                  value={formData.discountedPrice}
                />
                <div>
                  <p>Discounted Price</p>
                  <span className="text-xs"> ( $/month )</span>
                </div>
              </div>
            )}
          </div>
        </div>
        {/* right section */}
        <div className="w-full flex-1">
          <div className="flex items-center">
            <p className="font-semibold">Image: </p>
            <span className="ml-1 font-normal text-gray-600">
              The first Image will be cover (max-6)
            </span>
          </div>
          {uploading ? (
            <div className="flex items-center justify-center my-2">
              <Loader />
            </div>
          ) : (
            <div className="flex flex-col sm:flex-row ">
              <input
                type="file"
                onChange={(e) => setFiles(e.target.files)}
                className="border w-full sm:w-2/3 p-3 border-gray-500 mt-2 rounded tex-sm  "
                name="image"
                accept="image/*"
                multiple
              />
              <button
                type="button"
                onClick={handleUploadImage}
                className=" text-white mt-3 sm:ml-2 ml-0 bg-[#6469ff] w-full sm:w-1/3 font-medium rounded-md text-sm   px-5 py-2.5 text-center disabled:bg-slate-500"
              >
                Upload
              </button>
            </div>
          )}
          <p className="text-rose-700 text-sm ">
            {imageUploadError && imageUploadError}
          </p>
          {formData.imageUrls.length > 0 &&
            formData.imageUrls.map((item, index) => (
              <div
                key={index}
                className="flex justify-between items-center p-2"
              >
                <img
                  src={item}
                  className="object-contain rounded-lg h-28 w-28 "
                />
                <button
                  type="button"
                  className="text-red-600 "
                  disabled={loading || uploading}
                  onClick={() => handleDelete(index)}
                >
                  {uploading ? "Wait" : "Delete"}
                </button>
              </div>
            ))}
          <p className="text-sm text-red-700">{error ? error : ""}</p>
          <button
            type="submit"
            disabled={loading || uploading}
            className=" text-white bg-[#ea3b49] font-medium rounded-md text-sm w-full mt-2 px-5 py-2.5 text-center disabled:bg-slate-500"
          >
            Update Listing
          </button>
        </div>
      </form>
    </main>
  );
};

export default UpdateListing;
