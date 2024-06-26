import React, { useState, useEffect } from "react";
import Image from "next/image";
import { Modal } from "antd";

import Pagination from "@/components/pagination/pagination";
import ApiCaller from "@/config/apicaller";

import Spacer from "@/components/spacer/spacer";
import WhiteButton from "@/components/buttons/whitebutton";
import DefaultInput from "@/components/inputs/defaultinput";
import YellowButton from "@/components/buttons/yellowbutton";
import Loader from "@/components/loader";

const Services = () => {
  const [data, setData] = useState([]);
  const [servicesCount, setServicesCount] = useState(0);
  const [loading, setLoading] = useState(false);

  const [offset, setOffset] = useState(0);
  const [currentPage, setCurrentPage] = useState(1);
  const [limit, setLimit] = useState(10);

  const [isOpen, setIsOpen] = useState(false);
  const [servicesAdd, setServicesAdd] = useState([{ label: "", value: "" }]);

  useEffect(() => {
    fetchServicesData();
  }, []);

  const fetchServicesData = async () => {
    try {
      setLoading(true);

      const response = await ApiCaller.Get(
        `/services?limit=${limit}&offset=${offset}`
      );
      if (response?.status === 200) {
        setData(response?.data?.services);
        setServicesCount(response?.data?.servicesCount);
        setLoading(false);
      } else {
        setLoading(false);
        console.log(response);
      }
    } catch (error) {
      setLoading(false);
      console.error("Error fetching services data:", error);
    }
  };

  const handlePagination = async (pageNumber) => {
    const offset = (pageNumber - 1) * limit;

    try {
      setLoading(true);
      const response = await ApiCaller.Get(
        `/services?limit=${limit}&offset=${offset}`
      );
      if (response?.status === 200) {
        setData(response?.data?.services);
        setServicesCount(response?.data?.servicesCount);
        setLoading(false);
      } else {
        setLoading(false);
        console.log(response);
      }
      setOffset(offset);
    } catch (error) {
      setLoading(false);
      console.error("Error fetching services data:", error);
    }
  };

  const handleAddMoreServices = () => {
    setServicesAdd([...servicesAdd, { label: "", value: "" }]);
  };

  const handleAddServices = async () => {
    try {
      setLoading(true);

      const filteredServices = servicesAdd.filter((item) => item.label !== "");
      const payload = { services: filteredServices };

      const response = await ApiCaller.Post(`/services`, payload);

      if (response?.status === 200) {
        setTimeout(() => {
          fetchServicesData();
        }, 2000);
      } else {
        setLoading(false);
        console.log(response);
      }
      setIsOpen(false);
      setServicesAdd([{ label: "", value: "" }]);
    } catch (error) {
      setLoading(false);
      console.error("Error adding role data:", error);
    }
  };

  return (
    <div>
      <Spacer height="32px" />
      <div className="w-[90%]  lg:w-[70%] m-auto flex flex-col rounded-xl shadow-md">
        <div className="p-6 bg-primary rounded-t-xl flex justify-between items-center">
          <div className="flex flex-col">
            <h2 className="headers text-white text-[20px] font-bold m-0">
              Services
            </h2>
            <p className="text-[16px] font-normal text-[#FFFFFFCC] m-0">
              Add and manage your services
            </p>
          </div>
          <WhiteButton text="Add a Service" onClick={() => setIsOpen(true)} />
        </div>

        {loading ? (
          <Loader />
        ) : (
          <>
            {data?.length === 0 ? (
              <div className="p-2 text-center text-[18px] font-semibold">
                No Data
              </div>
            ) : (
              <>
                {data?.map((item) => (
                  <div
                    key={item?.title}
                    className="px-6 py-4 flex justify-between items-center border-b border-grayBorderDashboard"
                  >
                    <p className="text-[16px] font-bold text-primary m-0">
                      {item?.title}
                    </p>
                    <Image
                      src="./images/arrow-half-right.svg"
                      height={24}
                      width={24}
                      alt=""
                    />
                  </div>
                ))}
              </>
            )}
          </>
        )}
        {data?.length > 0 && (
          <div className="pt-[11px] pb-4 px-6 flex items-center justify-between border-t border-t-grayBorder radius-b-l-2">
            <Pagination
              totalPages={servicesCount}
              currentPage={currentPage}
              limit={limit}
              setCurrentPage={setCurrentPage}
              onChange={handlePagination}
            />
          </div>
        )}
      </div>
      {isOpen && (
        <Modal
          open={isOpen}
          centered={true}
          onCancel={() => setIsOpen(false)}
          closeIcon={false}
          footer={[
            <div className="grid grid-cols-2 gap-3" key={1}>
              <WhiteButton text={"Cancel"} onClick={() => setIsOpen(false)} />
              <YellowButton text={"Add"} onClick={handleAddServices} />
            </div>,
          ]}
          className="add-team-member"
        >
          <div>
            <h1 className="headers text-primary text-[20px] m-0">
              Add Service
            </h1>
            <Spacer height="32px" />
            {servicesAdd?.map((service, index) => (
              <>
                <DefaultInput
                  placeholder="Enter Service Name"
                  onChange={(e) => {
                    let newValue = [...servicesAdd];

                    newValue[index].label = e.target.value;
                    newValue[index].value = e.target.value;
                    setServicesAdd(newValue);
                  }}
                  key={index}
                  value={service?.value}
                />
                <Spacer height="16px" />
              </>
            ))}
            <div
              className="flex gap-2 justify-center items-center"
              onClick={handleAddMoreServices}
            >
              <Image
                src="/images/plus-icon.svg"
                alt=""
                height={20}
                width={20}
              />
              <p className="text-[16px] font-medium text-subtitleText m-0">
                Add another service field
              </p>
            </div>
            <Spacer height="32px" />
          </div>
        </Modal>
      )}
    </div>
  );
};

export default Services;
