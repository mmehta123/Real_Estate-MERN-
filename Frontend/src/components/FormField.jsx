import React from "react";

const FormField = ({
  value,
  type,
  name,
  placeholder,
  handleChange,
  notRequired,
}) => {
  return (
    <div>
      <input
        type={type}
        name={name}
        placeholder={placeholder}
        required={notRequired ? false : true}
        value={value}
        onChange={handleChange}
        className="bg-grey-50 border  border-gray-300 text-gray-900 text-sm rounded-lg  focus:ring-[#6469ff] focus:border-[#4649ff] outline-none block w-full p-2 "
      />
    </div>
  );
};

export default FormField;
