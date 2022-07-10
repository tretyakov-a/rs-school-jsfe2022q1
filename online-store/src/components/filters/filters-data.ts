import { FILTER_NAME } from "@common/constants";
import { Product } from "@components/app";
import { CheckboxFilter } from "./checkbox-filter";
import { Filter } from "./filter";
import { RangeFilter } from "./range-filter";

export type PropPicker = (product: Product) => string | number | undefined;

export type FilterConfig = [
  string,
  typeof Filter,
  PropPicker,
]

export const filtersData: Record<FILTER_NAME, FilterConfig> = {
  [FILTER_NAME.BRAND]: [
    'Бренд', 
    CheckboxFilter, 
    (item) => item.brand
  ],
  [FILTER_NAME.COLOR]: [
    'Цвет', 
    CheckboxFilter, 
    (item) => item.props.classification?.specs.color?.value
  ],
  [FILTER_NAME.PRICE]: [
    'Цена (₽)', 
    RangeFilter, 
    (item) => item.price
  ],
  [FILTER_NAME.WEIGHT]: [
    'Полетная масса (гр.)', 
    RangeFilter, 
    (item) => Number.parseInt(item.props.dimensions?.specs.weight?.value || '')
  ],
}
