export const DEFAULT_FILTER_OPTION = 'all';

export const BASE_URL = 'https://raw.githubusercontent.com/tretyakov-a/online-store/main';

export enum EVENT {
  LOAD_APP = 'onProductsLoad',
  UPDATE_PRODUCTS_LIST = 'onProductsListUpdate',
  CHANGE_FILTERS = 'onFiltersChange',
  CHANGE_FILTER = 'onFilterChange',
  CHANGE_FILTER_APPEARANCE = 'onFilterAppearanceChange',
  RESET_FILTER = 'onResetFilter',
  TRY_ADD_TO_CART = 'onTryAddToCart',
  ADD_TO_CART = 'onAddToCart',
  CHANGE_DISPLAY_OPTION = 'onChangeDisplayOption',
  CHANGE_SORT = 'onChangeSort',
  SHOW_ALERT = 'onShowAlert',
  RESET_FILTERS = 'onResetFilters',
  RESET_SETTINGS = 'onResetSettings',
}

export enum FILTER_NAME {
  PRICE = 'price',
  WEIGHT = 'weight',
  BRAND = 'brand',
  COLOR = 'color',
  MOBILE_CONTROL = 'mobileControl',
  CAMERA_INCLUDED = 'cameraIncluded',
  SEARCH = 'search',
  YEAR = 'year',
  SIZE = 'size',
}

export enum DISPLAY_OPTION {
  LIST = 'list',
  GRID = 'grid',
};

export const DISPLAY_OPTION_DEFAULT = DISPLAY_OPTION.GRID;
export const CART_PRODUCTS_LIMIT = 3;

export const COLORS = {
  '#00ba71': 'зеленый',
  '#00c2de': 'синий',
  'white': 'белый',
  'black': 'черный',
  '#fad717': 'желтый',
  'violet': 'фиолетовый',
  '#f43545': 'красный',
  '#ff8901': 'оранжевый',
  'gray': 'серый',
};
