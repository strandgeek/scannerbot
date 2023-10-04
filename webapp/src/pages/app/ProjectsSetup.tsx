import React, { FC } from "react";
import { AppLayout } from "../../layouts/AppLayout";
import { useQuery } from "@tanstack/react-query";
import { Link, useParams } from "react-router-dom";
import { getProjectById } from "../../client/queries/projects";
import { LightBulbIcon } from "@heroicons/react/24/outline";

export interface AppProjectsSetupProps {}

const Step: FC<{
  number: number;
  title: string;
  children: React.ReactNode;
}> = ({ number, title, children }) => {
  return (
    <div className="pt-8">
      <div className="flex items-center">
        <div className="badge badge-primary mr-2">{number}</div>
        <div>
          <div className="font-semibold">{title}</div>
        </div>
      </div>
      <div className="mt-4 prose">{children}</div>
    </div>
  );
};

export const AppProjectsSetup: FC<AppProjectsSetupProps> = () => {
  const { projectId } = useParams();
  const { data } = useQuery({
    queryKey: ["projectById", projectId],
    queryFn: () => getProjectById(projectId!),
    enabled: !!projectId,
  });
  console.log(data);
  return (
    <AppLayout>
      <div className="border shadow rounded p-8 max-w-3xl mx-auto">
        <div className="border-b pb-8 flex">
          <div>
            <div className="text-base-content/70 mb-2">Setup Instructions</div>
            <h1 className="text-lg font-bold">Project: {data?.name}</h1>
          </div>
        </div>
        <Step number={1} title="Requirements">
          Make sure you have:
          <ul>
            <li>A Operating System MacOS, Linux or Windows</li>
            <li>NodeJS v18+</li>
          </ul>
        </Step>
        <Step number={2} title="Project Token">
          Keep in a safe place the project token which is used to trigger scans
          from ScannerBot CLI.
          <label className="block mt-4 font-semibold">Project Token:</label>
          <input
            value={data?.projectToken}
            className="input input-bordered bg-black text-white mt-4 w-full text-sm"
          />
        </Step>
        <Step number={3} title="Running your first scan">
          Scan your contracts in the project folder. The ScannerBOT CLI will
          lookup for all <code>.sol</code> files (recursively) from your current
          directory.
          <div className="bg-black text-white mt-4 w-full p-3 rounded-lg text-sm">
            npx @scannerbot/cli@latest --project-token{" "}
            <strong className="text-white">{data?.projectToken}</strong>
          </div>
          <div className="alert mt-2">
            <LightBulbIcon className="w-4 h-4 text-yellow-400" />
            <span className="text-sm">
              ScannerBOT CLI also looks for{" "}
              <code>SCANNERBOT_PROJECT_TOKEN</code> environment variable
            </span>
          </div>
        </Step>
        <Step
          number={4}
          title="View the scans results on the ScannerBOT Dashboard"
        >
          Once you have executed your first scan, you can view all scans on the
          ScannerBOT Dashboard:
          <div className="mt-4">
            TODO: Add a recent screenshot for scans lists here
          </div>
        </Step>
        <div>
          <Link className="btn btn-primary btn-block mt-8" to="/app/projects">
            Back to Projects
          </Link>
        </div>
      </div>
    </AppLayout>
  );
};
