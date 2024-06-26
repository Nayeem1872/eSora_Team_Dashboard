"use client";

import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { Modal } from "antd";
import Image from "next/image";

import Spacer from "../spacer/spacer";
import WhiteButton from "../buttons/whitebutton";
import YellowButton from "../buttons/yellowbutton";

import styles from "./styles";

const Container = ({ children }) => {
  const router = useRouter();

  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    const token = localStorage.getItem("user");
    if (!token) {
      router.push("/login");
    }
  }, []);

  return (
    <div className={styles.container}>
      <div className="flex justify-between items-center px-8 py-4">
        <div className={styles.logoContainer}>
          <Image
            src="/images/esora-logo.svg"
            alt="logo"
            className="mr-2"
            height={48}
            width={55}
          />
          <Image
            src="/images/esora-text-logo.svg"
            alt="logo"
            height={31}
            width={210}
          />
        </div>
        <Image
          src="/images/cross.svg"
          height={48}
          width={48}
          alt="cross"
          onClick={() => setIsOpen(true)}
        />
      </div>
      <div className={styles.valueContainer}>
        <Image
          src="/images/art-right-up.svg"
          alt="logo"
          className="absolute right-0 top-0 "
          height={272}
          width={144}
        />
        <Image
          src="/images/art-left-down.svg"
          alt="logo"
          className="absolute left-0 bottom-0 "
          height={186}
          width={186}
        />

        {children}
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
            <div className="h-12 w-12 rounded-full bg-warning100 flex justify-center items-center border-8 border-warning50 ">
              <Image
                src="/images/alert-triangle.svg"
                height={24}
                width={24}
                alt=""
              />
            </div>
            <Spacer height="20px" />
            <h1 className="headers text-primary text-[20px] mb-0">
              Are you sure you want to quit?
            </h1>

            <p className="font-normal text-[14px] text-subtitleText mb-0">
              Don’t worry you can save your current activity as draft, which you
              can access from the{" "}
              <span className="font-bold">“Projects/Draft”</span> and start
              again right from there.
            </p>
            <Spacer height="32px" />
            <div className="grid grid-cols-2 gap-3" key={1}>
              <WhiteButton text={"Cancel"} onClick={() => setIsOpen(false)} />
              <YellowButton
                text={"Save Draft"}
                onClick={() => router.push("/dashboard")}
              />
            </div>
          </div>
        </Modal>
      )}
    </div>
  );
};

export default Container;
