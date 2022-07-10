import { Filter, FilterProps } from "./filter";
import { CheckboxList } from '../checkbox-list';
import { FiltersListItem } from './fitlers-list-item';
import { Product } from "@components/app";

export class CheckboxFilter extends Filter {
  protected checkedValues: string[];

  constructor(props: FilterProps) {
    super(props);
    const { data, componentOptions } = props;
    if (!data || !componentOptions) throw new TypeError();

    this.checkedValues = [];
    const filterData = this.getFilterData(data || []);

    this.components = [
      ['filterListItem', FiltersListItem, {
        handlers: {
          onChange: this.handleChange,
        },
        componentOptions: {
          ...componentOptions,
          ...filterData,
          filterComponent: CheckboxList
        }
      }]
    ];

    this.update();
  }

  private handleChange = (data?: string[]): void => {
    this.checkedValues = [ ...(data || []) ];
    this.handlers?.onFilterChange();
  };

  private getFilterData = (data: Product[]) => {
    const values = data.reduce((acc: Record<string, number>, item) => {
      const prop = this.propPicker(item); 
      if (prop) {
        acc[prop] = acc[prop] ? acc[prop] + 1 : 1;
      }
      return acc;
    }, {});
    return { values };
  };

  public check(product: Product): boolean {
    if (this.checkedValues.length === 0) {
      return true;
    }
    const value = String(this.propPicker(product));
    return this.checkedValues.includes(value);
  }
}