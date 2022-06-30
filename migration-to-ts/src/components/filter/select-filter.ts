import { Filter, FilterOptions } from "./filter";
import { SelectFilterView } from '@views/filters';
import { SourceData } from "@components/sources";
import { DEFAULT_FILTER_OPTION } from "@common/constants";

export class SelectFilter extends Filter {
  constructor(root: string | HTMLElement, data: string[], ...options: FilterOptions) {
    super(options, new SelectFilterView({
      data,
      name: options[0],
      root,
    }));

    this.inputEl.addEventListener('change', this.onChange);
  }

  private onChange = (e: Event): void => {
    this.value = (e.target as HTMLSelectElement).value;
  }

  public resetDefault(): void {
    this.value = DEFAULT_FILTER_OPTION;
    this.inputEl.value = this.value;
  }

  public check(dataItem: SourceData): boolean {
    return super.check(dataItem)
      && (this.value === DEFAULT_FILTER_OPTION || this.value === dataItem[this.dataKey]);
  }
}