import { Filter, FilterProps, FilterViewOptions } from "./filter";
import { Range } from "../range";
import { Product } from "@common/product";
import { EVENT } from "@common/constants";

type RangeFilterState = {
  left: number;
  right: number;
}

type RangeFilterProps = FilterProps & {
  data: FilterViewOptions & {
    state?: RangeFilterState;
  }
}

export class RangeFilter extends Filter {
  private left: number;
  private right: number;
  private min: number;
  private max: number;

  constructor(props: RangeFilterProps) {
    super(props);
    const { data } = props;
    if (data === undefined) throw new TypeError();

    const { min, max } = this.getFilterData(data.products);
    this.left = data.state?.left || min;
    this.right = data.state?.right || max;
    this.min = min;
    this.max = max;
  }

  private handleChange = (data?: { left: number, right: number }): void => {
    if (!data) return;
    const { left, right } = data;
    if (left === this.left && right === this.right) return;
    this.left = left;
    this.right = right;
    this.emit(EVENT.FILTER_CHANGE);
  };

  protected getFilterData = (data: Product[]) => {
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

  public getState(): RangeFilterState {
    const { left, right } = this;
    return { left, right };
  };

  protected render(): string {
    const { left, right, min, max } = this;
    return this.renderChild('filterContent', Range, {
      handlers: {
        onChange: this.handleChange,
      },
      data: {
        inputName: this.name,
        min, max, left, right,
      }
    });
  }
}