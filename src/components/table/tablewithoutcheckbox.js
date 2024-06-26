import React from "react";
import { Table } from "antd";

const TableWithoutCheckbox = (props) => {
  const getRowClassName = (record, index) => {
    if (index % 2 === 0) {
      return "highlight-row";
    }
    return "";
  };

  return (
    <Table
      columns={props?.columns}
      dataSource={props?.data}
      {...props}
      pagination={false}
      rowClassName={getRowClassName}
    />
  );
};

export default TableWithoutCheckbox;
