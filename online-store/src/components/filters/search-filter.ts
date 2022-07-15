import { Filter, FilterProps, FilterViewOptions } from "./filter";
import { Product } from "@common/product";
import { EVENT } from '@common/constants';
import { debounce, selectFrom } from "@common/utils";
import { SearchFilterView } from "@views/search-filter";

type SearchFilterState = {
  value: string
}

type SearchFilterProps = FilterProps & {
  data: FilterViewOptions & {
    state?: SearchFilterState;
  }
}

export class SearchFilter extends Filter {
  private _value: string;
  private searchInput: HTMLInputElement | null;

  constructor(props: SearchFilterProps) {
    super({
      ...props,
      viewConstructor: SearchFilterView
    });
    const { data } = props;
    if (data === undefined) throw new TypeError();

    this._value = data.state?.value || '';
    this.searchInput = null;
  }
  
  get value() {
    return this._value;
  }

  set value(newValue) {
    const method = newValue === '' ? 'remove' : 'add';
    this.getRoot().classList[method]('search_show-clear');

    this._value = newValue;
  }

  protected render(): string {
    const { title, name, value } = this;
    return super.render({ title, inputName: name, value });
  }

  afterRender() {
    super.afterRender();
    const input = selectFrom(this.getRoot())(`input[name="${this.name}"]`);
    if (input instanceof HTMLInputElement) {
      input.addEventListener('input', debounce.call(this, 200, this.handleInput));
      this.searchInput = input;
      this.searchInput.focus();
    }
    selectFrom(this.getRoot())(`.search__clear`).addEventListener('click', this.handleClear);
    selectFrom(this.getRoot())(`.search__submit`).addEventListener('click', this.handleChange);
  }

  private handleClear = (): void => {
    this.value = '';
    this.searchInput!.value = '';
    this.handleChange();
  }

  private handleInput = (e: Event): void => {
    const el = e.target;
    if (el instanceof HTMLInputElement && this.value !== el.value) {
      this.value = el.value;
      this.handleChange();
    }
  }

  public check(product: Product): boolean {
    if (this.value === '') return true;
    const value = String(this.propPicker(product));
    return value.toLowerCase().includes(this.value.toLowerCase());
  }

  public getState(): SearchFilterState {
    return { value: this.value };
  };

  public reset(): void {
    if (this.value === '') return;
    this.value = '';
    this.update();
  }
  
  private handleChange = (): void => {
    this.emit(EVENT.CHANGE_FILTER);
  };

}