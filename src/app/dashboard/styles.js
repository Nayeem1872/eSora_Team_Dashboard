import Colors from "@/utils/colors";

const styles = {
  justifyBetween: "flex justify-between",
  itemsCenter: "flex items-center",
  flexColumn: "flex flex-col",
  welcomeText: "headers text-headerText text-[32px] font-bold",
  welcomeSubtext: "text-subtitleText text-[16px] font-normal",

  buttonContainer: "grid grid-cols-3 gap-3 max-h-[50px]",

  dataContainer: "grid grid-cols-3 gap-[24px]",

  dataLeftSideContainer: "grid grid-cols-3 gap-[24px] my-8",
  leftSideBoxes:
    "px-6 py-5 border-2 border-grayBorderDashboard rounded-2xl shadow-sm flex flex-col gap-2",

  boxUpperText:
    "text-subtitleText text-[16px] font-normal whitespace-nowrap overflow-hidden text-ellipsis",
  boxLowerText:
    "headers text-headerText text-[32px] font-bold whitespace-nowrap overflow-hidden text-ellipsis",

  smallTitle: "headers text-[20px] mb-6",

  recentContainer: {
    display: "flex",
    justifyContent: "space-between",
    padding: "24px",
    borderRadius: "16px",
    border: `1px solid ${Colors.grayBorderDashboard}`,
    marginBottom: "16px",
    boxShadow:
      "0px 1px 2px 0px rgba(16, 24, 40, 0.06), 0px 1px 3px 0px rgba(16, 24, 40, 0.10)",
  },
  recentLeftSide: {
    display: "flex",
    flexDirection: "column",
    width: "75%",
  },
  recentRightSide: {
    display: "flex",
    flexDirection: "column",
    justifyContent: "space-between",
    alignItems: "flex-end",
    width: "25%",
  },
  recentTitle: "text-[16px] headers",
  recentDescription: "text-[14px] text-subtitleText font-normal mb-4",

  smallHeadings: "text-[12px] font-normal text-subtitleText mb-1 w-[90px]",
  assigneeName: "text-primary text-[14px] font-semibold",
  assigneeDesignation: "text-subtitleText text-[12px] font-normal",

  dueDateHeading: "text-[12px] font-normal text-subtitleText",
  dueDateValue: "text-[14px] font-semibold text-primary mr-1",

  recentCreatedDate: "text-right text-[14px] text-subtitleText font-normal",

  activityContainer: {
    maxHeight: "648px",
    overflow: "auto",
    borderRadius: "16px",
    border: `1px solid ${Colors.grayBorderDashboard}`,
    boxShadow:
      "0px 1px 2px 0px rgba(16, 24, 40, 0.06), 0px 1px 3px 0px rgba(16, 24, 40, 0.10)",
  },
  activityUpperText:
    "text-subtitleText text-[14px] font-normal overflow-hidden w-[70%]",
  activityDate: "text-subtitleText text-[14px] font-normal w-[30%] text-right",
  activityBottomText: "text-primary text-[16px] font-bold",
};
export default styles;
