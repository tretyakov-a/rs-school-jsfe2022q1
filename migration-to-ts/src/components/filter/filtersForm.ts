import { FILTER_NAME } from "@common/constants";
import { SearchFilterView, ResetBtnView, SelectFilterView } from "@views/filters";
import { SourceData } from "@components/sources";
import { Component } from "../component";
import { Filter, SearchFilter, SelectFilter } from ".";
import { Button } from '../button';
import { ComponentProps } from '@components/component';

export class FiltersForm extends Component<SourceData> {
  constructor(props: ComponentProps<SourceData>) {
    super(props);

    this.getRoot().addEventListener('change', this.onChange);
    this.onLoadingStart();
  }

  private getFilters(): Filter[] {
    return Object.keys(this.components)
      .filter((key) => this.components[key] instanceof Filter)
      .map((key) => this.components[key] as Filter);
  }

  private onChange = (): void => {
    this.props.handlers?.onFilterChange(this.getFilters());
  }

  private handleResetBtnClick = (): void => {
    const filters = this.getFilters();
    if (!filters.reduce((acc, filter) => acc && filter.isDefaultValue(), true)) {
      filters.forEach((filter) => filter.resetDefault());
      this.onChange();
    }
  }

  public update(sources: SourceData[]) {
    super.update('');
    const { CATEGORY, COUNTRY, LANGUAGE, SEARCH } = FILTER_NAME;
    const root = this.getContentEl();

    [CATEGORY, COUNTRY, LANGUAGE].forEach((name) => {
      const key = name as keyof SourceData;
      this.components[`${name}Filter`] = new SelectFilter({
        view: new SelectFilterView({
          data: Filter.getFilterData(sources, key), name, root,
        })
      }, name, key);
    })

    this.components.searchFilter = new SearchFilter({
      view: new SearchFilterView({ root }),
      handlers: {
        onInput: this.onChange
      }
    }, SEARCH, 'name');

    this.components.resetBtn = new Button({
      view: new ResetBtnView({ root }),
      handlers: {
        onResetBtnClick: this.handleResetBtnClick
      }
    });
  }
}