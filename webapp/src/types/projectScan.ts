import { Project } from "./project";

export type ProjectScanOutputProviderImpact =
  | 'OPTIMIZATION'
  | 'INFORMATIONAL'
  | 'LOW'
  | 'MEDIUM'
  | 'HIGH';

export interface ProjectScanOutputProviderScanResultItem {
  file: {
    path: string;
    lines?: number[];
  } | null;
  description: string;
  impact: ProjectScanOutputProviderImpact;
}

export interface ProjectScanOutputProviderScanResult {
  items: ProjectScanOutputProviderScanResultItem[];
}

interface ProjectScanOutput {
  providers?: {
    name: string;
    result: ProjectScanOutputProviderScanResult;
  }[];
  insights: {
    file: {
      path: string;
    };
    content: string;
  }[];
}


export interface ProjectScanInputFile {
  path: string
  source: string
}

export interface ProjectScanInput {
  files: ProjectScanInputFile[]
}




export interface ProjectScan {
  id: string;
  createdAt: string;
  updatedAt: string;
  status: string;
  project?: Project;
  input?: ProjectScanInput;
  output?: ProjectScanOutput;
}