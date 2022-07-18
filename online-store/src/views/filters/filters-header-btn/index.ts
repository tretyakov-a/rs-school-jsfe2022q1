import { Component } from '@core/component';
import { View, ViewOptions } from '@core/view';
import { BtnIconView, ICON_TYPE } from '@views/btn-icon';
import './filters-header-btn.scss';

export class FiltersHeaderBtnView extends View {
  constructor(options: ViewOptions) {
    super({
      ...options,
      root: '.filters-btn',
    })
  }

  public render(): string {
    return super.render(`
      <div class="header__filters-btn filters-btn">
        <button class="button button_icon">
          ${this.renderChild('icon', Component, {
            viewConstructor: BtnIconView,
            viewOptions: {
              data: ICON_TYPE.FILTERS,
            }
          })}
        </button>
      </div>
    `);
  }
}