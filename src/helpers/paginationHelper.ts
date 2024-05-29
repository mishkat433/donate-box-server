import { SortOrder } from 'mongoose';

type IOptions = {
  page?: number;
  limit?: number;
  sortBy?: string;
  sortOrder?: SortOrder;

};

type IOptionsResult = {
  page: number;
  limit: number;
  skip: number;
  sortBy: string;
  sortOrder: SortOrder;
  nextPages: number | null;
  prevPage: number | null;
};



const calculatePagination = (options: IOptions, count: number): IOptionsResult => {
  const page = Number(options.page || 1);
  const limit = Number(options.limit || 10);
  const skip = (page - 1) * limit;

  const sortBy = options.sortBy || 'price' || 'createdAt';
  const sortOrder = options.sortOrder || 'desc';

  const prevPage = page - 1 > 0 ? page - 1 : null
  const nextPages = page + 1 <= Math.ceil(count / limit) ? page + 1 : null

  return {
    page,
    limit,
    skip,
    sortBy,
    sortOrder,
    nextPages,
    prevPage
  };
};

export const paginationHelper = { calculatePagination };
