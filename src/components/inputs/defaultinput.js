import React from "react";

const DefaultInput = (props) => {
  return (
    <div className="realtive w-full py-[10px] px-[14px] border border-gray300 shadow-sm bg-white rounded-lg flex text-[12px]">
      <input
        type="text"
        className="text-[16px] w-full outline-none"
        {...props}
      />
    </div>
  );
};

export default DefaultInput;
