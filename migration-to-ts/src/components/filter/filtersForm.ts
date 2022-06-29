import { FILTER_NAME } from "@common/constants";
import { FiltersFormView } from "@views/filters/filters-form";
import { SourceData } from "@components/sources";
import { Component } from "../component";
import { Filter } from "./filter";
import { SearchFilter } from "./search-filter";
import { SelectFilter } from "./select-filter";

export class FiltersForm extends Component<string | void> {
  constructor() {
    super(new FiltersFormView({
      root: '.source-filters', 
      contentEl: '.source-filters__wrapper',
    }));
    this.getRoot().addEventListener('change', this.onChange);
  }

  private onChange = (): void => {
    this.dispatchEvent(new CustomEvent('change', { detail: this.components }));
  }

  public initFilters(sources: SourceData[]) {
    this.onLoadingEnd('');

    const { CATEGORY, COUNTRY, LANGUAGE, SEARCH } = FILTER_NAME;

    this.components.push(
      ...[CATEGORY, COUNTRY, LANGUAGE].map((name) => {
        const key = name as keyof SourceData;
        return new SelectFilter(Filter.getFilterData(sources, key), name, key);
      })
    );

    const searchFilter = new SearchFilter(SEARCH, 'name');
    searchFilter.addEventListener('change', this.onChange);
    this.components.push(searchFilter);

    this.onChange();
  }
}