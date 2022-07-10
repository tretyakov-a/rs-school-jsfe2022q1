export const DEFAULT_FILTER_OPTION = 'all';

export const BASE_URL = 'https://raw.githubusercontent.com/tretyakov-a/online-store/main';

export enum EVENT {
  PRODUCTS_LOAD = 'onProductsLoad',
  PRODUCTS_LIST_UPDATE = 'onProductsListUpdate',
  FILTERS_CHANGE = 'onFiltersChange',
  ADD_TO_CART = 'onAddToCart',
  CHANGE_DISPLAY_OPTION = 'onChangeDisplayOption',
  CHANGE_SORT = 'onChangeSort',
}

export enum FILTER_NAME {
  PRICE = 'price',
  WEIGHT = 'weight',
  BRAND = 'brand',
  COLOR = 'color',
}

