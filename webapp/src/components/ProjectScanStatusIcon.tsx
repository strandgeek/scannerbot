import { CheckCircleIcon, XCircleIcon } from "@heroicons/react/24/solid";
import React, { FC } from "react";

export interface ProjectScanStatusIconProps {
  status: string;
}

export const ProjectScanStatusIcon: FC<ProjectScanStatusIconProps> = ({
  status,
}) => {
  switch (status) {
    case "COMPLETED":
      return <CheckCircleIcon className="text-green-500 w-6 h-6" />;
    case "ERROR":
      return <XCircleIcon className="text-red-500 w-6 h-6" />;
    default:
      return <span className="loading loading-spinner loading-xs"></span>;
  }
};
