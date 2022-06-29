import { Filter, FilterOptions } from "./filter";
import { SearchFilterView } from '@views/filters';
import { SourceData } from "@components/sources";
import { selectFrom } from "@common/utils";

export class SearchFilter extends Filter {
  constructor(...options: FilterOptions) {
    super(options, new SearchFilterView({
      root: '.source-filters__wrapper',
    }));

    this.value = '';

    selectFrom(this.getRoot())(`[name="${this.name}"]`).addEventListener('input', this.onInput);
  }

  private onInput = (e: Event): void => {
    this.value = (e.target as HTMLInputElement).value;
    this.dispatchEvent(new Event('change'));
  }

  public check(dataItem: SourceData): boolean {
    return dataItem['name'].toLowerCase().includes(this.value.trim().toLowerCase());
  }
}