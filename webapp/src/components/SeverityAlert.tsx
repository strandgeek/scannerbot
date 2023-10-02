import {
  BoltIcon,
  ExclamationCircleIcon,
  ExclamationTriangleIcon,
  InformationCircleIcon,
} from "@heroicons/react/24/outline";
import classNames from "classnames";
import { FC } from "react";

export interface SeverityAlertProps {
  type: "OPTIMIZATION" | "INFORMATIONAL" | "LOW" | "MEDIUM" | "HIGH";
  content: string;
}

const ALERT_TYPES = {
  OPTIMIZATION: {
    icon: <BoltIcon className="w-6 h-6" />,
    title: "Optimization",
    className: "text-blue-500 border border-blue-500",
  },

  INFORMATIONAL: {
    icon: <InformationCircleIcon className="w-6 h-6" />,
    title: "Info",
    className: "text-gray-500 border border-gray-500",
  },

  LOW: {
    icon: <InformationCircleIcon className="w-6 h-6" />,
    title: "Low Impact",
    className: "text-blue-500 border border-blue-500",
  },

  MEDIUM: {
    icon: <ExclamationTriangleIcon className="w-6 h-6" />,
    title: "Medium Impact",
    className: "text-yellow-500 border border-yellow-500",
  },

  HIGH: {
    icon: <ExclamationCircleIcon className="w-6 h-6" />,
    title: "High Impact",
    className: "text-red-500 border border-red-500",
  },
};

export const SeverityAlert: FC<SeverityAlertProps> = ({ type, content }) => {
  const alert = ALERT_TYPES[type];
  return (
    <div className={classNames("rounded-lg p-4 mb-4", alert.className)}>
      <div className="flex items-center">
        <div>{alert.icon}</div>
        <div className="font-bold ml-1">{alert.title}</div>
      </div>
      <div
        className="pl-7 pt-2"
        dangerouslySetInnerHTML={{
          __html: content.replace(/(?:\r\n|\r|\n)/g, "<br /><br />"),
        }}
      ></div>
    </div>
  );
};
