import React from "react";

const SearchBar = (props) => {
  return (
    <div className="realtive w-[full] py-[12px] px-[14px] border border-gray300 shadow-sm bg-white rounded-lg flex text-[12px]">
      <img src="/images/search-icon.svg" className="mr-2" />
      <input
        type="text"
        placeholder={props?.placeholder || "Search"}
        className="text-[16px] w-full outline-none"
        {...props}
      />
    </div>
  );
};

export default SearchBar;
