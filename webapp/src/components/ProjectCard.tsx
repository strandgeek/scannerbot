import {
  CodeBracketIcon,
  DocumentMagnifyingGlassIcon,
  EllipsisVerticalIcon,
} from "@heroicons/react/24/outline";
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
    <div className="border rounded shadow-sm bg-white">
      <div className="p-4 flex justify-between items-center">
        <div className="font-semibold">{project.name}</div>
        <div className="dropdown dropdown-bottom dropdown-end">
          <label tabIndex={0} className="btn btn-square btn-ghost btn-sm">
            <EllipsisVerticalIcon className="w-5 h-5 text-base-content/50" />
          </label>
          <ul
            tabIndex={0}
            className="dropdown-content z-[1] menu p-2 shadow bg-base-100 rounded-box w-52"
          >
            <li>
              <Link to={`/app/projects/${project.id}/setup`}>
                <CodeBracketIcon className="h-4 w-4" /> Setup Instructions
              </Link>
            </li>
          </ul>
        </div>
      </div>
      <div className="p-4 border-t">
        <div className="w-full flex text-base-content/50">
          TRON solc version: {project.solcVersion}
        </div>
      </div>
    </div>
  );
};
