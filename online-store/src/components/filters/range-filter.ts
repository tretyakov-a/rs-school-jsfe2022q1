import { Filter, FilterProps } from "./filter";
import { Range } from "../range";
import { Product } from "@common/product";
import { EVENT } from "@common/constants";

export class RangeFilter extends Filter {
  protected left: number;
  protected right: number;

  constructor(props: FilterProps) {
    super(props);
    const { data } = props;
    if (data === undefined) throw new TypeError();

    const filterData = this.getFilterData(data.products);
    this.left = filterData.min;
    this.right = filterData.max;
  }

  private handleChange = (data?: { left: number, right: number }): void => {
    this.left = data?.left || 0;
    this.right = data?.right || 0;
    this.emit(EVENT.FILTER_CHANGE);
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

  protected render(): string {
    const { left, right } = this;
    return this.renderChild('filterContent', Range, {
      handlers: {
        onChange: this.handleChange,
      },
      data: {
        inputName: this.name,
        min: left,
        max: right
      }
    });
  }
}