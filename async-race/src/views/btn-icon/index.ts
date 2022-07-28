import { View, ViewOptions } from '@core/view';

export enum ICON_TYPE {
  FILTERS,
  CROSS,
  CART,
}

const types: Record<ICON_TYPE, string> = {
  [ICON_TYPE.FILTERS]: '<i class="fa-solid fa-sliders"></i>',
  [ICON_TYPE.CROSS]: '<i class="fa-solid fa-xmark"></i>',
  [ICON_TYPE.CART]: '<i class="fa-solid fa-cart-plus"></i>',
}

export class BtnIconView extends View {
  constructor(options: ViewOptions) {
    super({
      ...options,
      root: '.button__icon',
    })
  }

  public render(type: ICON_TYPE | string = ICON_TYPE.CROSS): string {
    return super.render(`
      <span class="button__icon">
        ${typeof type === 'string' ? type : types[type]}
      </span>
    `);
  }
}