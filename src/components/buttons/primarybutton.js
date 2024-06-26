import React from "react";
import styles from "./styles";
const PrimaryButton = (props) => {
  return (
    <button
      style={{
        ...styles.primaryButtonStyle,
        opacity: props?.disabled ? "0.5" : "1",
      }}
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

export default PrimaryButton;
