import React from "react";
import styles from "./styles";
const WhiteButtonTable = (props) => {
  return (
    <button style={styles.whiteButtonTableStyle} {...props}>
      {props.image && props.imagealign === "left" && (
        <img src={props.image} alt="upload" className="mr-2" />
      )}
      <span
        className="text-subtitleText"
        style={styles.fontStyle}
        title={props.text}
      >
        {props.text}
      </span>
      {props.image && props.imagealign === "right" && (
        <img src={props.image} alt="upload" className="ml-2" />
      )}
    </button>
  );
};

export default WhiteButtonTable;
