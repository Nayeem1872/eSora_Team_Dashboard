import React from "react";
import styles from "./styles";
const PrimaryButtonTable = (props) => {
  return (
    <button
      style={{ ...styles.primaryButtonTableStyle, ...props?.style }}
      {...props}
    >
      <span
        className="text-white mr-2"
        style={styles.fontStyle}
        title={props.text}
      >
        {props.text}
      </span>
      {props.image && <img src={props.image} alt="upload" />}
    </button>
  );
};

export default PrimaryButtonTable;
