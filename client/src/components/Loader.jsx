import React from "react";

const Loader = () => {
  return (
    <div className="h-screen w-screen flex justify-center items-center">
      <div className="h-[100px] w-[100px] border-4 border-t-white rounded-full animate-spin"></div>
    </div>
  );
};

export default Loader;
