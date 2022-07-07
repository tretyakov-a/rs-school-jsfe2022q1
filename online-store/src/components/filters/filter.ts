import { Component, ComponentProps } from "@core/component";
import { FILTER_NAME } from '@common/constants';
import { Product } from "@components/products-list";
import { PropPicker } from "./filters-data";

export type FilterData = {
  name: FILTER_NAME;
  title: string;
  propPicker: PropPicker;
  values?: Record<string, number>;
  min?: number;
  max?: number;
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
    return false;
  }
}