"use client";

import React, { useState, useEffect } from "react";
import Image from "next/image";
import { useRouter, usePathname } from "next/navigation";

import ApiCaller from "@/config/apicaller";

import styles from "./styles";

const Sidebar = () => {
  const router = useRouter();
  const pathname = usePathname();

  const [state, setState] = useState({ email: "", name: "" });

  useEffect(() => {
    setState({
      email: JSON.parse(localStorage.getItem("user"))?.email,
      name: JSON.parse(localStorage.getItem("user"))?.name,
    });
  }, []);

  const handleNavigation = (path) => {
    router.push(path);
  };

  const handleLogout = () => {
    localStorage.removeItem("user");
    router.push("/login");
  };

  const dummyData = {
    image: "/images/profile-icon.svg",
    name: "Admin",
    email: "admin@example.com",
  };

  const navbarItemsTop = [
    {
      text: "Dashboard",
      image: "/images/dashboard-icon.svg",
      activeImage: "/images/dashboard-icon-active.svg",
      link: "/dashboard",
    },
    {
      text: "Tasks",
      image: "/images/check-square1.svg",
      activeImage: "/images/check-square.svg",
      link: "/tasks",
    },
    {
      text: "Messages",
      image: "/images/message-icon.svg",
      activeImage: "/images/message-icon-active.svg",
      link: "/messages",
    },
  ];
  const navbarItemsBottom = [
    {
      text: "Activity",
      image: "/images/activity-icon.svg",
      activeImage: "/images/activity-icon-active.svg",
      link: "/activity",
    },
    // {
    //   text: "Team",
    //   image: "/images/team-icon.svg",
    //   activeImage: "/images/team-icon-active.svg",
    //   link: "/team",
    // },
    {
      text: "Settings",
      image: "/images/settings-icon.svg",
      activeImage: "/images/settings-icon-active.svg",
      link: "/settings",
    },
  ];

  return (
    <div
      className={` ${styles.navbarContainer} ${
        pathname.includes("/clients/") || pathname.includes("/team/")
          ? "hidden"
          : ""
      } `}
    >
      <div className={styles.navbarLogoDiv}>
        <Image
          src="/images/esora-logo.svg"
          alt="logo"
          className="mr-2"
          width={36}
          height={0}
        />
        <Image
          src="/images/esora-text-logo.svg"
          alt="logo"
          width={139}
          height={0}
        />
      </div>
      <div className={styles.navbarItemsContainer}>
        <div>
          {navbarItemsTop?.map((item, index) => (
            <div
              className={
                pathname === item.link
                  ? styles.activeClass
                  : styles.inactiveClass
              }
              key={index}
              onClick={() => handleNavigation(item.link)}
            >
              <Image
                src={pathname === item.link ? item.activeImage : item.image}
                alt="logo"
                className="mr-2"
                width={24}
                height={24}
              />
              <div>{item.text}</div>
            </div>
          ))}
        </div>
        <div className="pb-4 border-b-2 border-gray-600">
          {navbarItemsBottom?.map((item, index) => (
            <div
              className={
                pathname === item.link
                  ? styles.activeClass
                  : styles.inactiveClass
              }
              key={index}
              onClick={() => handleNavigation(item.link)}
            >
              <Image
                src={pathname === item.link ? item.activeImage : item.image}
                alt="logo"
                className="mr-2"
                width={24}
                height={24}
              />
              <div>{item.text}</div>
            </div>
          ))}
        </div>
      </div>

      <div className={styles.navbarAccountInfoContainer}>
        <div className={styles.navbarAccountImage}>
          <Image
            src={"/images/profile-icon.svg"}
            alt="logo"
            height={24}
            width={24}
          />
        </div>
        <div className={styles.flexColumn}>
          <div className={styles.font14weight600}>{state?.name}</div>
          <div className={`${styles.font14weight400} text-grayText`}>
            {state?.email}
          </div>
        </div>
      </div>
      <div className={styles.logoutContainer} onClick={handleLogout}>
        <div className={styles.logoutText}>Logout</div>
        <Image
          src="/images/logout-icon.svg"
          alt="logo"
          height={16}
          width={16}
        />
      </div>
    </div>
  );
};

export default Sidebar;
