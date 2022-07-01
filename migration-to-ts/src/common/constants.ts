export enum HttpCodes {
  UNAUTHORIZED = 401,
  NOT_FOUND = 404,
}

export enum FILTER_NAME {
  CATEGORY = 'category',
  COUNTRY = 'country',
  LANGUAGE = 'language',
  SEARCH = 'search',
}

export const DEFAULT_FILTER_OPTION = 'all';
export const DEFAULT_ITEMS_PER_PAGE = 5;
export const FIRST_PAGE = 0;
export const MAX_TOTAL_RESULTS = 100;