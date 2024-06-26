"use client";

import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

import ApiCaller from "@/config/apicaller";

import Spacer from "@/components/spacer/spacer";
import YellowButton from "@/components/buttons/yellowbutton";
import Loader from "@/components/loader";

import PricingPlanComponent from "./pricingplancomponent";

const PricingPlan = () => {
  const router = useRouter();

  const [plans, setPlans] = useState([]);
  const [isLoading, setLoading] = useState(false);

  useEffect(() => {
    getAllPlans();
  }, []);

  const activatePlan = async (id, value) => {
    try {
      const payload = {
        planId: id,
        makeActive: value,
      };
      const response = await ApiCaller.Post(`/plan/activatePlan`, payload);
      console.log(response);
      if (response.status === 200) {
        getAllPlans();
      }
    } catch (e) {
      setLoading(false);
      console.log(e);
    }
  };

  const getAllPlans = async () => {
    setLoading(true);
    try {
      const response = await ApiCaller.Get(`/plan`);
      console.log(response);
      if (response.status === 200) {
        setPlans(response.data?.plans);
      }
      setLoading(false);
    } catch (err) {
      setLoading(false);
      console.log(err);
    }
  };

  const handleDelete = async (id) => {
    try {
      const response = await ApiCaller.Put(`/plan/${id}`);
      console.log(response);

      if (response.status === 200) {
        getAllPlans();
      }
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div>
      <Spacer height="32px" />
      <div className="w-[70%] m-auto flex flex-col rounded-xl shadow-md">
        <div className="p-6 bg-primary rounded-t-xl flex justify-between items-center">
          <div className="flex flex-col">
            <h2 className="headers text-white text-[20px] font-bold m-0">
              Pricing Plan
            </h2>
            <p className="text-[16px] font-normal text-[#FFFFFFCC] m-0">
              Create or manage your plans
            </p>
          </div>
          <YellowButton
            text="Create a Plan"
            onClick={() => router.push("/settings/createplan")}
          />
        </div>
        {isLoading ? (
          <Loader />
        ) : (
          <>
            {plans?.length === 0 ? (
              <div className="p-4 text-center font-semibold text-[16px]">
                No Plans
              </div>
            ) : (
              <>
                {plans?.map((item, index) => (
                  <PricingPlanComponent
                    item={item}
                    key={item?._id}
                    index={index}
                    pricingData={plans}
                    handleDelete={handleDelete}
                    activatePlan={activatePlan}
                  />
                ))}
              </>
            )}
          </>
        )}
      </div>
    </div>
  );
};

export default PricingPlan;
