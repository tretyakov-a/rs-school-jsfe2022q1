import { FILTER_NAME } from "@common/constants";
import { FiltersFormView } from "@views/filters/filters-form";
import { SourceData } from "@components/sources";
import { Component } from "../component";
import { Filter } from "./filter";
import { SearchFilter } from "./search-filter";
import { SelectFilter } from "./select-filter";
import { Button } from '../button';
import { ResetBtnView } from '@views/filters/reset-btn';

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

  private getFilters(): Filter[] {
    return this.components.filter((c) => c instanceof Filter) as Filter[];
  }

  private onChange = (): void => {
    this.dispatchEvent(new CustomEvent<Filter[]>('change', {
      detail: this.getFilters()
    }));
  }

  private handleResetBtnClick = (): void => {
    this.getFilters().forEach((filter) => filter.resetDefault());
    this.onChange();
  }

  public onLoadingEnd(sources: SourceData[]) {
    super.onLoadingEnd('');
    const { CATEGORY, COUNTRY, LANGUAGE, SEARCH } = FILTER_NAME;
    const root = this.getContentEl();
    this.components.push(
      ...[CATEGORY, COUNTRY, LANGUAGE].map((name) => {
        const key = name as keyof SourceData;
        return new SelectFilter(root, Filter.getFilterData(sources, key), name, key);
      })
    );

    const searchFilter = new SearchFilter(root, SEARCH, 'name');
    searchFilter.addEventListener('change', this.onChange);
    this.components.push(searchFilter);
    this.components.push(new Button({
      view: new ResetBtnView({ root }),
      handlers: {
        onResetBtnClick: this.handleResetBtnClick
      }
    }))
    this.onChange();
  }
}