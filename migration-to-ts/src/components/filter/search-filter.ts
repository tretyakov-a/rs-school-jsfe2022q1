import { Filter, FilterOptions } from "./filter";
import { SearchFilterView } from '@views/filters';
import { SourceData } from "@components/sources";

export class SearchFilter extends Filter {
  constructor(root: string | HTMLElement, ...options: FilterOptions) {
    super(options, new SearchFilterView({ root }));

    this.value = '';
    this.inputEl.addEventListener('input', this.onInput);
  }

  private onInput = (e: Event): void => {
    this.value = (e.target as HTMLInputElement).value;
    this.dispatchEvent(new Event('change'));
  }

  public check(dataItem: SourceData): boolean {
    return dataItem['name'].toLowerCase().includes(this.value.trim().toLowerCase());
  }
}