import { Filter, FilterProps } from "./filter";
import { Product } from "@common/product";
import { EVENT } from '@common/constants';
import { debounce, selectFrom } from "@common/utils";
import { SearchFilterView } from "@views/search-filter";

export class SearchFilter extends Filter {
  private value: string;
  private searchInput: HTMLInputElement | null;
  private showClearBtn: boolean;

  constructor(props: FilterProps) {
    super({
      ...props,
      viewConstructor: SearchFilterView
    });
    const { data } = props;
    if (data === undefined) throw new TypeError();

    this.value = '';
    this.searchInput = null;
    this.showClearBtn = false;
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
    }
    selectFrom(this.getRoot())(`.search__clear`).addEventListener('click', this.handleClear);
    selectFrom(this.getRoot())(`.search__submit`).addEventListener('click', this.handleChange);
  }

  private handleClear = (): void => {
    this.showClearBtn = false;
    this.getRoot().classList.remove('search_show-clear');
    this.value = '';
    this.searchInput!.value = '';
    this.handleChange();
  }

  private handleInput = (e: Event): void => {
    const el = e.target;
    if (el instanceof HTMLInputElement) {
      this.value = el.value;
      if (this.value === '') {
        this.handleClear();
      } else {
        if (!this.showClearBtn) {
          this.showClearBtn = true;
          this.getRoot().classList.add('search_show-clear');
        }
        this.handleChange();
      }
    }
  }

  public check(product: Product): boolean {
    if (this.value === '') return true;
    const value = String(this.propPicker(product));
    return value.toLowerCase().includes(this.value.toLowerCase());
  }

  private handleChange = (): void => {
    console.log('HANDLE CHANGE', this.value)
    this.emit(EVENT.FILTER_CHANGE);
  };

  private getFilterData = (data: Product[]): number => {
    return data.reduce((acc: number, item) => {
      const prop = this.propPicker(item);
      return acc;
    }, 0);
  };
}