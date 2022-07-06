import { FILTER_NAME } from "@common/constants";
import { FiltersFormView, ResetBtnView } from "@views/filters";
import { SourceData } from "@components/sources";
import { Component, ComponentHandler, ComponentHandlers } from "../component";
import { Filter, SearchFilter, SelectFilter } from ".";
import { Button } from "@components/button";

export class FiltersForm extends Component {
  constructor(handlers: ComponentHandlers = {}) {
    super({
      handlers,
      view: new FiltersFormView(), 
    });

    this.getRoot().addEventListener('change', this.onChange);
    this.onLoadingStart();
  }

  private getFilters(): Filter[] {
    return Object.keys(this.components)
      .filter((key) => this.components[key] instanceof Filter)
      .map((key) => this.components[key] as Filter);
  }

  private onChange = (): void => {
    (this.props.handlers?.onFilterChange as ComponentHandler)(this.getFilters());
  }

  private handleResetBtnClick = (): void => {
    const filters = this.getFilters();
    if (!filters.reduce((acc, filter) => acc && filter.isDefaultValue(), true)) {
      filters.forEach((filter) => filter.resetDefault());
      this.onChange();
    }
  }

  public update(sources: SourceData[]) {
    super.update();
    const { CATEGORY, COUNTRY, LANGUAGE, SEARCH } = FILTER_NAME;

    [CATEGORY, COUNTRY, LANGUAGE].forEach((name) => {
      const dataKey = name as keyof SourceData;
      const data = Filter.getFilterData(sources, dataKey);
      this.components[`${name}Filter`] = new SelectFilter({ name, dataKey, data });
    })

    this.components.searchFilter = new SearchFilter(
      { name: SEARCH, dataKey: 'name' },
      { onInput: this.onChange },
    );

    this.components.resetBtn = new Button({
        onClick: this.handleResetBtnClick
    }, new ResetBtnView());
  }
}