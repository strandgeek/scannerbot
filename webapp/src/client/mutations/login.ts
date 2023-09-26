import { api } from "../api";

export const login = async (loginDto: {
  username: string,
  password: string,
}): Promise<{ token: string }> => {
  const { data } = await api.post<{ token: string }>('/auth/login', loginDto);
  return data;
}