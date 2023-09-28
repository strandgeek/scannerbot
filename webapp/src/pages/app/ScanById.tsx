/* eslint-disable @typescript-eslint/no-unsafe-call */
import { FC, useMemo } from "react";
import { AppLayout } from "../../layouts/AppLayout";
import { ProjectScanStatusIcon } from "../../components/ProjectScanStatusIcon";
import { useQuery } from "@tanstack/react-query";
import { useParams } from "react-router-dom";
import { getProjectScanById } from "../../client/queries/projectScans";
import { ProjectScanStats } from "../../components/ProjectScanStats";
import SyntaxHighlighter from "react-syntax-highlighter";
import { a11yDark } from "react-syntax-highlighter/dist/esm/styles/hljs";
import { createElement } from "react-syntax-highlighter";
import classNames from "classnames";
import {
  ProjectScanOutputProviderImpact,
  ProjectScanOutputProviderScanResultItem,
} from "../../types/projectScan";
import { ExclamationCircleIcon, XCircleIcon } from "@heroicons/react/24/solid";

export interface ScanByIdProps {}

export const ScanById: FC<ScanByIdProps> = (props) => {
  const { scanId } = useParams();
  const { data: projectScan } = useQuery({
    queryKey: ["projectScanById", scanId],
    queryFn: () => getProjectScanById(scanId || ""),
  });
  const totalFiles = useMemo(() => {
    return projectScan?.input?.files?.length || 0;
  }, [projectScan]);
  const fileItems = useMemo(() => {
    const map: {
      [filename: string]: ProjectScanOutputProviderScanResultItem[];
    } = {};
    if (!projectScan || !projectScan.output?.providers) {
      return map;
    }
    const { providers } = projectScan.output;
    providers.forEach((provider) => {
      provider.result.items.forEach((item) => {
        if (item.file) {
          const path = (item.file.path || "").replace("files/", "");
          if (!map[path]) {
            map[path] = [];
          }
          map[path].push(item);
        }
      });
    });
    return map;
  }, [projectScan]);
  const fileLineImpact = useMemo(() => {
    const map: {
      [filename: string]: { [line: number]: ProjectScanOutputProviderImpact };
    } = {};
    if (!projectScan || !projectScan.output?.providers) {
      return map;
    }
    const { providers } = projectScan.output;
    ["OPTIMIZATION", "INFORMATIONAL", "LOW", "MEDIUM", "HIGH"].forEach(
      (impact) => {
        providers.forEach((provider) => {
          provider.result.items
            .filter((item) => item.impact === impact && item.file)
            .forEach((item) => {
              item.file?.lines?.forEach((line) => {
                const path = (item.file!.path || "").replace("files/", "");
                if (!map[path]) {
                  map[path] = {};
                }
                map[path][line] = impact as ProjectScanOutputProviderImpact;
              });
            });
        });
      }
    );
    return map;
  }, [projectScan]);
  if (!projectScan) {
    return;
  }
  console.log(fileLineImpact);
  return (
    <AppLayout container={false}>
      <div className="border rounded shadow-sm bg-white hover:bg-slate-50 hover:cursor-pointer">
        <div className="flex justify-between p-4">
          <div className="flex items-center">
            <div className="mr-4">
              <ProjectScanStatusIcon status={projectScan.status} />
            </div>
            <div>
              <h1 className="text-xl">{projectScan.project?.name}</h1>
              <div className="text-base-content/50 text-sm">
                {new Date(projectScan.createdAt).toLocaleString()}
              </div>
            </div>
          </div>
          <ProjectScanStats projectScan={projectScan} />
        </div>
      </div>
      {["SCHEDULED", "RUNNING"].includes(projectScan.status) && (
        <div className="m-4 p-20 bg-white border rounded text-center">
          <div>
            <span className="loading loading-spinner loading-xl"></span>
            <div className="mt-2 text-base-content/50">
              Scanning {totalFiles} file{totalFiles > 1 ? "s" : ""}...
            </div>
          </div>
        </div>
      )}
      {projectScan.status === "COMPLETED" && (
        <div>
          {(projectScan.input?.files || []).map((file) => {
            return (
              <div className="m-4 bg-white border rounded overflow-hidden">
                <div className="p-4">{file.path}</div>
                <div className="p-4 border">
                  <SyntaxHighlighter
                    language="solidity"
                    style={a11yDark}
                    showLineNumbers
                    wrapLines={true}
                    renderer={(props) => (
                      <div>
                        {props.rows.map((row, idx: number) => {
                          const impact =
                            fileLineImpact && fileLineImpact[file.path]
                              ? fileLineImpact[file.path][idx + 1]
                              : null;
                          return (
                            <div
                              className={classNames({
                                "bg-red-600/40": impact === "HIGH",
                                "bg-yellow-600/40": impact === "MEDIUM",
                                "bg-gray-600/40": [
                                  "LOW",
                                  "OPTIMIZATION",
                                  "INFORMATIONAL",
                                ].includes(impact || ""),
                              })}
                            >
                              {createElement({
                                key: idx,
                                node: row,
                                stylesheet: props.stylesheet,
                                useInlineStyles: props.useInlineStyles,
                              })}
                            </div>
                          );
                        })}
                      </div>
                    )}
                  >
                    {file.source}
                  </SyntaxHighlighter>
                </div>
                <div className="p-8">
                  {fileItems &&
                    fileItems[file.path] &&
                    fileItems[file.path].map((item) => {
                      return (
                        <div className="text-red-500 border border-red-500 rounded-lg p-4 mb-4">
                          <div className="flex">
                            <ExclamationCircleIcon className="w-6 h-6" />
                            <div className="font-bold ml-1">High Impact</div>
                          </div>
                          <div
                            className="pl-7 pt-2"
                            dangerouslySetInnerHTML={{
                              __html: item.description.replace(
                                /(?:\r\n|\r|\n)/g,
                                "<br /><br />"
                              ),
                            }}
                          ></div>
                        </div>
                      );
                    })}
                </div>
              </div>
            );
          })}
        </div>
      )}
    </AppLayout>
  );
};
