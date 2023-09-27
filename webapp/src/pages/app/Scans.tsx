import { FC } from "react";
import { AppLayout } from "../../layouts/AppLayout";
import { useQuery } from "@tanstack/react-query";
import { getProjectScans } from "../../client/queries/projectScans";
import { ProjectScanCard } from "../../components/ProjectScanCard";

export interface ScansProps {}

export const Scans: FC<ScansProps> = (props) => {
  const { data: projectScansData } = useQuery({
    queryKey: ["project-scans"],
    queryFn: () => getProjectScans(),
    refetchInterval: 500,
  });
  return (
    <AppLayout>
      {projectScansData?.data.map((projectScan) => (
        <div className="mb-2">
          <ProjectScanCard projectScan={projectScan} />
        </div>
      ))}
    </AppLayout>
  );
};
