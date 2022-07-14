import './products-list.scss';
import { ViewOptions } from '@core/view';
import { Component } from '@core/component';
import { ProductsListViewOptions } from '@components/products-list';
import { ProductsListItemView } from '@views/products-list-item';
import { LoaderView } from '@core/loader-view';

export class ProductsListView extends LoaderView {
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

  public render(data?: ProductsListViewOptions): string {
    let html = '';
    if (data !== undefined) {
      const className = ProductsListView.className;
      const { error, products } = data;
      const displayMod = `${className}_${data.displayOption}`;
      html = !error
        ? products.length === 0
          ? `<p class="products__empty">Товары не найдены! Попробуйте изменить критерии фильтрации.</p>`
          : `<ul class="${className} ${displayMod}">${this.renderItems(data)}</ul>`
        : `Ошибка загрузки товаров`;
    }
    
    return super.render((loader: string) => `
      <div class="products__list">
        ${loader !== '' ? loader : html}
      </div>
    `);
  }
}