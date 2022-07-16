import { Component, ComponentProps } from "@core/component";
import { Product, PropPicker } from "@common/product";
import { FILTER_NAME } from '@common/constants';
import { filtersData } from '@components/filters/filters-data';

export type FilterViewOptions = {
  name: FILTER_NAME;
  title: string;
  products: Product[];
  state: unknown;
  filterStyle: string;
}

export type FilterTagInfo = {
  name: string,
  title: string,
  isSmthToPrint: boolean;
  info: string;
}

export function isFilter(component: Component): component is Filter {
  return component instanceof Filter;
}

export function isFilters(components: (Component[] | Component)[]): components is Filter[] {
  return components.every((item) => !Array.isArray(item) && isFilter(item))
}

export type FilterProps = ComponentProps & {
  data?: FilterViewOptions;
}

export class Filter extends Component {
  protected name: string;
  protected title: string;
  protected propPicker: PropPicker;
  protected style: string;

  constructor(props: FilterProps) {
    const { data } = props;
    if (data === undefined) throw new TypeError();
    super(props);
    this.name = data.name;
    this.title = data.title;
    this.propPicker = filtersData[data.name][2];
    this.style = data.filterStyle || '';
  }

  public check(product?: Product): boolean {
    return product !== undefined && this.propPicker(product) !== undefined;
  }

  public getName(): string {
    return this.name;
  }

  public getState(): unknown {
    return {};
  }

  public reset(): void {
    return;
  }

  public getTag(): FilterTagInfo {
    const { name, title } = this;
    return {
      name, title,
      isSmthToPrint: false,
      info: '',
    };
  }

  protected getFilterData = (data: Product[]): unknown => {
    return {};
  };

}