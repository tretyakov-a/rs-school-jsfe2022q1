import { FILTER_NAME } from "@common/constants";
import { PROP, PropPicker, propPickers } from "@common/product";
import { CheckboxFilter } from "./checkbox-filter";
import { Filter } from "./filter";
import { RangeFilter } from "./range-filter";
import { SwitchFilter } from './switch-filter';
import { SearchFilter } from './search-filter';

export type FilterConfig = [
  string,
  typeof Filter,
  PropPicker,
  boolean?,
]

export const filtersData: Record<FILTER_NAME, FilterConfig> = {
  [FILTER_NAME.SEARCH]: [
    'Поиск по названию', 
    SearchFilter, 
    propPickers[PROP.TITLE],
    false,
  ],
  [FILTER_NAME.CAMERA_INCLUDED]: [
    'Наличие камеры в комплекте', 
    SwitchFilter, 
    propPickers[PROP.CAMERA_INCLUDED],
    false,
  ],
  [FILTER_NAME.MOBILE_CONTROL]: [
    'Управление со смартфона', 
    SwitchFilter, 
    propPickers[PROP.MOBILE_CONTROL],
    false,
  ],
  [FILTER_NAME.BRAND]: [
    'Бренд', 
    CheckboxFilter, 
    propPickers[PROP.BRAND]
  ],
  [FILTER_NAME.COLOR]: [
    'Цвет', 
    CheckboxFilter, 
    propPickers[PROP.COLOR]
  ],
  [FILTER_NAME.PRICE]: [
    'Цена (₽)', 
    RangeFilter, 
    propPickers[PROP.PRICE]
  ],
  [FILTER_NAME.WEIGHT]: [
    'Полетная масса (гр.)', 
    RangeFilter, 
    propPickers[PROP.WEIGHT]
  ],
}
