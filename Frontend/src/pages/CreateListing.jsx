import { useState } from "react";
import FormField from "../components/FormField";

const CreateListing = () => {
  const [formData, setFormData] = useState({
    name: "",
    description: "",
    addresss: "",
  });
  const handleInputChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };
  return (
    <main className=" max-w-5xl mx-auto ">
      <h1 className="font-bold text-4xl text-center p-4">Create Listing</h1>
      <form className="p-4 flex  gap-2 flex-col sm:flex-row">
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
            value={formData.addresss}
            type="text"
            name="address"
            placeholder="Address"
            handleChange={handleInputChange}
          />
          {/* checkbox divs */}
          <div className="flex gap-6 flex-wrap">
            <div className="flex gap-2">
              <input type="checkbox" name="sale" className="w-5 p-2" />
              <span>Sell</span>
            </div>
            <div className="flex gap-2">
              <input type="checkbox" name="rent" className="w-5 p-2" />
              <span>Rent</span>
            </div>
            <div className="flex gap-2">
              <input type="checkbox" name="parkingspot" className="w-5 p-2" />
              <span>Parking Spot</span>
            </div>
            <div className="flex gap-2">
              <input type="checkbox" name="furnished" className="w-5 p-2" />
              <span>Furnished</span>
            </div>
            <div className="flex gap-2">
              <input type="checkbox" name="bath" className="w-5 p-2" />
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
                name="regularprice"
                min="1"
                max="10"
                required
                className="bg-grey-50 border p-2 border-gray-300 text-gray-900 text-sm rounded-lg  focus:ring-[#6469ff] focus:border-[#4649ff] outline-none"
              />
              <div>
                <p>Regular Price</p>
                <span className="text-xs"> ( $/month )</span>
              </div>
            </div>
            <div className="flex gap-2 items-center">
              <input
                type="text"
                name="discountedprice"
                min="1"
                max="10"
                required
                className="bg-grey-50 border p-2 border-gray-300 text-gray-900 text-sm rounded-lg  focus:ring-[#6469ff] focus:border-[#4649ff] outline-none"
              />
              <div>
                <p>Discounted Price</p>
                <span className="text-xs"> ( $/month )</span>
              </div>
            </div>
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
          <div className="flex flex-col sm:flex-row ">
            <input
              type="file"
              className="border w-full sm:w-2/3 p-3 border-gray-500 mt-2 rounded tex-sm  "
              name="image"
              accept="image/*"
              multiple
            />
            <button
              type="button"
              className=" text-white mt-3 sm:ml-2 ml-0 bg-[#6469ff] w-full sm:w-1/3 font-medium rounded-md text-sm   px-5 py-2.5 text-center disabled:bg-slate-500"
            >
              Upload
            </button>
          </div>
          <button
            type="button"
            className=" text-white bg-[#ea3b49] font-medium rounded-md text-sm w-full mt-2 px-5 py-2.5 text-center disabled:bg-slate-500"
          >
            Create Listing
          </button>
        </div>
      </form>
    </main>
  );
};

export default CreateListing;
