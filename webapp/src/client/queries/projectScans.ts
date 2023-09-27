import { ProjectScan } from "../../types/projectScan";
import { api } from "../api";
import { paginator } from "./utils"

export const getProjectScans = () => paginator<ProjectScan>('/scans', {});

export const getProjectScanById = async (id: string) => {
  const { data } = await api.get<ProjectScan>(`/scans/${id}`);
  return data;
}