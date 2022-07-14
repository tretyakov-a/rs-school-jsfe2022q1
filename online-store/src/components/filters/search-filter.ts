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
  private value: string;
  private searchInput: HTMLInputElement | null;
  private showClearBtn: boolean;

  constructor(props: SearchFilterProps) {
    super({
      ...props,
      viewConstructor: SearchFilterView
    });
    const { data } = props;
    if (data === undefined) throw new TypeError();

    this.value = data.state?.value || '';
    this.searchInput = null;
    this.showClearBtn = this.value === '';
  }
  
  protected render(): string {
    const { title, name, value } = this;
    return super.render({ title, inputName: name, value });
  }

  afterRender() {
    super.afterRender();
    this.toggleClearBtn();
    const input = selectFrom(this.getRoot())(`input[name="${this.name}"]`);
    if (input instanceof HTMLInputElement) {
      input.addEventListener('input', debounce.call(this, 200, this.handleInput));
      this.searchInput = input;
    }
    selectFrom(this.getRoot())(`.search__clear`).addEventListener('click', this.handleClear);
    selectFrom(this.getRoot())(`.search__submit`).addEventListener('click', this.handleChange);
  }

  private handleClear = (): void => {
    this.toggleClearBtn();
    this.value = '';
    this.searchInput!.value = '';
    this.handleChange();
  }

  private toggleClearBtn() {
    this.showClearBtn = !this.showClearBtn;
    const method = this.showClearBtn ? 'add' : 'remove';
    this.getRoot().classList[method]('search_show-clear');
  }

  private handleInput = (e: Event): void => {
    const el = e.target;
    if (el instanceof HTMLInputElement && this.value !== el.value) {
      this.value = el.value;
      if (this.value === '') {
        this.handleClear();
      } else {
        !this.showClearBtn && this.toggleClearBtn();
        this.handleChange();
      }
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

  private handleChange = (): void => {
    this.emit(EVENT.FILTER_CHANGE);
  };

}