import { Filter, FilterOptions } from "./filter";
import { SourceData } from "@components/sources";
import { DEFAULT_FILTER_OPTION } from "@common/constants";
import { ComponentHandlers } from "@components/component";
import { SelectFilterView } from '@views/filters';

export class SelectFilter extends Filter {
  constructor(options: FilterOptions, handlers: ComponentHandlers = {}) {
    super(
      {
        handlers,
        view: new SelectFilterView({ data: options }),
      },
      options);

    this.inputEl.addEventListener('change', this.onChange);
  }

  private onChange = (e: Event): void => {
    this.value = (e.target as HTMLSelectElement).value;
  }

  public check(dataItem: SourceData): boolean {
    return super.check(dataItem)
      && (this.value === DEFAULT_FILTER_OPTION || this.value === dataItem[this.dataKey]);
  }
}