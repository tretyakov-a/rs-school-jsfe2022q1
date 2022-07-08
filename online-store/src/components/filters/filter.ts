import { Component, ComponentProps } from "@core/component";
import { Product } from "@components/products-list";
import { PropPicker } from "./filters-data";

export type FilterData = {
  name: string;
  title: string;
  propPicker: PropPicker;
  values?: Record<string, number>;
  min?: number;
  max?: number;
}

export function isFilter(component: Component): component is Filter {
  return component instanceof Filter;
}

export function isFilters(components: Component[]): components is Filter[] {
  return components.every(isFilter)
}

export class Filter extends Component {
  protected name: string;
  protected title: string;
  protected propPicker: PropPicker;

  constructor(data: FilterData, props: ComponentProps) {
    super(props);
    this.name = data.name;
    this.title = data.title;
    this.propPicker = data.propPicker;
  }

  public check(product?: Product): boolean {
    return product !== undefined && this.propPicker(product) !== undefined;
  }
}