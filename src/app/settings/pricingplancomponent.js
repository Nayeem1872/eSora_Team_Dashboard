import React from "react";
import { useRouter } from "next/navigation";
import { Switch } from "antd";
import Image from "next/image";

import Spacer from "@/components/spacer/spacer";
import WhiteButton from "@/components/buttons/whitebutton";

import currencyList from "@/utils/mockdata/currencylist";

const PricingPlanComponent = (props) => {
  const router = useRouter();

  return (
    <div
      className={`p-6  ${
        props?.index !== props?.pricingData?.length - 1
          ? "border-b border-grayBorderDashboard"
          : ""
      }`}
      key={props?.index}
    >
      <div className="p-6 rounded-xl shadow-pricingBox border border-grayBorderDashboard">
        <div className="flex justify-between items-center">
          <div className="flex gap-3 items-center">
            <Switch
              checked={props?.item?.activeStatus}
              onChange={(e) => props?.activatePlan(props?.item?._id, e)}
            />
            <p className="m-0 text-primary text-[16px] font-medium">
              Currently {props?.item?.activeStatus ? "active" : "inactive"}
            </p>
          </div>
          <div className="flex gap-4">
            <button onClick={() => props?.handleDelete(props?.item?._id)}>
              Delete
            </button>
            <WhiteButton
              text="Edit"
              onClick={() =>
                router.push(`/settings/editplan/${props?.item?._id}`)
              }
            />
          </div>
        </div>
        <Spacer height="32px" />

        {props?.item?.badge && (
          <>
            <div className="flex items-center justify-center bg-[#EA552B] rounded-br-xl rounded-bl-xl py-[6px] px-3 w-max">
              <p className="m-0 text-white text-[14px] font-bold capitalize">
                {props?.item?.badge}
              </p>
            </div>
            <Spacer height="24px" />
          </>
        )}
        <h2 className="headers text-primary text-[24px] font-bold m-0">
          {props?.item?.name}
        </h2>
        <p className="m-0 text-subtitleText text-[20px] font-normal opacity-80">
          {props?.item?.subHeading}
        </p>
        <Spacer height="32px" />
        <h2 className="headers text-primary text-[48px] font-bold m-0">
          {
            currencyList.filter(
              (item) => item.code === props?.item?.pricing?.pricingCurrency
            )[0]?.symbol_native
          }
          {parseInt(props?.item?.pricing?.pricingAmount)?.toLocaleString()}/
          {props?.item?.pricing?.pricingType === "monthly" ? "m" : "yr"}
        </h2>
        <p className="m-0 text-subtitleText text-[24px] font-normal">
          {props?.item?.pricing?.pricingSubHeading}
        </p>
        <Spacer height="24px" />
        <h2 className="headers text-primary text-[18px] font-bold m-0">
          What&apos;s included:
        </h2>
        <Spacer height="16px" />
        {props?.item?.whatsIncluded?.map((feature, index) => (
          <div key={index} className="flex gap-[10px] my-2 items-center">
            <div className="bg-primary h-6 w-6 rounded-full flex items-center justify-center">
              <Image
                src={"/images/greentick.svg"}
                height={16}
                width={16}
                alt=""
              />
            </div>
            <p className="m-0 text-primary text-[16px] font-normal">
              {feature}
            </p>
          </div>
        ))}
        <Spacer height="24px" />
      </div>
    </div>
  );
};

export default PricingPlanComponent;
