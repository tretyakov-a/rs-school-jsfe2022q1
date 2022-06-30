import { FILTER_NAME } from "@common/constants";
import { FiltersFormView } from "@views/filters/filters-form";
import { SourceData } from "@components/sources";
import { Component } from "../component";
import { Filter } from "./filter";
import { SearchFilter } from "./search-filter";
import { SelectFilter } from "./select-filter";

export class FiltersForm extends Component<string | void | SourceData> {
  constructor(selector: string) {
    super({
      view: new FiltersFormView({
        root: selector, 
        contentEl: '.source-filters__container',
      }),
    });
    this.getRoot().addEventListener('change', this.onChange);
  }

  private onChange = (): void => {
    this.dispatchEvent(new CustomEvent('change', { detail: this.components }));
  }

  public onLoadingEnd(sources: SourceData[]) {
    super.onLoadingEnd('');
    const { CATEGORY, COUNTRY, LANGUAGE, SEARCH } = FILTER_NAME;

    this.components.push(
      ...[CATEGORY, COUNTRY, LANGUAGE].map((name) => {
        const key = name as keyof SourceData;
        return new SelectFilter(this.getContentEl(), Filter.getFilterData(sources, key), name, key);
      })
    );

    const searchFilter = new SearchFilter(this.getContentEl(), SEARCH, 'name');
    searchFilter.addEventListener('change', this.onChange);
    this.components.push(searchFilter);

    this.onChange();
  }
}