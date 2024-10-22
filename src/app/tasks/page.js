"use client";

import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

import ApiCaller from "@/config/apicaller";

import Breadcrumb from "@/components/breadcumb/breadcrumb";
import PageHeading from "@/components/pageheading/pageheading";
import Spacer from "@/components/spacer/spacer";
import Pagination from "@/components/pagination/pagination";
import PrimaryTable from "@/components/table/primarytable";
import PrimaryButtonTable from "@/components/buttons/primarybuttontable";
import StatusIndicator from "@/components/statusindicator/statusindicator";
import moment from "moment";

const breadcumbData = [{ title: "Tasks", link: "/tasks", active: true }];

const Tasks = () => {
  const router = useRouter();

  const [selectedRows, setSelectedRows] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [project, setProject] = useState([]);
  const [projectCount, setProjectCount] = useState(0);

  const [limit, setLimit] = useState(10);
  const [offset, setOffset] = useState(0);
  const [isLoading, setIsLoading] = useState(false);

  console.log(project);
  useEffect(() => {
    const fetchData = async () => {
      try {
        setIsLoading(true);
        const response = await ApiCaller.Get(
          `/projects/team-tasks?limit=${limit}&offset=${offset}`
        );
        console.log(response);
        if (response?.status === 200) {
          setProject(response?.data?.projects);
          setProjectCount(response?.data?.projectsCount);
        }
        setIsLoading(false);
      } catch (e) {
        console.log(e);
        setIsLoading(false);
      }
    };

    fetchData();
  }, []);

  const handlePagination = async (pageNumber) => {
    const offset = (pageNumber - 1) * limit;

    setIsLoading(true);
    try {
      const response = await ApiCaller.Get(
        `/projects/team-tasks?limit=${limit}&offset=${offset}`
      );

      if (response?.status === 200) {
        setProject(response?.data?.projects);
        setProjectCount(response?.data?.projectsCount);
      }
      setIsLoading(false);
      setOffset(offset);
    } catch (error) {
      setIsLoading(false);
      console.error("Error fetching project data:", error);
    }
  };

  const handleButtonClick = (projectId) => {
    router.push(`/tasks/${projectId}`);
  };

  const columns = [
    {
      title: "Project Name",
      dataIndex: "services",
      width: 200,
    },
    {
      title: "Priority",
      key: "priority",
      dataIndex: "priority",
      width: 100,
      render: (text, record) => (
        <StatusIndicator text={record?.priority} className="w-max" />
      ),
    },
    {
      title: "Status",
      key: "Status",
      dataIndex: "Status",
      width: 100,
      render: (text, record) => (
        <StatusIndicator text={record?.status} className="w-max" />
      ),
    },
    {
      title: "Assigned At",
      dataIndex: "Created",
      width: 150,
      render: (text, record) => (
        <>{moment(record?.createdAt).format("DD/MM/YYYY")}</>
      ),
    },
    {
      title: "Due By",
      dataIndex: "Due",
      width: 150,
      render: (text, record) => (
        <>
          {record?.dueDate ? moment(record?.dueDate).format("DD/MM/YYYY") : "-"}
        </>
      ),
    },
    {
      title: "Action",
      key: "action",
      width: 150,
      render: (text, record) => (
        <PrimaryButtonTable
          text="Details"
          image={"/images/arrow-right-white.svg"}
          onClick={() => handleButtonClick(record._id)}
          className="w-[200px]"
        />
      ),
    },
  ];

  return (
    <div>
      <Breadcrumb data={breadcumbData} />
      <Spacer height="32px" />
      <div className="flex justify-between">
        <PageHeading
          heading="Tasks"
          subHeading="Track, manage and forecast your Tasks."
        />
      </div>

      <Spacer height="32px" />
      <div className="border border-gray-200 shadow-clientCard rounded-2xl">
        <PrimaryTable
          rowKey={(record) => record?._id}
          selectedRows={selectedRows}
          setSelectedRows={setSelectedRows}
          columns={columns}
          data={project}
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
    </div>
  );
};

export default Tasks;
