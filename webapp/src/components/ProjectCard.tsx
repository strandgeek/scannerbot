import { DocumentMagnifyingGlassIcon } from "@heroicons/react/24/outline";
import { Cog6ToothIcon } from "@heroicons/react/24/solid";
import { FC } from "react";
import { Link } from "react-router-dom";
import { Project } from "../types/project";
import { useQuery } from "@tanstack/react-query";
import { getProjectScansInfo } from "../client/queries/projects";

export interface ProjectCardProps {
  project: Project;
}

export const ProjectCard: FC<ProjectCardProps> = ({ project }) => {
  const { data: info } = useQuery({
    queryKey: ["project-scans-info", project.id],
    queryFn: () => getProjectScansInfo(project.id),
  });
  return (
    <div className="border rounded shadow-sm">
      <div className="p-4 flex justify-between items-center">
        <div className="font-semibold">{project.name}</div>
        <button className="btn btn-square btn-ghost btn-sm">
          <Cog6ToothIcon className="w-5 h-5 text-base-content/50" />
        </button>
      </div>
      <div className="p-4 border-t">
        <div className="w-full flex">
          <Link
            className="flex items-center text-blue-500"
            to={`/app/scans?projectId=${project.id}`}
          >
            <DocumentMagnifyingGlassIcon className="w-4 h-4" />
            <div className="text-sm ml-1">{info?.total}</div>
          </Link>
          <div className="text-base-content/50 ml-2 mr-2">•</div>
          <Link
            className="flex items-center text-blue-500"
            to={`/app/scans/${info?.lastScanId || ""}`}
          >
            <div className="text-sm">View Last Scan</div>
          </Link>
        </div>
      </div>
    </div>
  );
};
