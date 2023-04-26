import React from "react";

const Button = (props) => {
  return (
    <button
      {...props}
      className="bg-sky-500 rounded-full text-white px-8 flex justify-between font-medium py-3"
    >
      <i class="bi bi-plus-lg "></i>
      Tambah
    </button>
  );
};

export default Button;
