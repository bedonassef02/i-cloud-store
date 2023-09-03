export interface PaginationInfo{
    currentPage: number;
    nextPage?: number;
    prevPage?: number;

    endIndex: number;
    limit: number;
    pagesCount: number;
}