"use client";

import React, { useEffect } from "react";
import { useRouter } from "next/navigation";

import styles from "./styles";

const Content = ({ children }) => {
  const router = useRouter();

  useEffect(() => {
    const token = localStorage.getItem("user");
    if (!token) {
      router.push("/login");
    }
  }, []);

  return <div className={styles.contentContainer}>{children}</div>;
};

export default Content;
