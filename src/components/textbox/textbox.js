import React from "react";

const TextBox = (props) => {
  return (
    <textarea
      {...props}
      rows={props?.rows || 10}
      className="border border-gray300 shadow-sm bg-white rounded-lg text-[16px] p-3"
      style={{ width: "100%", outline: "none" }}
    />
  );
};

export default TextBox;
