import { View, ViewOptions } from '@core/view';

export class ResetFiltersBtnView extends View {
  constructor(options: ViewOptions) {
    super({
      ...options,
      root: '.controls__reset-filters',
    })
  }

  public render(): string {
    return super.render(`
      <div class="controls__reset-filters">
        <button class="button">
          Сбросить фильтры
        </button>
      </div>
    `);
  }  
}
