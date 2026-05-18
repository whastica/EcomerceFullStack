export interface PaginatedResponse<T> {
  content: T[];

  currentPage: number;

  totalPages: number;

  totalElements: number;

  size: number;

  first: boolean;

  last: boolean;

  empty: boolean;

  numberOfElements: number;
}