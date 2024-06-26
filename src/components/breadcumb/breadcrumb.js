import React from "react";
import Link from "next/link";
import Image from "next/image";

const Breadcrumb = (props) => {
  return (
    <div className="flex items-center">
      <Link href={"/dashboard"}>
        <Image
          src="/images/dashboard-icon.svg"
          className="p-1"
          alt=""
          height={24}
          width={24}
        />
      </Link>
      {props?.data?.map((item, index) => (
        <div key={index} className="flex">
          <Image
            src="/images/gray-slash.svg"
            className="p-1"
            alt=""
            height={20}
            width={20}
          />
          <Link
            className={`py-1 px-2
            ${
              item?.active
                ? "bg-gray50 text-primary font-bold"
                : "bg-transparent text-gray-400 font-normal"
            }  rounded-md text-[14px]  flex items-center`}
            href={item.link}
          >
            {item.title}
          </Link>
        </div>
      ))}
    </div>
  );
};

export default Breadcrumb;
