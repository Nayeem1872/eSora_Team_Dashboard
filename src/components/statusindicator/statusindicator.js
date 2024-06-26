import React from "react";
import Image from "next/image";
import styles from "./styles";

const StatusIndicator = (props) => {
  let style = "";
  if (props?.text?.toLowerCase() === "high") {
    style = styles.statusHigh;
  } else if (props?.text?.toLowerCase() === "medium") {
    style = styles.statusMedium;
  } else if (props?.text?.toLowerCase() === "low") {
    style = styles.statusLow;
  } else if (props?.text?.toLowerCase() === "completed") {
    style = styles.statusCompleted;
  } else if (props?.text?.toLowerCase() === "overdue") {
    style = styles.statusOverdue;
  } else if (props?.text?.toLowerCase() === "in progress") {
    style = styles.statusInProgress;
  } else {
    style = styles.general;
  }

  return (
    <div
      style={{
        ...style,
        ...styles.container,
        ...props?.style,
        padding: !props?.text ? "0px" : " 6px 12px",
      }}
      {...props}
    >
      <span
        style={{
          whiteSpace: "nowrap",
          overflow: "hidden",
          textOverflow: "ellipsis",
          textTransform: "capitalize",
        }}
        title={props?.text}
      >
        {props?.text}
      </span>
      {props?.icon && (
        <Image
          src={props?.icon}
          style={{ marginLeft: "6px" }}
          alt="icon"
          height={20}
          width={20}
        />
      )}
    </div>
  );
};

export default StatusIndicator;
