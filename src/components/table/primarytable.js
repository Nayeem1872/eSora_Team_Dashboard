import React from "react";
import { Table } from "antd";

const PrimaryTable = (props) => {
  const getRowClassName = (record, index) => {
    if (index % 2 === 0) {
      return "highlight-row";
    }
    return "";
  };

  const onSelectChange = (newSelectedRowKeys, selectedRows) => {
    props?.setSelectedRows(selectedRows);
  };

  const rowSelection = {
    selectedRows: props?.selectedRows,
    onChange: onSelectChange,
  };

  return (
    <Table
      {...props}
      rowSelection={rowSelection}
      columns={props?.columns}
      dataSource={props?.data}
      pagination={false}
      rowClassName={getRowClassName}
    />
  );
};

export default PrimaryTable;
