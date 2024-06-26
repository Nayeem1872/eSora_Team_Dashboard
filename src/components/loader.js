import React from "react";
import { LoadingOutlined } from "@ant-design/icons";
import { Spin } from "antd";
const Loader = (props) => (
  <div
    style={{
      width: "100%",
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
      padding: "10px",
    }}
  >
    <Spin
      indicator={
        <LoadingOutlined
          style={{
            fontSize: 36,
            color: props?.color || "#0b132b",
          }}
          spin
        />
      }
    />
  </div>
);
export default Loader;
