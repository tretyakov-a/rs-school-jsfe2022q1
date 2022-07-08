import { ComponentHandlers } from "@core/component";
import { View } from "@core/view";
import { Filter, FilterData } from "./filter";
import { CheckboxList } from '../checkbox-list';
import { FiltersListItem } from './fitlers-list-item';
import { Product } from "@components/products-list";
import { PropPicker } from "./filters-data";

export class CheckboxFilter extends Filter {
  protected checkedValues: string[];

  constructor(data: FilterData, handlers: ComponentHandlers = {}) {
    super(data, {
      handlers,
      view: new View()
    });

    this.checkedValues = [];
    this.components.filterListItem = new FiltersListItem(data, CheckboxList, {
      onChange: this.handleChange,
    });
  }

  private handleChange = (data?: string[]): void => {
    this.checkedValues = [ ...(data || []) ];
    this.handlers?.onFilterChange();
  };

  static getFilterData = (getProp: PropPicker) => (data: Product[]) => {
    const values = data.reduce((acc: Record<string, number>, item) => {
      const prop = getProp(item); 
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