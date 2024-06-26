import React from "react";
import Image from "next/image";

import styles from "./styles";

const Container = ({ children }) => {
  return (
    <div className={styles.container}>
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
          height={32}
          width={208}
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
    </div>
  );
};

export default Container;
