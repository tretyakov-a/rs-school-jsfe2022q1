import { Component, ComponentHandler, ComponentHandlers } from "@core/component";
import { FiltersListView } from "@views/filters-list";
import { Product } from "../products-list";
import json from '@assets/data-sample.json';
import { FILTER_NAME } from "@common/constants";
import { filtersData } from './filters-data';

export class FiltersList extends Component {

  constructor(handlers: ComponentHandlers = {}) {
    super({
      handlers,
      view: new FiltersListView(),
    });

    this.onLoadingStart();
    setTimeout(() => {
      this.onLoadingEnd();
      this.update(json as Product[])
    }, 500);
  }

  private handleFiltersChange = (): void => {
    this.handlers?.onFiltersChange(this.components.filters);
  }

  public update(data: Product[]): void {
    const filtersKeys = Object.keys(filtersData) as FILTER_NAME[];
    this.components.filters = filtersKeys.map((key) => {
      const { component, propPicker, title } = filtersData[key];
      return new component(
        {
          propPicker,
          ...component.getFilterData(propPicker)(data),
          name: key,
          title,
        },
        {
          onFilterChange: this.handleFiltersChange as ComponentHandler,
        }
      );
    })
  }
}