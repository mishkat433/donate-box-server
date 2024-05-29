"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.paginationHelper = void 0;
const calculatePagination = (options, count) => {
    const page = Number(options.page || 1);
    const limit = Number(options.limit || 10);
    const skip = (page - 1) * limit;
    const sortBy = options.sortBy || 'price' || 'createdAt';
    const sortOrder = options.sortOrder || 'desc';
    const prevPage = page - 1 > 0 ? page - 1 : null;
    const nextPages = page + 1 <= Math.ceil(count / limit) ? page + 1 : null;
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
exports.paginationHelper = { calculatePagination };
