import { View, ViewOptions } from "@core/view";

export class ListedProductsAmountView extends View {
  constructor(options: ViewOptions) {
    super({
      ...options,
      root: '.products__amount',
    })
  }

  public render(productsAmount?: number): string {
    const content = productsAmount !== undefined
      ? `Найдено товаров: ${productsAmount}`
      : '';
    return super.render(`
      <div class="products__amount">
        <span>${content}</span>
      </div>
    `)
  }
}