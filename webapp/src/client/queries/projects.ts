import { Project } from "../../types/project";
import { api } from "../api";
import { paginator } from "./utils"

export const getProjects = () => paginator<Project>('/projects', {});

export const getProjectById = async (id: string) => {
  const { data } = await api.get<Project>(`/projects/${id}`);
  return data;
}

// TODO: Implement it after having the Scans in place
// eslint-disable-next-line @typescript-eslint/no-unused-vars
export const getProjectScansInfo = (_projectId: string): Promise<{
  total: number;
  lastScanId: string | null;
}> => Promise.resolve({ total: 0, lastScanId: 'change-it' });