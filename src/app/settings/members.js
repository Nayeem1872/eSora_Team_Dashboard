"use client";

import React, { useState, useEffect } from "react";
import { Select } from "antd";
import Image from "next/image";

import ApiCaller from "@/config/apicaller";

import SearchBar from "@/components/searchbar/searchbar";
import TableWithoutCheckbox from "@/components/table/tablewithoutcheckbox";
import Pagination from "@/components/pagination/pagination";
import WhiteButtonTable from "@/components/buttons/whitebuttontable";

import { useRouter } from "next/navigation";

const Members = (props) => {
  const route = useRouter();

  const [offset, setOffset] = useState(0);
  const [currentPage, setCurrentPage] = useState(1);

  const [isSelectOpen, setIsSelectOpen] = useState(false);

  useEffect(() => {
    props?.fetchTeamData();
  }, [props?.search]);

  const handleView = (id) => {
    route.push(`/settings/team/${id}`);
  };

  const handlePagination = async (pageNumber) => {
    const offset = (pageNumber - 1) * 10;

    try {
      props?.setLoading(true);
      const response = await ApiCaller.Get(
        `/admin/getteams?name=${props?.search}&limit=10&offset=${offset}`
      );
      console.log(response);
      if (response?.status === 200) {
        props?.setData(response.data.teams);
        props?.setTeamsCount(response.data.teamsCount);
      }
      props?.setLoading(false);

      setOffset(offset);
    } catch (error) {
      props?.setLoading(false);
      console.error("Error fetching activity data:", error);
    }
  };

  const handleOpenChange = (e) => {
    setIsSelectOpen(e);
  };

  const handleRoleChange = async (role, team) => {
    props?.setLoading(true);
    const payload = { role };

    const response = await ApiCaller.Post(
      `/admin/teamupdate/${team._id}`,
      payload
    );
    if (response.status === 200) {
      const response = await ApiCaller.Get(
        `/admin/getteams?name=${props?.search}&limit=10&offset=${offset}`
      );
      console.log(response);
      if (response?.status === 200) {
        props?.setData(response.data.teams);
        props?.setTeamsCount(response.data.teamsCount);
      }
      props?.setLoading(false);
    } else {
      props?.setLoading(false);
      console.log(response);
    }
  };

  const handleDeleteTeam = async (teamId) => {
    props?.setLoading(true);

    const response = await ApiCaller.Put(`/admin/teamdelete/${teamId}`);
    if (response.status === 200) {
      const response = await ApiCaller.Get(
        `/admin/getteams?name=${props?.search}&limit=10&offset=${offset}`
      );
      console.log(response);
      if (response?.status === 200) {
        props?.setData(response.data.teams);
        props?.setTeamsCount(response.data.teamsCount);
      }
      props?.setLoading(false);
    } else {
      props?.setLoading(false);
      console.log(response);
    }
  };

  const columns = [
    {
      title: "Name",
      dataIndex: "name",
      width: 300,
      render: (text, record) => (
        <div className="flex flex-col">
          <p className="m-0 text-primary text-[14px] font-bold">
            {record?.name}
          </p>
          <p className="m-0 text-subtitleText text-[14px] font-normal">
            {record?.email}
          </p>
        </div>
      ),
    },
    {
      title: "Role",
      dataIndex: "role",
      width: 200,
      render: (text, record) => (
        <Select
          className="w-full table-select capitalize"
          value={record?.role}
          showSearch
          suffixIcon={
            <Image
              src={"/images/table-dropdown-icon.svg"}
              height={20}
              width={20}
              alt=""
              className={isSelectOpen ? "rotate-180" : ""}
            />
          }
          onDropdownVisibleChange={handleOpenChange}
          onChange={(e) => handleRoleChange(e, record)}
        >
          {props?.roleData?.map((roleData, index) => (
            <Select.Option
              key={index}
              value={roleData?.title}
              className="capitalize"
            >
              {roleData?.title}
            </Select.Option>
          ))}
        </Select>
      ),
    },

    {
      title: " ",
      dataIndex: "action",
      width: 150,
      render: (text, record) => (
        <div className="flex items-center justify-end gap-3">
          <p
            className="m-0 text-subtitleText text-[14px] font-medium cursor-pointer"
            onClick={() => handleDeleteTeam(record._id)}
          >
            Delete
          </p>
          <WhiteButtonTable
            onClick={() => handleView(record?._id)}
            text="View"
          />
        </div>
      ),
    },
  ];

  return (
    <div>
      <SearchBar
        value={props?.search || undefined}
        onChange={(e) => props?.setSearch(e.target.value)}
      />
      <div className="h-[1px] bg-grayBorderDashboard my-4"></div>
      <div className="border border-gray-200 shadow-clientCard rounded-2xl">
        <TableWithoutCheckbox
          rowKey={(record) => record._id}
          columns={columns}
          data={props?.data}
          loading={props?.loading || props?.roleLoading}
          scroll={{
            x: 500,
          }}
        />
        <div className="pt-[11px] pb-4 px-6 flex items-center justify-between border-t border-t-grayBorder radius-b-l-2">
          <Pagination
            totalPages={props?.teamsCount}
            limit={10}
            currentPage={currentPage}
            setCurrentPage={setCurrentPage}
            onChange={handlePagination}
          />
        </div>
      </div>
    </div>
  );
};

export default Members;
