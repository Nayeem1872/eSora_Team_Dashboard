import Colors from "../../utils/colors";
const styles = {
  container: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    padding: "6px 12px",
    borderRadius: "16px",
    fontSize: "14px",
    fontWeight: "600",
  },
  statusHigh: {
    color: Colors.statusHighText,
    background: Colors.high,
  },
  statusMedium: {
    color: Colors.statusMediumText,
    background: Colors.medium,
  },
  statusLow: {
    color: Colors.statusLowText,
    background: Colors.low,
  },
  statusCompleted: {
    color: Colors.successText,
    background: Colors.success,
  },
  statusOverdue: {
    color: Colors.overdueText,
    background: Colors.overdue,
  },
  statusInProgress: {
    color: Colors.inProgressText,
    background: Colors.inProgress,
  },
  general: {
    color: Colors.subtitleText,
    background: Colors.greyStatus,
  },
};

export default styles;
