import { api } from "../api"

export interface PaginatorResult<T> {
  data: T[];
  meta: {
    total: number;
    lastPage: number;
    currentPage: number;
    perPage: number;
    prev: number | null;
    next: number | null;
  };
}

export const paginator = async <TResultItem, TParams = object>(path: string, params: TParams): Promise<PaginatorResult<TResultItem>> => {
  const { data } = await api.get<PaginatorResult<TResultItem>>(path, {
    params,
  });
  return data;
}