import { View, ViewOptions } from '@core/view';

export class ResetSettingsBtnView extends View {
  constructor(options: ViewOptions) {
    super({
      ...options,
      root: '.controls__reset-settings',
    })
  }

  public render(): string {
    return super.render(`
      <div class="controls__reset-settings">
        <button class="button">
          Сбросить настройки
        </button>
      </div>
    `);
  }  
}
