import { Filter, FilterOptions } from "./filter";
import { SelectFilterView } from '@view/filters';
import { SourceData } from "@view/sources/sources";
import { DEFAULT_FILTER_OPTION } from "@common/constants";

export class SelectFilter extends Filter<string> {
  private data: string[];

  constructor(data: string[], ...options: FilterOptions) {
    super(options, new SelectFilterView());
    this.data = data;
    this.view.draw({ data: this.data, name: this.name });

    const filtersForm = document.querySelector('.source-filters') as HTMLFormElement;
    filtersForm.querySelector(`[name="${this.name}"]`)?.addEventListener('change', (e: Event) => {
      this.value = (e.target as HTMLSelectElement).value;
    });
  }

  public check(dataItem: SourceData): boolean {
    return super.check(dataItem)
      && (this.value === DEFAULT_FILTER_OPTION || this.value === dataItem[this.dataKey]);
  }
}