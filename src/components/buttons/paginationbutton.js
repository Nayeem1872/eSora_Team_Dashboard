import React from "react";

const PaginationButton = (props) => {
  return (
    <button
      className="px-[17px] py-[9px] border border-gray300 rounded-md shadow-paginationShahow text-[14px] text-deepGrayText font-medium"
      {...props}
    >
      {props.text}
    </button>
  );
};

export default PaginationButton;
