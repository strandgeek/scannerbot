import { FC } from "react";
import { ProjectScan } from "../types/projectScan";
import { useProjectScanStats } from "../hooks/useProjectScanStats";
import {
  InformationCircleIcon,
  ExclamationTriangleIcon,
  ExclamationCircleIcon,
} from "@heroicons/react/20/solid";

export interface ProjectScanStatsProps {
  projectScan?: ProjectScan;
}

export const ProjectScanStats: FC<ProjectScanStatsProps> = ({
  projectScan,
}) => {
  const stats = useProjectScanStats(projectScan);
  return (
    <div className="flex items-center">
      <div className="flex items-center justify-center text-gray-300 w-20">
        <InformationCircleIcon className="w-5 h-5 mr-1" />
        <div>{stats.low !== null ? stats.low : "-"}</div>
      </div>
      <div className="flex items-center justify-center text-yellow-300 w-20">
        <ExclamationTriangleIcon className="w-5 h-5 mr-1" />
        <div>{stats.medium !== null ? stats.medium : "-"}</div>
      </div>
      <div className="flex items-center justify-center text-red-300 w-20">
        <ExclamationCircleIcon className="w-5 h-5 mr-1" />
        <div>{stats.high !== null ? stats.high : "-"}</div>
      </div>
    </div>
  );
};
