export interface IPaginationResponse<T> {
  data: T[];
  pagination: {
    currentPage: number;
    pageSize: number;
    totalElements: number;
    totalPages: number;
  };
}
