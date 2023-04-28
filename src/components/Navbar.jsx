import React from "react";

const Navbar = () => {
  return (
    <div
      className="w-full bg-sky-500 py-7 px-32 mb-10"
      data-cy="header-background"
    >
      <p className="text-white font-semibold text-2xl" data-cy="header-title">
        TODO LIST APP
      </p>
    </div>
  );
};

export default Navbar;
