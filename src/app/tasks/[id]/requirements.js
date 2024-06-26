import React, { useState, useEffect } from "react";
import Image from "next/image";
import { Radio, Space, message, Upload, Progress, ConfigProvider } from "antd";

import Spacer from "@/components/spacer/spacer";
import YellowButton from "@/components/buttons/yellowbutton";
import WhiteButton from "@/components/buttons/whitebutton";
import truncateString from "@/utils/truncatestring";

import ApiCaller from "@/config/apicaller";
import TextBox from "@/components/textbox/textbox";
import DefaultInput from "@/components/inputs/defaultinput";

const geographicalOptions = ["Local", "Regional", "National", "International"];
const targetAudienceOptions = [
  "Business to Business (B2B)",
  "Business to Consumer (B2C)",
  "Business to Government (B2G)",
];
const projectStartOptions = [
  "As soon as possible",
  "2-4 week",
  "More than 1 month",
  "More than 3 months",
  "I do not have any start date",
];
const projectEndOptions = [
  "Less than a month ",
  "1 - 3 months",
  "3 - 6 months",
  "6 - 12 months",
  "More than 12 months",
];
const mediaCostOptions = [
  "Yes",
  "no",
  "There is no media costs for this project",
];

const Requirements = ({ projectdata, fetchProjectData }) => {
  const [fileInfoList, setFileInfoList] = useState([]);

  const [isEditing, setIsEditing] = useState(false);

  const [state, setState] = useState({
    goals: projectdata?.goals,
    description: projectdata?.description,
    document: projectdata?.document,
    geographicalScope: projectdata?.geographicalScope,
    maturityProjects: projectdata?.maturityProjects,
    targetAudience: projectdata?.targetAudience,
    whenProjectComplete: projectdata?.whenProjectComplete,
    whenProjectStart: projectdata?.whenProjectStart,
    mediaCosts: projectdata?.mediaCosts,
  });
  const [isOtherstate, setIsOtherState] = useState({
    geographicalScope: false,
    targetAudience: false,
    whenProjectComplete: false,
    whenProjectStart: false,
    mediaCosts: false,
  });
  const [completed, setCompleted] = useState(0);
  const [percentage, setPercentage] = useState(0);

  useEffect(() => {
    let count = 0;
    if (projectdata?.goals) count += 1;
    if (projectdata?.description) count += 1;
    if (projectdata?.document?.length > 0) count += 1;
    if (projectdata?.geographicalScope) count += 1;
    if (projectdata?.maturityProjects) count += 1;
    if (projectdata?.targetAudience) count += 1;
    if (projectdata?.whenProjectComplete) count += 1;
    if (projectdata?.whenProjectStart) count += 1;
    if (projectdata?.mediaCosts) count += 1;
    setCompleted(count);

    const percentageCompleted = parseInt((count / 9) * 100);
    setPercentage(percentageCompleted);
  }, [projectdata]);

  useEffect(() => {
    const istargetAudienceOther = !targetAudienceOptions.includes(
      state?.targetAudience
    );
    const isgeographicalOther = !geographicalOptions.includes(
      state?.geographicalScope
    );
    const isProjectStartOther = !projectStartOptions.includes(
      state?.whenProjectStart
    );
    const isProjectEndOther = !projectEndOptions.includes(
      state?.whenProjectComplete
    );
    const isMediaCostOther = !mediaCostOptions.includes(state?.mediaCosts);

    setIsOtherState({
      ...isOtherstate,
      geographicalScope: isgeographicalOther,
      targetAudience: istargetAudienceOther,
      whenProjectComplete: isProjectEndOther,
      whenProjectStart: isProjectStartOther,
      mediaCosts: isMediaCostOther,
    });
  }, [projectdata, state]);

  const onChange = ({ fileList: newFileList }) => {
    setFileInfoList(newFileList);
  };

  const removeFile = (file) => {
    const newFileList = fileInfoList.filter((item) => item.uid !== file.uid);
    setFileInfoList(newFileList);
  };

  const removeFileDocument = (file) => {
    const newFileList = state?.document?.filter(
      (item) => item._id !== file._id
    );
    setState({ ...state, document: newFileList });
  };

  const handleSave = async () => {
    try {
      const formData = new FormData();

      formData.append("goals", state?.goals);
      formData.append("description", state?.description);
      formData.append("targetAudience", state?.targetAudience);
      formData.append("geographicalScope", state?.geographicalScope);
      formData.append("maturityProjects", state?.maturityProjects);
      formData.append("whenProjectStart", state?.whenProjectStart);
      formData.append("mediaCosts", state?.mediaCosts);
      formData.append("document", JSON.stringify(state?.document));
      formData.append("whenProjectComplete", state?.whenProjectComplete);

      if (fileInfoList && fileInfoList?.length > 0) {
        fileInfoList.forEach((file) => {
          formData.append("files", file.originFileObj);
        });
      }

      const response = await ApiCaller.Put(
        `/projects/${projectdata?._id}`,
        formData
      );

      if (response?.status === 200) {
        message.success("Project updated successfully");
        fetchProjectData();
        setIsEditing(false);
      }
    } catch (err) {
      console.log(err);
    }
  };

  const handleCancel = () => {
    setIsEditing(false);
    fetchProjectData();
  };

  const handleEdit = () => {
    setIsEditing(true);
  };

  return (
    <div className="border h-auto mx-[100px] lg:mx-[120px] mt-[24px] rounded-2xl shadow-md">
      <div className="flex justify-between items-center flex-wrap gap-2 p-[24px] bg-primary rounded-t-2xl ">
        <div className=" text-white flex items-center gap-2">
          <ConfigProvider
            theme={{
              components: {
                Progress: {
                  circleTextColor: "white",
                  remainingColor: "#333E60",
                  circleIconFontSize: "16px",
                },
              },
            }}
          >
            <Progress
              type="circle"
              percent={percentage}
              size="small"
              strokeColor={"#F7D046"}
              strokeWidth={12}
            />
          </ConfigProvider>
          <div>
            <div className="text-[24px] font-bold">Project Overview</div>
            <div className="text-[16px] font-normal">
              {completed}/9 completed
            </div>
          </div>
        </div>
        {isEditing ? (
          <div className="flex gap-4">
            <WhiteButton text={"Cancel"} onClick={handleCancel} />
            <YellowButton text={"Save"} onClick={handleSave} />
          </div>
        ) : (
          <div className="flex gap-4">
            <WhiteButton
              text={"Ask to Update"}
              imagealign={"left"}
              image={"/images/exclamation.svg"}
            />
            <WhiteButton
              text={"Edit"}
              imagealign={"left"}
              image={"/images/edit-pencil.svg"}
              onClick={handleEdit}
            />
          </div>
        )}
      </div>
      <div className="p-6">
        <div className="text-primary text-[16px] font-bold">
          What are the goals of the project?
        </div>
        <Spacer height="8px" />
        <div className="text-subtitleText text-[16px]">
          {!isEditing ? (
            <div>{state?.goals ?? "-"}</div>
          ) : (
            <TextBox
              rows={4}
              placeholder="Write something......."
              onChange={(e) => setState({ ...state, goals: e.target.value })}
              value={state?.goals}
            />
          )}
        </div>
      </div>

      <div className="p-6">
        <div className="text-primary text-[16px] font-bold">
          What is the target audience?
        </div>
        <Spacer height="8px" />
        {!isEditing ? (
          <div className="text-subtitleText text-[16px]">
            {state?.targetAudience ?? "-"}
          </div>
        ) : (
          <Radio.Group
            onChange={(e) =>
              setState({ ...state, targetAudience: e.target.value })
            }
            value={state?.targetAudience}
            style={{ width: "100%" }}
          >
            <Space direction="vertical">
              {targetAudienceOptions.map((option) => (
                <Radio
                  key={option}
                  value={option}
                  className={`${
                    state?.targetAudience === option
                      ? "text-[16px] text-primary font-semibold"
                      : "text-[16px] text-subtitleText font-medium"
                  }`}
                >
                  {option}
                </Radio>
              ))}
              <Radio
                value={
                  isOtherstate?.targetAudience ? state?.targetAudience : ""
                }
                className={`${
                  isOtherstate?.targetAudience
                    ? "text-[16px] text-primary font-semibold"
                    : "text-[16px] text-subtitleText font-medium"
                }`}
              >
                <DefaultInput
                  placeholder="Others (Please Specify)"
                  onChange={(e) =>
                    setState({ ...state, targetAudience: e.target.value })
                  }
                  value={
                    isOtherstate?.targetAudience ? state?.targetAudience : ""
                  }
                />
              </Radio>
            </Space>
          </Radio.Group>
        )}
      </div>
      <div className="p-6">
        <div className="text-primary text-[16px] font-bold">
          What is the geographical scope?
        </div>
        <Spacer height="8px" />
        {!isEditing ? (
          <div className="text-subtitleText text-[16px]">
            {state?.geographicalScope ?? "-"}
          </div>
        ) : (
          <Radio.Group
            onChange={(e) =>
              setState({ ...state, geographicalScope: e.target.value })
            }
            value={state?.geographicalScope}
            style={{ width: "100%" }}
          >
            <Space direction="vertical">
              {geographicalOptions.map((option) => (
                <Radio
                  key={option}
                  value={option}
                  className={`${
                    state?.geographicalScope === option
                      ? "text-[16px] text-primary font-semibold"
                      : "text-[16px] text-subtitleText font-medium"
                  }`}
                >
                  {option}
                </Radio>
              ))}
              <Radio
                value={
                  isOtherstate?.geographicalScope
                    ? state?.geographicalScope
                    : ""
                }
                className={`${
                  isOtherstate?.geographicalScope
                    ? "text-[16px] text-primary font-semibold"
                    : "text-[16px] text-subtitleText font-medium"
                }`}
              >
                <DefaultInput
                  placeholder="Others (Please Specify)"
                  onChange={(e) =>
                    setState({ ...state, geographicalScope: e.target.value })
                  }
                  value={
                    isOtherstate?.geographicalScope
                      ? state?.geographicalScope
                      : ""
                  }
                />
              </Radio>
            </Space>
          </Radio.Group>
        )}
      </div>

      <div className="p-6">
        <div className="text-primary text-[16px] font-bold">
          What is the maturity of your project?
        </div>
        <Spacer height="8px" />
        {!isEditing ? (
          <div className="text-subtitleText text-[16px]">
            {state?.maturityProjects ?? "-"}
          </div>
        ) : (
          <Radio.Group
            onChange={(e) =>
              setState({ ...state, maturityProjects: e.target.value })
            }
            value={state?.maturityProjects}
          >
            <Space direction="vertical">
              <Radio
                value={"Concept and initiation"}
                className={`${
                  state?.maturityProjects === "Concept and initiation"
                    ? "text-[16px] text-primary font-semibold"
                    : "text-[16px] text-subtitleText font-medium"
                } `}
              >
                Concept and initiation
                <br></br>
                <span className="text-[14px] text-subtitleText font-normal">
                  I&apos;m still defining the project idea and main concepts
                </span>
              </Radio>
              <Radio
                value={"Planning"}
                className={`${
                  state?.maturityProjects === "Planning"
                    ? "text-[16px] text-primary font-semibold"
                    : "text-[16px] text-subtitleText font-medium"
                } `}
              >
                Planning
                <br></br>
                <span className="text-[14px] text-subtitleText font-normal">
                  I&apos;m defining the project planning, scope and budget
                </span>
              </Radio>
              <Radio
                value={"Execution"}
                className={`${
                  state?.maturityProjects === "Execution"
                    ? "text-[16px] text-primary font-semibold"
                    : "text-[16px] text-subtitleText font-medium"
                } `}
              >
                Execution
                <br></br>
                <span className="text-[14px] text-subtitleText font-normal">
                  I&apos;m ready to start the execution of the project
                </span>
              </Radio>
              <Radio
                value={"Monitoring and update"}
                className={`${
                  state?.maturityProjects === "Monitoring and update"
                    ? "text-[16px] text-primary font-semibold"
                    : "text-[16px] text-subtitleText font-medium"
                } `}
              >
                Monitoring and update
                <br></br>
                <span className="text-[14px] text-subtitleText font-normal">
                  The project already started and I need extra ressources
                </span>
              </Radio>
            </Space>
          </Radio.Group>
        )}
      </div>

      <div className="p-6">
        <div className="text-primary text-[16px] font-bold">
          When should the project start?
        </div>
        <Spacer height="8px" />
        {!isEditing ? (
          <div className="text-subtitleText text-[16px]">
            {state?.whenProjectStart ?? "-"}
          </div>
        ) : (
          <Radio.Group
            onChange={(e) =>
              setState({ ...state, whenProjectStart: e.target.value })
            }
            value={state?.whenProjectStart}
            style={{ width: "100%" }}
          >
            <Space direction="vertical">
              {projectStartOptions.map((option) => (
                <Radio
                  key={option}
                  value={option}
                  className={`${
                    state?.whenProjectStart === option
                      ? "text-[16px] text-primary font-semibold"
                      : "text-[16px] text-subtitleText font-medium"
                  }`}
                >
                  {option}
                </Radio>
              ))}
              <Radio
                value={
                  isOtherstate?.whenProjectStart ? state?.whenProjectStart : ""
                }
                className={`${
                  isOtherstate?.whenProjectStart
                    ? "text-[16px] text-primary font-semibold"
                    : "text-[16px] text-subtitleText font-medium"
                }`}
              >
                <DefaultInput
                  placeholder="Others (Please Specify)"
                  onChange={(e) =>
                    setState({ ...state, whenProjectStart: e.target.value })
                  }
                  value={
                    isOtherstate?.whenProjectStart
                      ? state?.whenProjectStart
                      : ""
                  }
                />
              </Radio>
            </Space>
          </Radio.Group>
        )}
      </div>
      <div className="p-6">
        <div className="text-primary text-[16px] font-bold">
          When does your project need to be completed?
        </div>
        <Spacer height="8px" />
        {!isEditing ? (
          <div className="text-subtitleText text-[16px]">
            {state?.whenProjectComplete ?? "-"}
          </div>
        ) : (
          <Radio.Group
            onChange={(e) =>
              setState({ ...state, whenProjectComplete: e.target.value })
            }
            value={state?.whenProjectComplete}
            style={{ width: "100%" }}
          >
            <Space direction="vertical">
              {projectEndOptions.map((option) => (
                <Radio
                  key={option}
                  value={option}
                  className={`${
                    state?.whenProjectComplete === option
                      ? "text-[16px] text-primary font-semibold"
                      : "text-[16px] text-subtitleText font-medium"
                  }`}
                >
                  {option}
                </Radio>
              ))}
              <Radio
                value={
                  isOtherstate?.whenProjectComplete
                    ? state?.whenProjectComplete
                    : ""
                }
                className={`${
                  isOtherstate?.whenProjectComplete
                    ? "text-[16px] text-primary font-semibold"
                    : "text-[16px] text-subtitleText font-medium"
                }`}
              >
                <DefaultInput
                  placeholder="Others (Please Specify)"
                  onChange={(e) =>
                    setState({ ...state, whenProjectComplete: e.target.value })
                  }
                  value={
                    isOtherstate?.whenProjectComplete
                      ? state?.whenProjectComplete
                      : ""
                  }
                />
              </Radio>
            </Space>
          </Radio.Group>
        )}
      </div>

      <div className="p-6">
        <div className="text-primary text-[16px] font-bold">
          Does the budget cover the media costs
        </div>{" "}
        <Spacer height="8px" />
        {!isEditing ? (
          <div className="text-subtitleText text-[16px]">
            {state?.mediaCosts ?? "-"}
          </div>
        ) : (
          <Radio.Group
            onChange={(e) => setState({ ...state, mediaCosts: e.target.value })}
            value={state?.mediaCosts}
            style={{ width: "100%" }}
          >
            <Space direction="vertical">
              {mediaCostOptions.map((option) => (
                <Radio
                  key={option}
                  value={option}
                  className={`${
                    state?.mediaCosts === option
                      ? "text-[16px] text-primary font-semibold"
                      : "text-[16px] text-subtitleText font-medium"
                  }`}
                >
                  {option}
                </Radio>
              ))}
              <Radio
                value={isOtherstate?.mediaCosts ? state?.mediaCosts : ""}
                className={`${
                  isOtherstate?.mediaCosts
                    ? "text-[16px] text-primary font-semibold"
                    : "text-[16px] text-subtitleText font-medium"
                }`}
              >
                <DefaultInput
                  placeholder="Others (Please Specify)"
                  onChange={(e) =>
                    setState({ ...state, mediaCosts: e.target.value })
                  }
                  value={isOtherstate?.mediaCosts ? state?.mediaCosts : ""}
                />
              </Radio>
            </Space>
          </Radio.Group>
        )}
      </div>
      <div className="p-6">
        <div className="text-primary text-[16px] font-bold">
          What other info should we pass along?
        </div>{" "}
        <Spacer height="8px" />
        {!isEditing ? (
          <div className="text-subtitleText text-[16px]">
            {state?.description ?? "-"}
          </div>
        ) : (
          <TextBox
            rows={4}
            placeholder="Enter Info here......."
            onChange={(e) =>
              setState({ ...state, description: e.target.value })
            }
            value={state?.description}
          />
        )}
      </div>
      <div className="p-6">
        <div className="text-primary text-[16px] font-bold">
          Do you have any briefing or relevant documents to share?
        </div>
        <Spacer height="8px" />
        <div>
          {isEditing && (
            <Upload
              accept={".pdf, .doc, .docx, .png, .jpg, .gif"}
              listType="picture"
              fileList={fileInfoList}
              onChange={onChange}
              showUploadList={false}
              progress={{ strokeWidth: 2, showInfo: false }}
              className={`cursor-pointer flex justify-center items-center border border-solid border-gray-200 rounded-lg ${
                fileInfoList?.length < 5 ? "" : "opacity-45"
              }`}
              disabled={fileInfoList?.length < 5 ? false : true}
            >
              <div className="px-6 py-4 flex justify-center items-center flex-col">
                <div className="p-[10px] h-[40px] w-[40px] flex justify-center items-center rounded-full border-6 border-solid border-gray-50 bg-gray-100">
                  <Image
                    src="/images/upload-cloud.svg"
                    alt="logo"
                    height={20}
                    width={20}
                  />
                </div>
                <Spacer height="12px" />
                <p className="text-subtitleText font-normal text-[14px] m-0">
                  <strong className="text-primary">Click to upload</strong> or
                  drag and drop
                </p>
                <p className="text-subtitleText font-normal text-[12px] m-0">
                  PDF, DOC, PNG, JPG or GIF (Maximum upload size: 2MB (max. 5
                  files))
                </p>
              </div>
            </Upload>
          )}
          <Spacer height="12px" />

          {fileInfoList?.length > 0 &&
            fileInfoList?.map((item, index) => (
              <div
                key={index}
                className="flex flex-row gap-3 items-center border border-primary rounded-lg p-4 mb-3"
              >
                <div className="p-2 flex justify-center items-center rounded-full bg-white border-4 border-solid border-grayBorder">
                  <Image
                    src={"/images/upload-file-icon.svg"}
                    alt={item.name}
                    height={20}
                    width={20}
                  />
                </div>
                <div className="flex flex-col w-full">
                  <p
                    className="text-primary text-[14px] font-semibold mb-2"
                    title={item?.name}
                  >
                    {truncateString(item?.name)}
                  </p>

                  <p className="text-subtitleText text-[14px] font-normal m-0">
                    {(item.size / 1024).toFixed(2)} KB - {item?.percent}%
                    Uploaded
                  </p>
                </div>
                <div className="flex  gap-2">
                  {!isEditing && (
                    <div
                      className="p-[6px] flex justify-center items-center rounded-full bg-grayBorder cursor-pointer"
                      onClick={() => window.open(item?.url, "_blank")}
                    >
                      <Image
                        src={"/images/download-icon.svg"}
                        alt={item.name}
                        height={26}
                        width={26}
                      />
                    </div>
                  )}
                  <div className="p-[6px] flex justify-center items-center rounded-full bg-grayBorder cursor-pointer">
                    <Image
                      src={"/images/trash-2.svg"}
                      alt={item.name}
                      height={26}
                      width={26}
                      onClick={() => removeFile(item)}
                    />
                  </div>
                </div>
              </div>
            ))}

          {state?.document?.map((item, index) => {
            return (
              <div
                key={index}
                className="flex flex-row gap-3 items-center border border-primary rounded-lg p-4 mb-3"
              >
                <div className="p-2 flex justify-center items-center rounded-full bg-white border-4 border-solid border-grayBorder">
                  <Image
                    src={"/images/upload-file-icon.svg"}
                    alt={item.name}
                    height={20}
                    width={20}
                  />
                </div>
                <div className="flex flex-col w-full">
                  <p
                    className="text-primary text-[14px] font-semibold mb-2"
                    title={item?.name}
                  >
                    {truncateString(item?.name)}
                  </p>

                  <p className="text-subtitleText text-[14px] font-normal m-0">
                    {(item.size / 1024).toFixed(2)} KB
                  </p>
                </div>
                <div className="flex  gap-2">
                  {!isEditing && (
                    <div
                      className="p-[6px] flex justify-center items-center rounded-full bg-grayBorder cursor-pointer"
                      onClick={() => window.open(item?.url, "_blank")}
                    >
                      <Image
                        src={"/images/download-icon.svg"}
                        alt={item.name}
                        height={26}
                        width={26}
                      />
                    </div>
                  )}
                  {isEditing && (
                    <div className="p-[6px] flex justify-center items-center rounded-full bg-grayBorder cursor-pointer">
                      <Image
                        src={"/images/trash-2.svg"}
                        alt={item.name}
                        height={26}
                        width={26}
                        onClick={() => removeFileDocument(item)}
                      />
                    </div>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default Requirements;
