import React from "react";
import { Select } from "antd";

const Dropdown = (props) => {
  return (
    <div className="w-full border border-gray300 shadow-sm bg-white rounded-lg h-full flex justify-center items-center py-[12px] px-[14px]">
      <Select className="w-full custom-select" {...props} showSearch>
        {props.children}
      </Select>
    </div>
  );
};

export default Dropdown;
