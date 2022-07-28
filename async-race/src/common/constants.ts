
export const BASE_URL = 'http://localhost:3000';

export enum EVENT {
  LOAD_APP = 'onProductsLoad',
  UPDATE_PRODUCTS_LIST = 'onProductsListUpdate',
  CHANGE_FILTERS = 'onFiltersChange',
  CHANGE_FILTER = 'onFilterChange',
  CHANGE_FILTER_APPEARANCE = 'onFilterAppearanceChange',
  UPDATE_FILTERS_PRODUCT_NUMBERS = 'onUpdateFilters',
  RESET_FILTER = 'onResetFilter',
  TRY_ADD_TO_CART = 'onTryAddToCart',
  TRY_DELETE_FROM_CART = 'onTryDeleteFromCart',
  ADD_TO_CART = 'onAddToCart',
  CHANGE_DISPLAY_OPTION = 'onChangeDisplayOption',
  CHANGE_SORT = 'onChangeSort',
  SHOW_ALERT = 'onShowAlert',
  RESET_FILTERS = 'onResetFilters',
  RESET_SETTINGS = 'onResetSettings',
  TOGGLE_MAIN_LEFT = 'onShowMainLeft',
  CHANGE_PAGE = 'onChangePage',
}
