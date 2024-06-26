"use client";

import React, { useState, useEffect } from "react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { message } from "antd";

import ApiCaller from "@/config/apicaller";

import styles from "./styles";

const Login = () => {
  const router = useRouter();

  const [email, setEmail] = useState("test@gamil.com");
  const [password, setPassword] = useState("testPass");
  const [rememberMe, setRememberMe] = useState(false);
  const [errorEmail, setErrorEmail] = useState("");
  const [errorPassword, setErrorPassword] = useState("");

  useEffect(() => {
    const token = localStorage.getItem("user");
    if (token) {
      router.push("/dashboard");
    }
  }, []);

  const onSubmit = async () => {
    if (!email) {
      setErrorEmail("Email is required");
    } else if (!password) {
      setErrorPassword("Password is required");
    } else {
      const data = { email, password };

      const response = await ApiCaller.Post("/auth/login", data);

      if (response?.status === 200) {
        localStorage.setItem(
          "user",
          JSON.stringify({ email, ...response?.data })
        );
        message.success("Logged in successfully!");
        router.push("/dashboard");
      } else {
        console.error(response?.data?.message);
      }
    }
  };
  return (
    <div className={styles.container}>
      <div className={styles.header}>Admin Login</div>
      <div className={styles.formContainer}>
        <div>
          <div className="mb-[20px]">
            <div className={styles.labelStyle}>User Name or Email</div>

            <input
              className={styles.inputStyle}
              type="email"
              value={email || undefined}
              onChange={(e) => {
                setErrorEmail("");
                setEmail(e.target.value);
              }}
              required
              placeholder="e. g. johndoe"
            />

            {errorEmail && <div className={styles.errorText}>{errorEmail}</div>}
          </div>
          <div className="mb-[20px]">
            <div className={styles.labelStyle}>Password</div>

            <input
              className={styles.inputStyle}
              type="password"
              value={password || undefined}
              onChange={(e) => {
                setErrorPassword("");
                setPassword(e.target.value);
              }}
              required
            />

            {errorPassword && (
              <div className={styles.errorText}>{errorPassword}</div>
            )}
          </div>
          <div className={styles.checkboxContainer}>
            <div className={styles.justifyCenterItemsCenter}>
              <input
                type="checkbox"
                checked={rememberMe || undefined}
                onChange={() => setRememberMe(!rememberMe)}
                className={styles.checkbox}
              />
            </div>
            <div className={styles.loginText}>Keep me logged in</div>
          </div>
        </div>
        <div className={styles.loginContainer}>
          <button className={styles.loginButton} onClick={onSubmit}>
            <div className={styles.loginText}>Log in</div>
            <Image
              src="/images/arrow-right.svg"
              alt="logo"
              height={20}
              width={20}
            />
          </button>
        </div>
      </div>
    </div>
  );
};

export default Login;
