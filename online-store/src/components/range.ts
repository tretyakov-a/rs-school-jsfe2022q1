import { Component, ComponentProps } from "@core/component";
import { RangeView } from "@views/range";
import { selectFrom } from '@common/utils';
import { withNullCheck } from '@common/utils';

export type RangeOptions = {
  name: string,
  min: number;
  max: number;
}

export type RangeProps = ComponentProps & {
  componentOptions?: RangeOptions;
}

export class Range extends Component {
  private min: number;
  private max: number;
  private left: number;
  private right: number;
  private minEl: HTMLElement | null;
  private maxEl: HTMLElement | null;
  private trackEl: HTMLElement | null;
  private leftInputEl: HTMLElement | null;
  private rightInputEl: HTMLElement | null;

  constructor(props: RangeProps) {
    super({
      ...props,
      viewConstructor: RangeView,
    });

    this.minEl = null;
    this.maxEl = null;
    this.trackEl = null;
    this.leftInputEl = null;
    this.rightInputEl = null;
    
    const { componentOptions } = props;
    if (!componentOptions) throw new TypeError();

    this.min = componentOptions.min || 0;
    this.max = componentOptions.max || 0;
    
    this.left = this.min;
    this.right = this.max;
    
    this.update(componentOptions);
  }

  protected update(data?: RangeOptions): void {
    super.update(data);

    const select = selectFrom(this.getRoot());
    this.minEl = select('.range__min');
    this.maxEl = select('.range__max');
    this.trackEl = select('.range__track-inner');
    this.leftInputEl = select('.range__input-left');
    this.rightInputEl = select('.range__input-right');

    this.leftInputEl.addEventListener('input', this.handleLeftRangeChange);
    this.rightInputEl.addEventListener('input', this.handleRightRangeChange);

    this.leftInputEl.addEventListener('focus', this.handleLeftRangeFocus);
    this.rightInputEl.addEventListener('focus', this.handleRightRangeFocus);

    this.leftInputEl.addEventListener('change', this.handleChange);
    this.rightInputEl.addEventListener('change', this.handleChange);
  }

  private handleChange = () => {
    const { left, right } = this;
    this.handlers?.onChange({ left, right });
  }

  private handleLeftRangeFocus = (): void => {
    this.leftInputEl?.classList.add('range__input_top');
    this.rightInputEl?.classList.remove('range__input_top');
  }
  
  private handleRightRangeFocus = (): void => {
    this.leftInputEl?.classList.remove('range__input_top');
    this.rightInputEl?.classList.add('range__input_top');
  }

  private handleLeftRangeChange = (e: Event): void => {
    const el = e.target;
    if (!(el instanceof HTMLInputElement)) return;

    const leftValue = Number(el.value);
    if (leftValue > this.right) {
      el.value = String(this.right);
      return e.preventDefault();
    }
    this.left = leftValue;
    withNullCheck(this.minEl).textContent = `${leftValue}`;
    this.setTrackWidth();
  }

  private handleRightRangeChange = (e: Event): void => {
    const el = e.target;
    if (!(el instanceof HTMLInputElement)) return;
    
    const rightValue = Number(el.value);
    if (rightValue < this.left) {
      el.value = String(this.left);
      return e.preventDefault();
    }
    this.right = rightValue;
    withNullCheck(this.maxEl).textContent = `${rightValue}`;
    this.setTrackWidth();
  }

  private setTrackWidth(): void {
    const { min, max, left, right } = this;
    const leftValue = ((left - min) / (max - min)) * 100;
    const rightValue = ((max - right) / (max - min)) * 100;
    const width = 100 - leftValue - rightValue;
    withNullCheck(this.trackEl).style.left = `${leftValue}%`;
    withNullCheck(this.trackEl).style.width = `${width}%`;
  }
}