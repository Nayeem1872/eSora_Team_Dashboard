import React from "react";
import { Select, Space } from "antd";

import currencyList from "@/utils/mockdata/currencylist";

const CurrencyDropdownInput = (props) => {
  return (
    <div className="realtive w-full py-[10px] px-[14px] border border-gray300 shadow-sm bg-white rounded-lg flex text-[12px]">
      <Space.Compact>
        <Select
          defaultValue={props?.state?.currency || "USD"}
          onChange={(e) => {
            const value = JSON.parse(e);
            props?.setState({
              ...props?.state,
              currency: value?.code,
              currencySymbol: value?.symbol_native,
            });
          }}
          className="custom-select w-[120px]"
          showSearch
        >
          {currencyList.map((item) => (
            <Select.Option key={item.code} value={JSON.stringify(item)}>
              {item.code}
            </Select.Option>
          ))}
        </Select>
        <div className="text-[16px] w-[70px] flex justify-center items-center">
          {props?.state?.currencySymbol || "$"}
        </div>
        <input
          type="number"
          className="text-[16px] w-full outline-none"
          value={props?.state?.price || ""}
          onChange={(e) =>
            props?.setState({
              ...props?.state,
              price: e.target.value,
            })
          }
        />
      </Space.Compact>
    </div>
  );
};
export default CurrencyDropdownInput;
