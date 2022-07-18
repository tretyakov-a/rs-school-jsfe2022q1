import { View, ViewOptions } from '@core/view';

export class ProductsNumberView extends View {
  constructor(options: ViewOptions) {
    super({
      ...options,
      root: '.checkbox__products-number',
    })
  }

  public render(productsNumber?: number): string {
    const html = productsNumber
      ? `&nbsp;(${productsNumber})`
      : '';
    return super.render(`
      <span class="checkbox__products-number">${html}</span>
    `);
  }
}