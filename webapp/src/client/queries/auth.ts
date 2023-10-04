import { Me } from "../../types/me";
import { api } from "../api";


export const getMe = async () => {
  const { data } = await api.get<Me>('/auth/me');
  return data;
}