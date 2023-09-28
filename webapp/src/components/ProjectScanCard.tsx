import { FC } from "react";
import { ProjectScan } from "../types/projectScan";
import { ProjectScanStatusIcon } from "./ProjectScanStatusIcon";
import { ProjectScanStats } from "./ProjectScanStats";

export interface ProjectScanCardProps {
  projectScan: ProjectScan;
}

export const ProjectScanCard: FC<ProjectScanCardProps> = ({ projectScan }) => {
  return (
    <div className="border rounded shadow-sm bg-white hover:bg-slate-50 hover:cursor-pointer">
      <div className="flex justify-between p-4">
        <div className="flex items-center">
          <div className="mr-4">
            <ProjectScanStatusIcon status={projectScan.status} />
          </div>
          <div>
            <div>{projectScan.project?.name}</div>
            <div className="text-base-content/50 text-sm">
              {new Date(projectScan.createdAt).toLocaleString()}
            </div>
          </div>
        </div>
        <ProjectScanStats projectScan={projectScan} />
      </div>
    </div>
  );
};
