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
                        {props.rows.map((row, idx) => {
                          return (
                            <div
                              className={classNames({
                                "bg-red-600/80": idx === 5,
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
              </div>
            );
          })}
        </div>
      )}
    </AppLayout>
  );
};
