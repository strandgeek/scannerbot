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
import Markdown from "react-markdown";
import classNames from "classnames";
import {
  ProjectScanOutputProviderImpact,
  ProjectScanOutputProviderScanResultItem,
} from "../../types/projectScan";
import { SeverityAlert } from "../../components/SeverityAlert";
import InsightIcon from "../../assets/scannerbot-icon.png";

export interface ScanByIdProps {}

export const ScanById: FC<ScanByIdProps> = () => {
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
  const fileInsights = useMemo(() => {
    const map: {
      [filename: string]: string;
    } = {};
    if (!projectScan || !projectScan.output?.insights) {
      return map;
    }
    projectScan.output.insights.forEach((insight) => {
      map[insight.file.path] = insight.content;
    });
    return map;
  }, [projectScan]);
  if (!projectScan) {
    return;
  }
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
      {projectScan.status === "ERROR" && projectScan?.output?.error && (
        <div className="m-4 p-8 bg-white border rounded ">
          <div className="text-red-500 text-lg mb-2">
            Code could not be scanned due to compilation error:
          </div>
          <SyntaxHighlighter style={a11yDark}>
            {projectScan.output.error}
          </SyntaxHighlighter>
        </div>
      )}
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
                <div className="p-4 font-semibold bg-white">{file.path}</div>
                <div className="p-4 border bg-gray-50/2">
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
                        <SeverityAlert
                          type={item.impact}
                          content={item.description}
                        />
                      );
                    })}
                  {fileInsights[file.path] && (
                    <div className="rounded-lg p-4 mb-4 border border-primary">
                      <div className="flex items-center">
                        <img className="w-6 h-6 mr-2" src={InsightIcon} />
                        <div className="font-bold text-primary">
                          AI Insights
                        </div>
                      </div>
                      <div className="pl-7 pt-2 w-full max-w-full prose prose-h1:text-lg prose-h2:text-base prose-h3:text-base prose-h4:text-sm">
                        <Markdown>{fileInsights[file.path]}</Markdown>
                      </div>
                    </div>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      )}
    </AppLayout>
  );
};
