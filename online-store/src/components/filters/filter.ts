import { Component, ComponentProps } from "@core/component";
import { Product } from "@components/app";
import { PropPicker } from "./filters-data";

export type FilterOptions = {
  name: string;
  title: string;
  propPicker: PropPicker;
}

export function isFilter(component: Component): component is Filter {
  return component instanceof Filter;
}

export function isFilters(components: Component[]): components is Filter[] {
  return components.every(isFilter)
}

export type FilterProps = ComponentProps & {
  componentOptions?: FilterOptions;
  data?: Product[];
}

export class Filter extends Component {
  protected name: string;
  protected title: string;
  protected propPicker: PropPicker;

  constructor(props: FilterProps) {
    const { componentOptions } = props;
    if (componentOptions === undefined) throw new TypeError();
    super(props);
    this.name = componentOptions.name;
    this.title = componentOptions.title;
    this.propPicker = componentOptions.propPicker;
  }

  public check(product?: Product): boolean {
    return product !== undefined && this.propPicker(product) !== undefined;
  }

  static getFilterData = (data: Product[]) => {
    return {};
  };
}