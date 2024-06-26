"use client";

import React, { useEffect, useState } from "react";
import Image from "next/image";
import { useRouter, usePathname } from "next/navigation";
import moment from "moment";

import ApiCaller from "@/config/apicaller";

import StatusIndicator from "@/components/statusindicator/statusindicator";
import WhiteButton from "@/components/buttons/whitebutton";
import YellowButton from "@/components/buttons/yellowbutton";
import Spacer from "@/components/spacer/spacer";
import PageHeading from "@/components/pageheading/pageheading";
import WhiteButtonTable from "@/components/buttons/whitebuttontable";
import TableWithoutCheckbox from "@/components/table/tablewithoutcheckbox";
import Pagination from "@/components/pagination/pagination";
import Loader from "@/components/loader";

const Team = () => {
  const router = useRouter();
  const pathname = usePathname();

  const [currentPage, setCurrentPage] = useState(1);
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);

  const id = pathname?.split("/")[3];

  useEffect(() => {
    fetchTeamData();
  }, [id]);

  const columns = [
    {
      title: "Project Name",
      dataIndex: "services",
      width: 200,
      render: (text, record) => <div>{record?.project?.services}</div>,
    },
    {
      title: "Priority",
      dataIndex: "priority",
      width: 150,
      render: (text, record) => (
        <StatusIndicator
          text={record?.project?.priority || "N/A"}
          className="w-max"
        />
      ),
    },
    {
      title: "Status",
      dataIndex: "Status",
      width: 150,
      render: (text, record) => (
        <StatusIndicator
          text={record?.project?.status || "N/A"}
          className="w-max"
        />
      ),
    },
    {
      title: "Assigned At",
      dataIndex: "assignedon",
      width: 150,
      render: (text, record) => (
        <div>{moment(record?.assingedOn).format("DD/MM/YYYY")}</div>
      ),
    },
    {
      title: "Due By",
      dataIndex: "dueDtae",
      width: 200,
      render: (text, record) => (
        <div className="flex flex-wrap items-center gap-2">
          {moment(record?.project?.dueDate).format("DD/MM/YYYY")}{" "}
          {new Date(record?.project?.dueDate) < new Date() && (
            <StatusIndicator text="overdue" className="w-max" />
          )}
        </div>
      ),
    },
    {
      title: " ",
      dataIndex: "action",
      width: 250,
      render: (text, record) => (
        <div className="flex items-center justify-end gap-3">
          <p
            className="m-0 text-subtitleText text-[14px] font-medium cursor-pointer"
            onClick={() => handleRemoveFromProject(record?.project?._id)}
          >
            Delete
          </p>
          <WhiteButtonTable
            text="View"
            onClick={() =>
              router.push(
                `/clients/${record?.project?.companyId}/projects?projectid=${record?.project?._id}`
              )
            }
          />
        </div>
      ),
    },
  ];

  const fetchTeamData = async () => {
    setLoading(true);
    try {
      const payload = {
        teamId: id,
      };
      const response = await ApiCaller.Post("/admin/getteam", payload);
      console.log(response);
      if (response?.status === 200) {
        setData(response.data.team);
      }
      setLoading(false);
    } catch (error) {
      setLoading(false);
      console.error("Error fetching team data:", error);
    }
  };

  const handleDelete = async () => {
    try {
      const response = await ApiCaller.Put(`/admin/teamdelete/${id}`);
      if (response.status === 200) {
        router.push("/settings");
      }
    } catch (error) {
      console.log(error);
    }
  };
  const handleRemoveFromProject = async (projectid) => {
    try {
      const data = {
        teamId: id,
        projectId: projectid,
      };
      const response = await ApiCaller.Put("/admin/removetoproject", data);
      console.log("handle remove from project", response);
      if (response.status === 200) {
        fetchTeamData();
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
      {loading ? (
        <Loader />
      ) : (
        <div>
          <Spacer height="32px" />
          <div className="flex items-start justify-between">
            <PageHeading
              heading={data?.name}
              subHeading="Mange your team members right from here."
            />
            <div className="flex space-x-4">
              <button
                className="px-4 py-2 bg-white rounded-lg border border-gray-300 shadow-xs p-4"
                onClick={handleDelete}
              >
                <Image
                  height={20}
                  width={20}
                  alt=""
                  src="/images/trash-2.svg"
                />
              </button>
              <button
                onClick={() => router.push("/settings?tab=3")}
                className="px-4 py-2 bg-white rounded-lg border border-gray-300 shadow-xs p-4"
              >
                <Image height={20} width={20} alt="" src="/images/x.svg" />
              </button>
            </div>
          </div>
          <Spacer height="64px" />
          <div className="w-[90%] lg:w-[70%] m-auto flex flex-col rounded-xl shadow-md">
            <div className="p-6 bg-primary rounded-t-xl flex justify-between flex-wrap gap-2 items-center">
              <div className="flex flex-col">
                <h2 className="headers text-white text-[20px] font-bold m-0">
                  {data?.name}
                </h2>
                <p className="text-[16px] mt-4 font-normal text-[#FFFFFFCC] m-0">
                  Joined at 11 January, 2023
                </p>
              </div>
              <div className="flex gap-4">
                <WhiteButton
                  text="Send Message"
                  image={"/images/send-msg-icon.svg"}
                  imagealign="left"
                />
                <YellowButton text="Assign a Task" />
              </div>
            </div>
            <div className="flex justify-between p-6 bg-[#F9FAFB] items-center">
              <div className="w-full whitespace-nowrap text-ellipsis overflow-hidden">
                <div className="text-gray-700 font-sans text-base font-normal leading-5">
                  Role
                </div>
                <div
                  className="overflow-hidden leading-6 truncate font-bold text-black font-sans text-xl"
                  title={data?.role}
                >
                  {data?.role ?? "N/A"}
                </div>
              </div>
              <div className="w-full whitespace-nowrap text-ellipsis overflow-hidden">
                <div className="text-gray-700 font-sans text-base font-normal leading-5">
                  Email
                </div>
                <div
                  className="overflow-hidden leading-6 truncate font-bold text-black font-sans text-xl"
                  title={data?.email}
                >
                  {data?.email ?? "N/A"}
                </div>
              </div>
            </div>

            <div className="p-[24px]">
              <div className="overflow-hidden  leading-6 truncate font-bold text-black font-sans text-xl">
                About
              </div>
              <div className="text-gray-700 mt-5 font-sans text-base font-normal leading-5">
                {data?.about ?? "-"}
              </div>
            </div>

            <div className="flex p-[24px] bg-[#F9FAFB]  flex-col">
              <h2 className="headers mb-6 text-[#0B132B] text-[20px] font-bold m-0">
                Assigned Tasks
              </h2>

              <div className="border border-gray-200 shadow-clientCard rounded-2xl">
                <TableWithoutCheckbox
                  columns={columns}
                  data={data?.projects}
                  rowKey={(record) => record?._id}
                  scroll={{ x: 800 }}
                />
                {data?.projects?.length > 0 && (
                  <div className="pt-[11px] pb-4 px-6 flex items-center justify-between border-t border-t-grayBorder radius-b-l-2">
                    <Pagination
                      totalPages={data?.projects?.length}
                      limit={10}
                      currentPage={currentPage}
                      setCurrentPage={setCurrentPage}
                      // onChange={handlePagination}
                    />
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default Team;
