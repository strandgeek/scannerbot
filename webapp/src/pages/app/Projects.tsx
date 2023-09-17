import { FC } from "react";
import { AppLayout } from "../../layouts/AppLayout";
import { ProjectCard } from "../../components/ProjectCard";
import { PlusIcon } from "@heroicons/react/24/outline";
import { useQuery } from "@tanstack/react-query";
import { getProjects } from "../../client/queries/projects";
import { Link } from "react-router-dom";

export const AppProjectsPage: FC = () => {
  const { data: projectsData } = useQuery({
    queryKey: ["projects"],
    queryFn: () => getProjects(),
  });
  return (
    <AppLayout>
      <div className="flex justify-between mb-8">
        <h1 className="text-lg font-bold">Projects</h1>
        <div>
          <Link className="btn btn-ghost btn-sm" to="/app/projects/create">
            <PlusIcon className="h-4 w-4" />
            Create Project
          </Link>
        </div>
      </div>
      {projectsData?.data.map((project) => (
        <ProjectCard project={project} />
      ))}
    </AppLayout>
  );
};
