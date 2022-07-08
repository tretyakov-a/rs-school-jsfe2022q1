import { Component, ComponentHandlers } from "@core/component";
import { FiltersListView } from "@views/filters-list";
import { Product } from "../products-list";
import json from '@assets/data-sample.json';
import { FILTER_NAME } from "@common/constants";
import { filtersData } from './filters-data';
import { isFilters } from "./filter";

export class FiltersList extends Component {

  constructor(handlers: ComponentHandlers = {}) {
    super({
      handlers,
      view: new FiltersListView(),
    });

    this.onLoadingStart();
  }

  private handleFiltersChange = (): void => {
    const { filters } = this.components;
    if (Array.isArray(filters) && isFilters(filters))
      this.handlers?.onFiltersChange(filters);
  }

  public onDataLoad(data: Product[]): void {
    this.onLoadingEnd();
    this.update(data);
  }

  public update(data: Product[]): void {
    const filtersEntries = Object.entries(filtersData);
    this.components.filters = filtersEntries.map(([name, filterData]) => {
      const { component, propPicker, title } = filterData;
      return new component(
        {
          propPicker,
          ...component.getFilterData(propPicker)(data),
          name,
          title,
        },
        {
          onFilterChange: this.handleFiltersChange,
        }
      );
    })
  }
}