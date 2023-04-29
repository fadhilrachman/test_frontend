import React from "react";
import plus from "../assets/plus.svg";
const Button = (props) => {
  return (
    <button
      {...props}
      className={`bg-sky-500 rounded-full font-bold text-white px-8 flex justify-between z-[100] items-center py-4 
      `}
    >
      {props.variant === "todo" ? (
        "Simpan"
      ) : (
        <>
          {" "}
          <img src={plus} alt="" className="mr-3 h-4" srcset="" />
          Tambah
        </>
      )}
    </button>
  );
};

export default Button;
