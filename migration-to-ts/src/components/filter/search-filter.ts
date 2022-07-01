import { Filter, FilterOptions } from "./filter";
import { SourceData } from "@components/sources";
import { ComponentHandlers } from "@components/component";
import { SearchFilterView } from "@views/filters";

export class SearchFilter extends Filter {
  constructor(options: FilterOptions, handlers: ComponentHandlers = {}) {
    super(
      {
        handlers,
        view: new SearchFilterView(),
      },
      options
    );

    this.value = '';
    this.inputEl.addEventListener('input', this.onInput);
  }

  private onInput = (e: Event): void => {
    this.value = (e.target as HTMLInputElement).value;
    (this.props.handlers?.onInput as () => void)();
  }

  public isDefaultValue(): boolean {
    return this.value === '';
  }

  public resetDefault(): void {
    this.value = '';
    this.inputEl.value = '';
  }
  
  public check(dataItem: SourceData): boolean {
    return dataItem['name'].toLowerCase().includes(this.value.trim().toLowerCase());
  }
}