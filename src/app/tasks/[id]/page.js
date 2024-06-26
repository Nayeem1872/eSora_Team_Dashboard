"use client";

import React, { useState, useEffect } from "react";
import { Tabs } from "antd";
import Image from "next/image";
import { usePathname, useSearchParams, useRouter } from "next/navigation";
import Link from "next/link";

import { FaRegTrashAlt } from "react-icons/fa";

import ApiCaller from "@/config/apicaller";

import Loader from "@/components/loader";
import Breadcrumb from "@/components/breadcumb/breadcrumb";
import PageHeading from "@/components/pageheading/pageheading";
import WhiteButton from "@/components/buttons/whitebutton";
import YellowButton from "@/components/buttons/yellowbutton";
import Spacer from "@/components/spacer/spacer";
import Messages from "./messages";
import WebsiteOverview from "./websiteoverview";
import Requirements from "./requirements";
import Files from "./files";

const ProfileDetails = () => {
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const router = useRouter();

  const [data, setData] = useState({});
  const [activeKey, setActivekey] = useState(searchParams.get("tab") ?? "1");
  const [isLoading, setLoading] = useState(false);

  const id = pathname?.split("/")[2];

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const response = await ApiCaller.Get(`/auth/company/${id}`);
        console.log(response);
        if (response?.status === 200) {
          setData(response?.data?.data);
        }
        setLoading(false);
      } catch (error) {
        setLoading(false);
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, [id]);

  const breadcumbData = [
    { title: "Clients", link: "/tasks", active: false },
    { title: "Cody Fisher", link: "/tasks", active: false },
    { title: "Projects", link: "/tasks", active: false },
    { title: `Websites`, link: "#", active: true },
  ];

  const items = [
    {
      key: "1",
      label: "Overview",
      children: (
        // <WebsiteOverview projectdata={projectdata} companyData={companyData} />
        <WebsiteOverview />
      ),
    },
    {
      key: "2",
      label: "Requirements",
      children: (
        <Requirements
        
        />
      ),
    },
    {
      key: "3",
      label: "Files",
      children: <Files  />,
    },
    {
      key: "4",
      label: (
        <div>
          Messages{" "}
          <span className="bg-fadedYellow px-2 rounded-xl text-[12px] font-medium">
            2
          </span>
        </div>
      ),
      children: <Messages  />,
    },
  ];
  const changeTab = (e) => {
    setActivekey(e);
  };

  const handleNextTab = () => {
    if (activeKey === "1") setActivekey("2");
    else if (activeKey === "2") setActivekey("3");
    else return;
  };

  const handlePrevTab = () => {
    if (activeKey === "3") setActivekey("2");
    else if (activeKey === "2") setActivekey("1");
    else return;
  };

  const handleDelete = async () => {
    try {
      const response = await ApiCaller.Delete(`/auth/company/${id}`);
      console.log(response);
      if (response.status === 200) {
        router.push("/clients");
      }
    } catch (e) {
      console.log(e);
    }
  };

  return (
    <div>
      {isLoading ? (
        <Loader />
      ) : (
        <>
          <Breadcrumb data={breadcumbData} />
          <Spacer height="32px" />
          <div className="flex justify-between">
            <div className="flex items-center">
              <Link
                href={"/clients"}
                className="border border-gray300 rounded-[10px] p-[14px] mr-[16px] shadow"
              >
                <Image
                  src="/images/arrow-left.svg"
                  height={20}
                  width={20}
                  alt=""
                />
              </Link>
              <PageHeading
                heading="Website"
                subHeading="Mange your clients right from here."
              />
            </div>
            <div className="flex justify-between items-center gap-2">
              <WhiteButton
                imagealign="left"
                image={"/images/arrow-left.svg"}
                text={"Previous"}
                onClick={handlePrevTab}
              />
              <YellowButton
                imagealign="right"
                image={"/images/arrow-right.svg"}
                text={"Next"}
                onClick={handleNextTab}
              />
              {activeKey !== "3" && (
                <button
                  className="p-[14px] border border-gray300 rounded-[10px] text-[20px] text-[#52596D] shadow"
                  onClick={handleDelete}
                >
                  <FaRegTrashAlt />
                </button>
              )}
            </div>
          </div>
          <Spacer height="32px" />
          <Tabs
            defaultActiveKey={"1"}
            activeKey={activeKey}
            items={items}
            onChange={changeTab}
          />
        </>
      )}
    </div>
  );
};

export default ProfileDetails;
