import { ComponentHandlers } from "@core/component";
import { View } from "@core/view";
import { Filter, FilterData } from "./filter";
import { Range } from "../range";
import { FiltersListItem } from "./fitlers-list-item";
import { Product } from "@components/products-list";
import { PropPicker } from "./filters-data";

export class RangeFilter extends Filter {
  protected left: number;
  protected right: number;

  constructor(data: FilterData, handlers: ComponentHandlers = {}) {
    super(data, {
      handlers,
      view: new View()
    });

    this.left = data.min || 0;
    this.right = data.max || 0;
    this.components.filterListItem = new FiltersListItem(data, Range, {
      onChange: this.handleChange,
    })
  }

  private handleChange = (data?: { left: number, right: number }): void => {
    this.left = data?.left || 0;
    this.right = data?.right || 0;
    this.handlers?.onFilterChange();
  };

  static getFilterData = (getProp: PropPicker) => (data: Product[]) => {
    const values = data.map((item) => Number(getProp(item)));
    return { 
      min: Math.min(...values),
      max: Math.max(...values),
    };
  };

  public check(product: Product): boolean {
    const value = Number(this.propPicker(product));

    return value >= this.left && value <= this.right;
  }
}