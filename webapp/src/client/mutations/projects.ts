import { Project } from "../../types/project";
import { api } from "../api"

export const createProject = async ({ name, solcVersion }: { name: string, solcVersion: string }) => {
  const { data } = await api.post<Project>('/projects', {
    name,
    solcVersion,
  });
  return data;
}