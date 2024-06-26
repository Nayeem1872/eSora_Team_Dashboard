"use client";

import React, { useState, useEffect } from "react";
import { useRouter, usePathname } from "next/navigation";
import Image from "next/image";
import { Radio, Modal } from "antd";

import ApiCaller from "@/config/apicaller";

import PageHeading from "@/components/pageheading/pageheading";
import Spacer from "@/components/spacer/spacer";
import DefaultInput from "@/components/inputs/defaultinput";
import WhiteButton from "@/components/buttons/whitebutton";
import YellowButton from "@/components/buttons/yellowbutton";
import CurrencyDropdownInput from "@/components/inputs/currencydropdowninput";
import Loader from "@/components/loader";

import currencyList from "@/utils/mockdata/currencylist";

const CreatePlan = () => {
  const router = useRouter();
  const pathname = usePathname();

  const id = pathname?.split("/")[3];

  const [isLoading, setLoading] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const [state, setState] = useState({
    name: "",
    subtitle: "",
    pricingPlan: "",
    price: "",
    currency: "USD",
    currencySymbol: "$",
    subHeading: "",
    features: ["", "", ""],
    badge: "",
  });

  useEffect(() => {
    getPlan();
  }, [pathname]);

  const getPlan = async () => {
    setLoading(true);
    try {
      const response = await ApiCaller.Get(`/plan/${id}`);
      console.log(response);
      if (response.status === 200) {
        const planData = response.data?.plan;
        const currencySymbol = currencyList.filter(
          (item) => item.code === planData?.pricing?.PricingCurrency
        )[0];

        setState({
          name: planData.name,
          subtitle: planData.subHeading,
          pricingPlan: planData.pricing?.pricingType,
          price: planData?.pricing?.pricingAmount,
          currency: planData?.pricing?.pricingCurrency,
          currencySymbol: currencySymbol?.symbol_native,
          subHeading: planData?.pricing?.pricingSubHeading,
          features: planData?.whatsIncluded,
          badge: planData?.badge,
        });
      }
      setLoading(false);
    } catch (e) {
      setLoading(false);
      console.log(e);
    }
  };

  const handleAddMorefeatures = () => {
    setState({
      ...state,
      features: [...state.features, ""],
    });
  };

  const handleRemovefeatures = (index) => {
    let array = [...state.features];
    array.splice(index, 1);
    setState({
      ...state,
      features: array,
    });
  };

  const handleSubmit = async () => {
    try {
      const filteredFeatures = state?.features?.filter((item) => item !== "");

      const body = {
        name: state?.name,
        subHeading: state?.subtitle,
        pricing: {
          pricingType: state?.pricingPlan,
          pricingCurrency: state?.currency,
          pricingAmount: state?.price,
          pricingSubHeading: state?.subHeading,
        },
        whatsIncluded: filteredFeatures,
        badge: state?.badge,
      };

      const response = await ApiCaller.Post(`/plan/updatePlan/${id}`, body);
      console.log(response);
      if (response.status === 200) {
        setIsOpen(true);
      }
    } catch (err) {
      console.log(err);
    }
  };

  const handleMakeActive = async () => {
    try {
      const payload = {
        planId: id,
        makeActive: true,
      };
      const response = await ApiCaller.Post(`/plan/activatePlan`, payload);
      console.log(response);
      if (response.status === 200) {
        router.push("/settings?tab=4");
      }
    } catch (e) {
      console.log(e);
    }
  };

  return (
    <div>
      <div className="flex justify-between items-center">
        <PageHeading heading="Edit Plan" subHeading="Edit your plan" />
        <button
          className="p-[14px] border border-gray300 rounded-[10px] text-[20px] text-[#52596D] shadow"
          onClick={() => router.push("/settings?tab=4")}
        >
          <Image
            src={"/images/black-cross.svg"}
            alt=""
            height={20}
            width={20}
          />
        </button>
      </div>
      <Spacer height="32px" />
      <div className="w-[70%] m-auto flex flex-col rounded-xl shadow-md">
        <div className="p-6 bg-primary rounded-t-xl flex justify-between items-center">
          <h2 className="headers text-white text-[20px] font-bold m-0">
            Edit your plan details
          </h2>
        </div>
        {isLoading ? (
          <Loader />
        ) : (
          <>
            {/* name */}
            <div className="p-6 border-b border-grayBorderDashboard">
              <h4 className="text-[16px] text-primary font-bold m-0">
                Name of Plan
              </h4>
              <Spacer height="8px" />
              <p className="text-[14px] text-subtitleText font-normal m-0">
                Enter the name of plan in 1 or 2 words (e.g. Standard)
              </p>
              <Spacer height="16px" />
              <DefaultInput
                onChange={(e) => setState({ ...state, name: e.target.value })}
                value={state?.name}
              />
            </div>
            {/* subheading */}
            <div className="p-6 border-b border-grayBorderDashboard">
              <h4 className="text-[16px] text-primary font-bold m-0">
                Sub-heading
              </h4>
              <Spacer height="8px" />
              <p className="text-[14px] text-subtitleText font-normal m-0">
                Enter a sub-heading to describe your plan in short
              </p>
              <Spacer height="16px" />
              <DefaultInput
                onChange={(e) =>
                  setState({ ...state, subtitle: e.target.value })
                }
                value={state?.subtitle}
              />
            </div>
            {/* pricing */}
            <div className="p-6 border-b border-grayBorderDashboard">
              <h4 className="text-[16px] text-primary font-bold m-0">
                Pricing
              </h4>
              <Spacer height="8px" />
              <p className="text-[14px] text-subtitleText font-normal m-0">
                Select the type of your pricing and enter the value of price
              </p>
              <Spacer height="16px" />
              <div className="grid grid-cols-3 items-center">
                <div>
                  <Radio.Group
                    onChange={(e) =>
                      setState({ ...state, pricingPlan: e.target.value })
                    }
                    value={state?.pricingPlan}
                  >
                    <Radio
                      value={"yearly"}
                      className="text-[16px] font-medium text-[#434A60]"
                    >
                      Yearly
                    </Radio>
                    <Radio
                      value={"monthly"}
                      className="text-[16px] font-medium text-[#434A60]"
                    >
                      Monthly
                    </Radio>
                  </Radio.Group>
                </div>
                <div className="col-span-2">
                  <CurrencyDropdownInput state={state} setState={setState} />
                </div>
              </div>
              <Spacer height="24px" />
              <h4 className="text-[16px] text-primary font-bold m-0">
                Sub-heading
              </h4>
              <Spacer height="8px" />
              <p className="text-[14px] text-subtitleText font-normal m-0">
                Enter a sub-heading to describe your pricing in few words
              </p>
              <Spacer height="16px" />
              <DefaultInput
                onChange={(e) =>
                  setState({ ...state, subHeading: e.target.value })
                }
                value={state?.subHeading}
              />
            </div>
            {/* whats included */}
            <div className="p-6 border-b border-grayBorderDashboard">
              <h4 className="text-[16px] text-primary font-bold m-0">
                What&apos;s Included
              </h4>
              <Spacer height="8px" />
              <p className="text-[14px] text-subtitleText font-normal m-0">
                Enter all the information as points in each field and add more
                fields as you need
              </p>
              <Spacer height="16px" />
              {state?.features?.map((item, index) => (
                <div key={index}>
                  {index < 3 ? (
                    <DefaultInput
                      onChange={(e) => {
                        let newValue = [...state.features];
                        newValue[index] = e.target.value;
                        setState({
                          ...state,
                          features: newValue,
                        });
                      }}
                      value={item}
                    />
                  ) : (
                    <div className="flex gap-3">
                      <DefaultInput
                        onChange={(e) => {
                          let newValue = [...state.features];
                          newValue[index] = e.target.value;
                          setState({
                            ...state,
                            features: newValue,
                          });
                        }}
                        value={item}
                      />
                      <Image
                        onClick={() => {
                          handleRemovefeatures(index);
                        }}
                        src={"/images/black-cross.svg"}
                        height={20}
                        width={20}
                        alt=""
                      />
                    </div>
                  )}
                  <Spacer height="12px" />
                </div>
              ))}
              <Spacer height="16px" />
              <div className="flex justify-center items-center gap-2">
                <Image
                  src="/images/plus-icon.svg"
                  height={20}
                  width={20}
                  alt=""
                  onClick={handleAddMorefeatures}
                />
                <p
                  className="text-[16px] text-subtitleText font-medium m-0"
                  onClick={handleAddMorefeatures}
                >
                  Add another field
                </p>
              </div>
            </div>
            {/* badge */}
            <div className="p-6 border-b border-grayBorderDashboard">
              <h4 className="text-[16px] text-primary font-bold m-0">Badge</h4>
              <Spacer height="8px" />
              <p className="text-[14px] text-subtitleText font-normal m-0">
                Badge can help to make different this plan from other plans
              </p>
              <Spacer height="16px" />
              <DefaultInput
                onChange={(e) => setState({ ...state, badge: e.target.value })}
                value={state?.badge}
              />
            </div>
            {/* button */}
            <div className="p-6 flex justify-between items-center">
              <WhiteButton
                text="Cancel"
                onClick={() => router.push("/settings?tab=4")}
              />
              <YellowButton text="Save Changes" onClick={handleSubmit} />
            </div>
          </>
        )}
      </div>
      {isOpen && (
        <Modal
          open={isOpen}
          centered={true}
          onCancel={() => setIsOpen(false)}
          closeIcon={false}
          footer={false}
        >
          <div>
            <div className="h-12 w-12 rounded-full bg-primary flex justify-center items-center border-8 border-[#EAEDF4] ">
              <Image
                src="/images/greentick.svg"
                height={24}
                width={24}
                alt=""
              />
            </div>
            <Spacer height="20px" />
            <h1 className="headers text-primary text-[20px] mb-0">
              Your plan was edited successfully
            </h1>

            <p className="font-normal text-[14px] text-subtitleText mb-0">
              Do you want to make this plan active now?
            </p>
            <Spacer height="32px" />
            <div className="grid grid-cols-2 gap-3" key={1}>
              <WhiteButton
                text={"No, I’ll do it later"}
                onClick={() => router.push("/settings?tab=4")}
              />
              <YellowButton
                text={"Yes, make it Active"}
                onClick={handleMakeActive}
              />
            </div>
          </div>
        </Modal>
      )}
    </div>
  );
};

export default CreatePlan;
