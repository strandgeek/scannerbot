import { FC } from "react";
import { AppLayout } from "../../layouts/AppLayout";
import { useQuery } from "@tanstack/react-query";
import { getProjectScans } from "../../client/queries/projectScans";
import { ProjectScanCard } from "../../components/ProjectScanCard";

export interface ScansProps {}

export const Scans: FC<ScansProps> = () => {
  const { data: projectScansData } = useQuery({
    queryKey: ["project-scans"],
    queryFn: () => getProjectScans(),
    refetchInterval: 500,
  });
  return (
    <AppLayout>
      <div className="flex justify-between mb-8">
        <h1 className="text-lg font-bold">Scans</h1>
      </div>
      {projectScansData?.data.length === 0 && (
        <div className="border-dashed border-2 border-gray-300 rounded text-center p-24 text-gray-500">
          <div>No scan triggered yet</div>
          <div className="mt-4">
            Your ScannerBot scans will appear here once you trigger the CLI
          </div>
        </div>
      )}
      {projectScansData?.data.map((projectScan) => (
        <div className="mb-2">
          <ProjectScanCard projectScan={projectScan} />
        </div>
      ))}
    </AppLayout>
  );
};
