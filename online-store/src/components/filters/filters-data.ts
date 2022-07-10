import { FILTER_NAME } from "@common/constants";
import { Product } from "@components/app";
import { CheckboxFilter } from "./checkbox-filter";
import { Filter } from "./filter";
import { RangeFilter } from "./range-filter";

export type PropPicker = (product: Product) => string | number | undefined;

export type FilterConfig = {
  component: typeof Filter;
  propPicker: PropPicker;
  title: string;
}

export const filtersData: Record<FILTER_NAME, FilterConfig> = {
  [FILTER_NAME.BRAND]: {
    title: 'Бренд',
    component: CheckboxFilter,
    propPicker: (item) => item.brand,
  },

  [FILTER_NAME.COLOR]: {
    title: 'Цвет',
    component: CheckboxFilter,
    propPicker: (item) => item.props.classification?.specs.color?.value,
  },

  [FILTER_NAME.PRICE]: {
    title: 'Цена (₽)',
    component: RangeFilter,
    propPicker: (item) => item.price,
  },

  [FILTER_NAME.WEIGHT]: {
    title: 'Полетная масса (гр.)',
    component: RangeFilter,
    propPicker: (item) => Number.parseInt(item.props.dimensions?.specs.weight?.value || ''),
  },
}
