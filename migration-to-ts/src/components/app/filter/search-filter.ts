import { Filter, FilterOptions } from "./filter";
import { SearchFilterView } from '@view/filters';
import { SourceData } from "@view/sources/sources";

export class SearchFilter extends Filter<void> {
  constructor(...options: FilterOptions) {
    super(options, new SearchFilterView());
    this.value = '';
    this.view.draw();

    const filtersForm = document.querySelector('.source-filters') as HTMLFormElement;
    filtersForm.querySelector(`[name="${this.name}"]`)?.addEventListener('input', (e: Event) => {
      this.value = (e.target as HTMLInputElement).value;
      filtersForm.dispatchEvent(new Event('change'));
    });
  }

  public check(dataItem: SourceData): boolean {
    return dataItem['name'].toLowerCase().includes(this.value.trim().toLowerCase());
  }
}