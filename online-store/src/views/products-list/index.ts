import './products-list.scss';
import { View } from '@core/view';
import { ViewOptions } from '@core/view';
import { Component } from '@core/component';
import { SpinnerView } from '@views/spinner';
import { ProductsListViewOptions } from '@components/products-list';
import { ProductsListItemView } from '@views/products-list-item';

export class ProductsListView extends View {
  static readonly className: string = 'products-list';

  constructor(options: ViewOptions) {
    super({
      ...options,
      root: '.products__list',
    })
  }

  private renderItems(data: ProductsListViewOptions) {
    const { products, productInCartIds } = data;
    return products
      .map((item) => {
        return this.renderChild('productsListItem', Component, {
          data: {
            product: item,
            isInCart: productInCartIds.includes(item.id),
          },
          viewConstructor: ProductsListItemView,
        })
      })
      .join('');
  }

  public render(data: ProductsListViewOptions): string {
    const className = ProductsListView.className;
    const displayMod = data ? `${className}_${data.displayOption}` : '';
    return super.render(`
      <div class="products__list">
        ${!data || this.isLoading
          ? this.renderChild('spinner', Component, {
              viewConstructor: SpinnerView
            })
          : data.products.length === 0
            ? `<p class="products__empty">Товары не найдены! Попробуйте изменить критерии фильтрации.</p>`
            : `<ul class="${className} ${displayMod}">${this.renderItems(data)}</ul>`}
      </div>
    `);
  }
}