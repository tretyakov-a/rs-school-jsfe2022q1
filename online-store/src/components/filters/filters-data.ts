import { FILTER_NAME } from "@common/constants";
import { PROP, PropPicker, propPickers } from "@common/product";
import { CheckboxFilter } from "./checkbox-filter";
import { Filter } from "./filter";
import { RangeFilter } from "./range-filter";

export type FilterConfig = [
  string,
  typeof Filter,
  PropPicker,
]

export const filtersData: Record<FILTER_NAME, FilterConfig> = {
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
