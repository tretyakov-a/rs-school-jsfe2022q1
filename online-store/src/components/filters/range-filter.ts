import { Filter, FilterProps } from "./filter";
import { Range } from "../range";
import { FiltersListItem } from "./fitlers-list-item";
import { Product } from "@components/app";

export class RangeFilter extends Filter {
  protected left: number;
  protected right: number;

  constructor(props: FilterProps) {
    super(props);
    const { data, componentOptions } = props;
    if (!data || !componentOptions) throw new TypeError();

    const filterData = this.getFilterData(data || []);
    this.left = filterData.min;
    this.right = filterData.max;

    this.components = [
      ['filterListItem', FiltersListItem, {
        handlers: {
          onChange: this.handleChange,
        },
        componentOptions: {
          ...componentOptions,
          ...filterData,
          filterComponent: Range
        }
      }]
    ];

    this.update();
  }

  private handleChange = (data?: { left: number, right: number }): void => {
    this.left = data?.left || 0;
    this.right = data?.right || 0;
    this.handlers?.onFilterChange();
  };

  private getFilterData = (data: Product[]) => {
    const values = data.map((item) => Number(this.propPicker(item)));
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