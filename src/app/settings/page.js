"use client";

import React, { useEffect, useState } from "react";
import { useSearchParams, useRouter, usePathname } from "next/navigation";
import { Tabs } from "antd";

import Breadcrumb from "@/components/breadcumb/breadcrumb";
import PageHeading from "@/components/pageheading/pageheading";
import Spacer from "@/components/spacer/spacer";

import General from "./general";
import Services from "./services";
import Team from "./team";
import PricingPlan from "./pricingplan";

const Settings = () => {
  const searchParams = useSearchParams();
  const router = useRouter();
  const pathname = usePathname();

  const [activeKey, setActiveKey] = useState(searchParams.get("tab") ?? "1");

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    if (params.get("tab") !== activeKey) {
      params.set("tab", activeKey);
      router.replace(`${pathname}?${params.toString()}`);
    }
  }, [activeKey, router]);

  const breadcumbData = [
    { title: "Settings", link: "/settings", active: true },
  ];

  const items = [
    {
      key: "1",
      label: "General",
      children: <General />,
    },
    {
      key: "2",
      label: "Services",
      children: <Services />,
    },
    {
      key: "3",
      label: "Team",
      children: <Team />,
    },
    {
      key: "4",
      label: "Pricing Plan",
      children: <PricingPlan />,
    },
  ];

  const changeTab = (key) => {
    setActiveKey(key);
  };

  return (
    <div>
      <Breadcrumb data={breadcumbData} />
      <Spacer height="32px" />
      <PageHeading heading="Settings" subHeading="Manage your settings here" />
      <Spacer height="32px" />
      <Tabs
        defaultActiveKey="1"
        activeKey={activeKey}
        onChange={changeTab}
        items={items}
      />
    </div>
  );
};

export default Settings;
