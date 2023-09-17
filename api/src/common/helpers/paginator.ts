export interface PaginatorResult<T> {
  data: T;
  meta: {
    total: number;
    lastPage: number;
    currentPage: number;
    perPage: number;
    prev: number | null;
    next: number | null;
  };
}

export type PaginatorOptions = {
  page?: number | string;
  perPage?: number | string;
};

export type PaginateFunction = <T, K>(
  model: any,
  args?: K,
  options?: PaginatorOptions,
) => Promise<PaginatorResult<T>>;

export interface ModelBase {
  findMany: (args: any) => Promise<any>;
  count: (args: any) => Promise<number>;
}

export type ModelBaseArgs<T extends ModelBase> = Parameters<T['findMany']>[0];
export type ModelPaginatorResult<T extends ModelBase> = PaginatorResult<
  Awaited<ReturnType<T['findMany']>>
>;
export type FindAllPaginatorArgs = { paginatorOptions: PaginatorOptions };

export const paginator = async <T extends ModelBase>({
  model,
  args = {},
  opts,
}: {
  model: T;
  args?: ModelBaseArgs<T>;
  opts?: PaginatorOptions;
}): Promise<PaginatorResult<T>> => {
  const page = Number(opts?.page) || 1;
  const perPage = Number(opts?.perPage) || 10;
  const skip = page > 0 ? perPage * (page - 1) : 0;
  const [total, data] = await Promise.all([
    model.count({ where: args.where }),
    model.findMany({
      ...args,
      take: perPage,
      skip,
    }),
  ]);
  const lastPage = Math.ceil(total / perPage);

  return {
    data,
    meta: {
      total,
      lastPage,
      currentPage: page,
      perPage,
      prev: page > 1 ? page - 1 : null,
      next: page < lastPage ? page + 1 : null,
    },
  };
};
