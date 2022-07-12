import { Filter, FilterProps } from "./filter";
import { CheckboxList } from '../checkbox-list';
import { Product } from "@common/product";
import { EVENT } from '@common/constants';

export class CheckboxFilter extends Filter {
  protected checkedValues: string[];
  protected values: Record<string, number>;

  constructor(props: FilterProps) {
    super(props);
    const { data } = props;
    if (data === undefined) throw new TypeError();

    this.checkedValues = [];
    this.values = this.getFilterData(data.products);
  }

  private handleChange = (data?: string[]): void => {
    this.checkedValues = [ ...(data || []) ];
    this.emit(EVENT.FILTER_CHANGE);
  };

  private getFilterData = (data: Product[]) => {
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

  protected render(): string {
    const { values } = this;
    return this.renderChild('filterContent', CheckboxList, {
      handlers: {
        onChange: this.handleChange,
      },
      data: {
        inputName: this.name,
        values,
      }
    });
  }
}