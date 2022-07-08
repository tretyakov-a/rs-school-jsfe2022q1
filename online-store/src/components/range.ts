import { Component, ComponentHandlers } from "@core/component";
import { RangeView } from "@views/range";
import { selectFrom } from '@common/utils';
import { FilterData } from "./filters/filter";

export type RangeOptions = {
  name: string,
  min: number;
  max: number;
}
export class Range extends Component {
  private min: number;
  private max: number;
  private left: number;
  private right: number;
  private minEl: HTMLElement;
  private maxEl: HTMLElement;
  private trackEl: HTMLElement;
  private leftInputEl: HTMLElement;
  private rightInputEl: HTMLElement;

  constructor(data: FilterData, root: HTMLElement, handlers: ComponentHandlers = {}) {
    super({
      handlers,
      view: new RangeView({
        data, root,
        contentEl: '.filter__content',
      })
    });

    const select = selectFrom(this.getRoot());
    this.min = data.min || 0;
    this.max = data.max || 0;

    this.left = this.min;
    this.right = this.max;
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
    this.leftInputEl.classList.add('range__input_top');
    this.rightInputEl.classList.remove('range__input_top');
  }
  
  private handleRightRangeFocus = (): void => {
    this.leftInputEl.classList.remove('range__input_top');
    this.rightInputEl.classList.add('range__input_top');
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
    this.minEl.textContent = `${leftValue}`;
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
    this.maxEl.textContent = `${rightValue}`;
    this.setTrackWidth();
  }

  private setTrackWidth(): void {
    const { min, max, left, right } = this;
    const leftValue = ((left - min) / (max - min)) * 100;
    const rightValue = ((max - right) / (max - min)) * 100;
    const width = 100 - leftValue - rightValue;
    this.trackEl.style.left = `${leftValue}%`;
    this.trackEl.style.width = `${width}%`;
  }
}