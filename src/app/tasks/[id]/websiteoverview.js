import React from "react";
import moment from "moment";

import YellowButton from "@/components/buttons/yellowbutton";

const WebsiteOverview = ({ projectdata, companyData }) => {
  return (
    <div className="border h-auto mx-[100px] lg:mx-[120px] mt-[24px] rounded-2xl shadow-md">
      <div className="grid grid-cols-2 justify-between  bg-[#0B132B] pt-[24px] rounded-t-2xl">
        <div className="px-[24px] pb-[24px] text-[#FFFFFF]">
          <div className="text-[24px] font-bold">Project Overview</div>
          <div className="text-[16px] font-normal">3 revisions remaining</div>
        </div>
      </div>

      <div className="grid grid-cols-2 pb-[24px] justify-between bg-gray-100">
        <div className="px-[24px] pt-[24px] pb-[12px] text-[20px] font-bold">
          <div className="text-black font-sans pb-[12px] text-base font-normal">
            Industry type
          </div>
          <div className="truncate text-black font-sans text-xl font-bold">
            {companyData?.industryType}
          </div>
        </div>
        <div className="px-[24px] pt-[24px] pb-[12px] text-[20px] font-bold">
          <div className="text-[#0B132B] font-sans pb-[12px] text-base font-normal">
            Created On
          </div>{" "}
          <div className="truncate text-black font-sans text-xl font-bold">
            {moment(projectdata?.createdAt).format("DD/MM/YYYY")}
          </div>
        </div>
      </div>

      <div className=" p-[24px]">
        <div className="text-[#0B132B] pb-4 text-[16px] font-bold">
          Description
        </div>
        <div className=""></div>
        <div className=" text-gray-500 self-stretch text-[14px] font-sans text-base font-normal">
          {projectdata?.description}
        </div>
      </div>
      {/* {projectdata?.assignees && projectdata?.assignees?.length > 0 && ( */}
      <div className="flex justify-between rounded-b-lg bg-[#0B132B]">
        <div className="px-[24px] pb-[24px] text-[#FFFFFF]">
          <div className="text-[24px] mt-5 font-bold">Deliverables</div>
          <div className="text-[16px] font-normal">3 revisions remaining</div>
        </div>
        <div className="p-5 mt-2">
          <YellowButton
            imagealign="left"
            s
            image={"/images/upload-cloud.svg"}
            text={"Upload"}
          />
        </div>
      </div>
      {/* )} */}
    </div>
  );
};

export default WebsiteOverview;
