import { Filter, FilterProps } from "./filter";
import { Product } from "@common/product";
import { EVENT } from '@common/constants';
import { CheckboxListView } from "@views/checkbox-list";
import { FilterViewOptions } from '@components/filters/filter';

export type CheckboxListViewOptions = {
  inputName: string;
  values: Record<string, number>;
  checkedValues: string[];
}

type CheckboxFilterState = {
  checkedValues: string[];
}

type CheckboxFilterProps = FilterProps & {
  data: FilterViewOptions & {
    state?: CheckboxFilterState;
  }
}

export class CheckboxFilter extends Filter {
  protected checkedValues: string[];
  protected values: Record<string, number>;
  private checkboxes: NodeList | null;

  constructor(props: CheckboxFilterProps) {
    super({
      ...props,
      viewConstructor: CheckboxListView,
    });

    const { data } = props;
    if (data === undefined) throw new TypeError();

    this.checkedValues = data.state?.checkedValues || [];
    this.values = this.getFilterData(data.products);
    this.checkboxes = null;
  }

  protected render(): string {
    const { values, checkedValues } = this;
    return super.render({
      inputName: this.name,
      values,
      checkedValues,
    })
  }

  afterRender() {
    super.afterRender();
    
    this.checkboxes = this.getRoot().querySelectorAll(`input[name="${this.name}"]`);
    this.checkboxes.forEach((el) => {
      el.addEventListener('change', this.handleChange);
    });  
  }

  private handleChange = (): void => {
    if (!this.checkboxes) return;
    const values = [...this.checkboxes].reduce((acc: string[], el) => {
      return el instanceof HTMLInputElement && el.checked
        ? [ ...acc, el.value ]
        : acc;   
    }, []);
    this.checkedValues = [ ...values ];
    this.emit(EVENT.FILTER_CHANGE);
  }

  protected getFilterData = (data: Product[]) => {
    const values = data.reduce((acc: Record<string, number>, item) => {
      const prop = this.propPicker(item); 
      if (prop) {
        acc[prop] = acc[prop] ? acc[prop] + 1 : 1;
      }
      return acc;
    }, {});
    return values;
  };

  public check(product: Product): boolean {
    if (this.checkedValues.length === 0) {
      return true;
    }
    const value = String(this.propPicker(product));
    return this.checkedValues.includes(value);
  }

  public getState(): CheckboxFilterState {
    return { checkedValues: this.checkedValues };
  };

  public reset(): void {
    if (this.checkedValues.length === 0) return;
    this.checkedValues = [];
    this.update();
  }
}