import { Filter, FilterOptions } from "./filter";
import { SourceData } from "@components/sources";
import { DEFAULT_FILTER_OPTION } from "@common/constants";
import { ComponentProps } from "@components/component";

export class SelectFilter extends Filter {
  constructor(props: ComponentProps<string>, ...options: FilterOptions) {
    super(props, options);

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