import { Project } from "../../types/project";
import { api } from "../api"

export const createProject = async ({ name }: { name: string }) => {
  const { data } = await api.post<Project>('/projects', {
    name,
  });
  return data;
}