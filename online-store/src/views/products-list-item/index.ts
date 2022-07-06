import './products-list-item.scss';
import { View, ViewOptions } from '@core/view';
import { Product } from '@components/product-list';
import listItemTemplate from './products-list-item.ejs';

export class ProductsListItemView extends View<Product> {
  constructor(options: ViewOptions<Product> = {}) {
    super({
      ...options,
      root: '.products-list',
    })
  }

  public render(options: ViewOptions<Product>): void {
    const { data } = options;
    const container = document.createElement('li');
    container.className = 'products-list__item';
    container.innerHTML = listItemTemplate(data);
    this.contentEl?.append(container);
  }
}