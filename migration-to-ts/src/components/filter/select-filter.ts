import { Filter, FilterOptions } from "./filter";
import { SelectFilterView } from '@views/filters';
import { SourceData } from "@components/sources";
import { DEFAULT_FILTER_OPTION } from "@common/constants";
import { selectFrom } from "@common/utils";

export class SelectFilter extends Filter {
  constructor(data: string[], ...options: FilterOptions) {
    super(options, new SelectFilterView({
      data,
      name: options[0],
      root: '.source-filters__container',
    }));

    selectFrom(this.getRoot())(`[name="${this.name}"]`).addEventListener('change', this.onChange);
  }

  private onChange = (e: Event): void => {
    this.value = (e.target as HTMLSelectElement).value;
  }

  public check(dataItem: SourceData): boolean {
    return super.check(dataItem)
      && (this.value === DEFAULT_FILTER_OPTION || this.value === dataItem[this.dataKey]);
  }
}