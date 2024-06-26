"use client";

import React, { useState, useEffect } from "react";
import Image from "next/image";
import { Tabs, Modal, Select, message } from "antd";

import ApiCaller from "@/config/apicaller";

import Spacer from "@/components/spacer/spacer";
import WhiteButton from "@/components/buttons/whitebutton";
import DefaultInput from "@/components/inputs/defaultinput";
import YellowButton from "@/components/buttons/yellowbutton";

import Members from "./members";
import Role from "./role";

const Team = () => {
  const [activeKey, setActivekey] = useState("1");

  const [roleData, setRoleData] = useState([]);

  const [isOpen, setIsOpen] = useState(false);
  const [roles, setRoles] = useState([{ label: "", value: "" }]);
  const [roleLoading, setRoleLoading] = useState(false);

  const [search, setSearch] = useState("");
  const [data, setData] = useState([]);
  const [teamsCount, setTeamsCount] = useState(0);
  const [loading, setLoading] = useState(false);

  const [isAddTeamMemberOpen, setIsAddTeamMemberOpen] = useState(false);
  const [state, setState] = useState({
    role: "",
    name: "",
    phoneNumber: "",
    designation: "",
    email: "",
  });

  useEffect(() => {
    getAllRoles();
    fetchTeamData();
  }, []);

  const defaultState = () => {
    setState({
      role: "",
      name: "",
      phoneNumber: "",
      designation: "",
      email: "",
    });
  };

  const changeTab = (e) => {
    setActivekey(e);
  };

  const handleAddMoreRoles = () => {
    setRoles([...roles, { label: "", value: "" }]);
  };

  const getAllRoles = async () => {
    try {
      setRoleLoading(true);
      const response = await ApiCaller.Get(`/roles`);
      if (response.status === 200) {
        setRoleData(response.data.roles);
      } else {
        console.log(response);
      }
      setRoleLoading(false);
    } catch (e) {
      console.log(e);
    }
  };

  const handleAddRole = async () => {
    try {
      setRoleLoading(true);

      const filteredRoles = roles.filter((item) => item.label !== "");
      const payload = { roles: filteredRoles };

      const response = await ApiCaller.Post(`/roles`, payload);
      console.log(response);
      if (response?.status === 200) {
        setTimeout(() => {
          getAllRoles();
        }, 2000);
      }
      setRoleLoading(false);
      setIsOpen(false);
      setRoles([{ label: "", value: "" }]);
    } catch (error) {
      console.error("Error adding role data:", error);
    }
  };

  const fetchTeamData = async () => {
    try {
      setLoading(true);

      const response = await ApiCaller.Get(
        `/admin/getteams?name=${search}&limit=10&offset=0`
      );

      console.log(response);
      if (response?.status === 200) {
        setData(response.data.teams);
        setTeamsCount(response.data.teamsCount);
      }
      setLoading(false);
    } catch (error) {
      setLoading(false);
      console.error("Error fetching team data:", error);
    }
  };

  const handleAddTeamMember = async () => {
    try {
      setIsAddTeamMemberOpen(false);
      const data = {
        name: state?.name,
        email: state?.email,
        phoneNumber: state?.phoneNumber,
        role: state?.role,
        designation: state?.designation,
      };
      const response = await ApiCaller.Post(`/admin/teamregister`, data);
      console.log(response);

      if (response?.status === 200) {
        message.success("Team member added successfully");
        defaultState();
        fetchTeamData();
      }
    } catch (error) {
      console.error("Error adding team member:", error);
    }
  };

  const items = [
    {
      key: "1",
      label: "Members",
      children: (
        <Members
          roleData={roleData}
          roleLoading={roleLoading}
          fetchTeamData={fetchTeamData}
          data={data}
          setData={setData}
          teamsCount={teamsCount}
          setTeamsCount={setTeamsCount}
          loading={loading}
          setLoading={setLoading}
          search={search}
          setSearch={setSearch}
        />
      ),
    },
    {
      key: "2",
      label: "Role",
      children: (
        <Role
          roleData={roleData}
          roleLoading={roleLoading}
          getAllRoles={getAllRoles}
        />
      ),
    },
  ];

  return (
    <div>
      <Spacer height="32px" />
      <div className="w-[70%] m-auto flex flex-col rounded-xl shadow-md">
        <div className="p-6 bg-primary rounded-t-xl flex justify-between gap-2 flex-wrap items-center">
          <div className="flex flex-col">
            <h2 className="headers text-white text-[20px] font-bold m-0">
              Team
            </h2>
            <p className="text-[16px] font-normal text-[#FFFFFFCC] m-0">
              Add and manage your services
            </p>
          </div>
          <div className="flex gap-4">
            <WhiteButton text="Add Role" onClick={() => setIsOpen(true)} />
            <YellowButton
              text="Add Team Member"
              onClick={() => setIsAddTeamMemberOpen(true)}
            />
          </div>
        </div>
        <div className="p-6">
          <Tabs
            defaultActiveKey={"1"}
            activeKey={activeKey}
            items={items}
            onChange={changeTab}
          />
        </div>
      </div>
      {isOpen && (
        <Modal
          open={isOpen}
          centered={true}
          onCancel={() => setIsOpen(false)}
          closeIcon={false}
          footer={[
            <div className="grid grid-cols-2 gap-3" key={1}>
              <WhiteButton text={"Cancel"} onClick={() => setIsOpen(false)} />
              <YellowButton text={"Add"} onClick={handleAddRole} />
            </div>,
          ]}
          className="add-team-member"
        >
          <div>
            <h1 className="headers text-primary text-[20px] m-0">Add Role</h1>
            <Spacer height="32px" />
            {roles?.map((role, index) => (
              <>
                <DefaultInput
                  placeholder="Enter Role Name"
                  onChange={(e) => {
                    let newValue = [...roles];

                    newValue[index].label = e.target.value;
                    newValue[index].value = e.target.value;
                    setRoles(newValue);
                  }}
                  key={index}
                  value={role?.value}
                />
                <Spacer height="16px" />
              </>
            ))}
            <div
              className="flex gap-2 justify-center items-center"
              onClick={handleAddMoreRoles}
            >
              <Image
                src="/images/plus-icon.svg"
                alt=""
                height={20}
                width={20}
              />
              <p className="text-[16px] font-medium text-subtitleText m-0">
                Add another role field
              </p>
            </div>
            <Spacer height="32px" />
          </div>
        </Modal>
      )}
      {isAddTeamMemberOpen && (
        <Modal
          open={isAddTeamMemberOpen}
          centered={true}
          onCancel={() => setIsAddTeamMemberOpen(false)}
          closeIcon={false}
          footer={[
            <div className="grid grid-cols-2 gap-3" key={1}>
              <WhiteButton
                text={"Cancel"}
                onClick={() => setIsAddTeamMemberOpen(false)}
              />
              <YellowButton text={"Add Member"} onClick={handleAddTeamMember} />
            </div>,
          ]}
          className="add-team-member"
        >
          <div>
            <h1 className="headers text-headerText text-[20px] font-bold m-0">
              Add Team Member
            </h1>
            <Spacer height="32px" />
            <div>
              <p className="text-[14px] font-semibold text-[#0B132B] m-0">
                Role
              </p>
              <Spacer height="6px" />
              <Select
                placeholder="Select Role"
                value={state?.role || undefined}
                onChange={(e) => setState({ ...state, role: e })}
                showSearch
                style={{ width: "100%" }}
                className="role-dropdown"
              >
                {roleData?.map((item, index) => (
                  <Select.Option value={item?.title} key={index}>
                    {item?.title}
                  </Select.Option>
                ))}
              </Select>
              <Spacer height="6px" />
              <p className="text-[14px] font-semibold text-[#0B132B] m-0">
                Member Name
              </p>
              <Spacer height="6px" />
              <DefaultInput
                value={state.name}
                placeholder="Enter member name"
                onChange={(e) => setState({ ...state, name: e.target.value })}
              />
              <Spacer height="6px" />
              <p className="text-[14px] font-semibold text-[#0B132B] m-0">
                Designation
              </p>
              <Spacer height="6px" />
              <DefaultInput
                value={state.designation}
                placeholder="Enter Designation"
                onChange={(e) =>
                  setState({ ...state, designation: e.target.value })
                }
              />
              <Spacer height="6px" />
              <p className="text-[14px] font-semibold text-[#0B132B] m-0">
                Email
              </p>
              <Spacer height="6px" />
              <DefaultInput
                value={state.email}
                placeholder="Enter email"
                onChange={(e) => setState({ ...state, email: e.target.value })}
              />
              <Spacer height="6px" />
              <p className="text-[14px] font-semibold text-[#0B132B] m-0">
                Phone Number
              </p>
              <Spacer height="6px" />
              <DefaultInput
                value={state.phoneNumber}
                placeholder="Enter phone number"
                onChange={(e) =>
                  setState({ ...state, phoneNumber: e.target.value })
                }
                type="number"
              />
              <Spacer height="32px" />
            </div>
          </div>
        </Modal>
      )}
    </div>
  );
};

export default Team;
