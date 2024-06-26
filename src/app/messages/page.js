"use client"
import Breadcrumb from "@/components/breadcumb/breadcrumb";
import PrimaryButtonTable from "@/components/buttons/primarybuttontable";
import YellowButton from "@/components/buttons/yellowbutton";
import PageHeading from "@/components/pageheading/pageheading";
import Pagination from "@/components/pagination/pagination";
import Spacer from "@/components/spacer/spacer";
import StatusIndicator from "@/components/statusindicator/statusindicator";
import PrimaryTable from "@/components/table/primarytable";
import moment from "moment";
import { useRouter } from "next/navigation";
import React, { useState } from "react";

const Messages = () => {
  const [selectedRows, setSelectedRows] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [project, setProject] = useState([]);
  const [projectCount, setProjectCount] = useState(0);
  const router = useRouter();
  const [limit, setLimit] = useState(10);
  const [offset, setOffset] = useState(0);
  const [isLoading, setIsLoading] = useState(false);
  const breadcumbData = [{ title: "Messages", link: "/team", active: true }];


  const columns = [
    {
      title: "Task Name",
      dataIndex: "services",
      width: 200,
    },
    {
      title: "Last Message",
      key: "priority",
      dataIndex: "priority",
      width: 100,
      render: (text, record) => (
        <StatusIndicator text={record?.priority} className="w-max" />
      ),
    },
    {
      title: "Sent On",
      key: "Status",
      dataIndex: "Status",
      width: 100,
      render: (text, record) => (
        <StatusIndicator text={record?.status} className="w-max" />
      ),
    },
    
    {
      title: "Action",
      key: "action",
      width: 150,
      render: (text, record) => (
        <PrimaryButtonTable
          text="View Message"
          image={"/images/arrow-right-white.svg"}
          onClick={() => handleButtonClick(record._id)}
          className="w-[200px]"
        />
      ),
    },
  ];



  const dummyData = [
    {
      _id: "1",
      services: "Website Redesign",
      priority: "High",
      status: "2023-06-25T12:00:00Z", // Assuming this is in ISO format
    },
    {
      _id: "2",
      services: "Mobile App Development",
      priority: "Medium",
      status: "2023-06-24T15:30:00Z",
    },
    {
      _id: "3",
      services: "SEO Optimization",
      priority: "Low",
      status: "2023-06-23T10:45:00Z",
    },
    {
      _id: "4",
      services: "Content Creation",
      priority: "High",
      status: "2023-06-22T08:00:00Z",
    },
    {
      _id: "5",
      services: "Social Media Marketing",
      priority: "Medium",
      status: "2023-06-21T14:15:00Z",
    },
  ];
  
  const handleButtonClick = (id) => {
    router.push(`/tasks/${id}`);
  };




  return (
    <>
      <Breadcrumb data={breadcumbData} />
      <Spacer height="32px" />
      <div className="flex justify-between">
        <PageHeading
          heading="Messages"
          subHeading="Track, manage and forecast your all messages."
        />
      </div>
      <Spacer height="32px" />
      <div className="border border-gray-200 shadow-clientCard rounded-2xl">
        <PrimaryTable
          rowKey={(record) => record?._id}
          selectedRows={selectedRows}
          setSelectedRows={setSelectedRows}
          columns={columns}
          data={dummyData}
          loading={isLoading}
          scroll={{
            x: 700,
          }}
        />

        <Spacer height="32px" />
        {project?.length > 0 && (
          <div className="pt-[11px] pb-4 px-6 flex items-center justify-between border-t border-t-grayBorder radius-b-l-2">
            <Pagination
              limit={limit}
              totalPages={projectCount}
              currentPage={currentPage}
              setCurrentPage={setCurrentPage}
              onChange={handlePagination}
            />
          </div>
        )}
      </div>


    </>
  );
};

export default Messages;
