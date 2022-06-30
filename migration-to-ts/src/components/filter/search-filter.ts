import { Filter, FilterOptions } from "./filter";
import { SourceData } from "@components/sources";
import { ComponentProps } from "@components/component";

export class SearchFilter extends Filter {
  constructor(props: ComponentProps<string>, ...options: FilterOptions) {
    super(props, options);

    this.value = '';
    this.inputEl.addEventListener('input', this.onInput);
  }

  private onInput = (e: Event): void => {
    this.value = (e.target as HTMLInputElement).value;
    this.props.handlers?.onInput();
  }

  public isDefaultValue(): boolean {
    return this.value === '';
  }
  
  public check(dataItem: SourceData): boolean {
    return dataItem['name'].toLowerCase().includes(this.value.trim().toLowerCase());
  }
}