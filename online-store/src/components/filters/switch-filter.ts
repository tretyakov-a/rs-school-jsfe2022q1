import { Filter, FilterProps, FilterViewOptions } from "./filter";
import { Product } from "@common/product";
import { EVENT } from '@common/constants';
import { SwitchFilterView } from "@views/switch-filter";
import { selectFrom } from "@common/utils";

enum SwitchValue {
  YES = 'есть',
  NO = 'нет',
}

type SwitchFilterState = {
  checked: boolean;
}

type SwitchFilterProps = FilterProps & {
  data: FilterViewOptions & {
    state?: SwitchFilterState;
  }
}

export class SwitchFilter extends Filter {
  private matchedProductsNumber: number;
  private checked: boolean;
  private checkbox: Node | null;

  constructor(props: SwitchFilterProps) {
    super({
      ...props,
      viewConstructor: SwitchFilterView
    });
    const { data } = props;
    if (data === undefined) throw new TypeError();

    this.matchedProductsNumber = this.getFilterData(data.products);
    this.checked = data.state?.checked || false;
    this.checkbox = null;
  }
  
  protected render(): string {
    const { checked, title, name, matchedProductsNumber } = this;
    return super.render({ checked, title, inputName: name, matchedProductsNumber });
  }

  afterRender() {
    super.afterRender();
  
    this.checkbox = selectFrom(this.getRoot())(`input[name="${this.name}"]`);
    this.checkbox.addEventListener('change', this.handleChange);
  }

  public check(product: Product): boolean {
    if (!this.checked) return true;
    const value = String(this.propPicker(product));
    return (value === SwitchValue.YES) === this.checked;
  }

  public getState(): SwitchFilterState {
    return { checked: this.checked };
  };

  private handleChange = (): void => {
    if (!this.checkbox) return;
    if (this.checkbox instanceof HTMLInputElement) {
      this.checked = this.checkbox.checked;
    }
    
    this.emit(EVENT.FILTER_CHANGE);
  };

  protected getFilterData = (data: Product[]): number => {
    return data.reduce((acc: number, item) => {
      const prop = this.propPicker(item);
      return acc + Number(prop === SwitchValue.YES);
    }, 0);
  };

}