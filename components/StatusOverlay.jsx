import { Loader2 } from "lucide-react";

const StatusOverlay = ({ type }) => {
  return (
    <div className={`status-overlay ${type}-overlay`}>
      <Loader2 className="status-icon" />
      <span>
        {type === "development"
          ? "More content coming soon"
          : "Draft post - may contain errors"}
      </span>
    </div>
  );
};

export default StatusOverlay;
