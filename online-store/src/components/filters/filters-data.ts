import { FILTER_NAME } from "@common/constants";
import { PROP, PropPicker, propPickers } from "@common/product";
import { CheckboxFilter } from "./checkbox-filter";
import { Filter } from "./filter";
import { RangeFilter } from "./range-filter";
import { SwitchFilter } from './switch-filter';
import { SearchFilter } from './search-filter';

type FilterStyle = [
  boolean?, // isExpandable
  string?,
]

export type FilterConfig = [
  string,
  typeof Filter,
  PropPicker,
  FilterStyle?,
]

export const filtersData: Record<FILTER_NAME, FilterConfig> = {
  [FILTER_NAME.SEARCH]: [
    'Поиск по названию', 
    SearchFilter, 
    propPickers[PROP.TITLE],
    [false],
  ],
  [FILTER_NAME.CAMERA_INCLUDED]: [
    'Наличие камеры в комплекте', 
    SwitchFilter, 
    propPickers[PROP.CAMERA_INCLUDED],
    [false],
  ],
  [FILTER_NAME.MOBILE_CONTROL]: [
    'Управление со смартфона', 
    SwitchFilter, 
    propPickers[PROP.MOBILE_CONTROL],
    [false],
  ],
  [FILTER_NAME.BRAND]: [
    'Бренд', 
    CheckboxFilter, 
    propPickers[PROP.BRAND]
  ],
  [FILTER_NAME.COLOR]: [
    'Цвет', 
    CheckboxFilter, 
    propPickers[PROP.COLOR],
    [true, 'color-pick']
  ],
  [FILTER_NAME.SIZE]: [
    'Размер', 
    CheckboxFilter, 
    propPickers[PROP.SIZE]
  ],
  [FILTER_NAME.YEAR]: [
    'Год выпуска', 
    RangeFilter, 
    propPickers[PROP.YEAR]
  ],
  [FILTER_NAME.PRICE]: [
    'Цена (₽)', 
    RangeFilter, 
    propPickers[PROP.PRICE]
  ],
  [FILTER_NAME.WEIGHT]: [
    'Полетная масса (ПМ) (гр.)', 
    RangeFilter, 
    propPickers[PROP.WEIGHT]
  ],
}
