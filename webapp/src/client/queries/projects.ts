import { Project } from "../../types/project";
import { paginator } from "./utils"

export const getProjects = () => paginator<Project>('/projects', {});

// TODO: Implement it after having the Scans in place
export const getProjectScansInfo = (projectId: string): Promise<{
  total: number;
  lastScanId: string | null;
}> => Promise.resolve({ total: 0, lastScanId: 'change-it' });