import './range.scss';
import { View, ViewOptions } from '@core/view';
import { RangeViewOptions } from '@components/range';

export class RangeView extends View {
  constructor(options: ViewOptions) {
    super({
      ...options,
      root: '.range',
    })
  }

  private renderInput(data: RangeViewOptions, value: number, classes: string): string {
    const { min, max, inputName } = data;
    return `
      <input class="${classes}"
        name="${inputName}"
        type="range"
        min="${min}"
        max="${max}"
        value="${value}">`;
  }

  public render(data: RangeViewOptions): string {
    const { min, max, left, right } = data;
    return super.render(`
      <label class="range">
        <span class="range__min">${min}</span>
        <div class="range__container">
          <div class="range__track">
            <div class="range__track-inner"></div>
          </div>
          ${this.renderInput(data, left, 'range__input-left range__input_top')}
          ${this.renderInput(data, right, 'range__input-right')}
        </div>
        <span class="range__max">${max}</span>
      </label>
    `);
  }  
}