import React from "react";

const PageHeading = (props) => {
  return (
    <div className="flex flex-col gap-2">
      <div className="headers text-headerText text-[32px] font-bold">
        {props.heading}
      </div>
      <div className="text-subtitleText text-[16px] font-normal">
        {props.subHeading}
      </div>
    </div>
  );
};

export default PageHeading;
