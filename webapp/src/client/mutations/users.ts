import { api } from "../api";

export const createUser = async (createUserDto: {
  firstName: string,
  lastName: string,
  email: string;
  password: string,
}): Promise<{ token: string }> => {
  const { data } = await api.post<{ token: string }>('/users', createUserDto);
  return data;
}
