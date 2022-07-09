import './products-list-item.scss';
import { View, ViewOptions } from '@core/view';
import { Product } from '@components/products-list';
import listItemTemplate from './products-list-item.ejs';

export class ProductsListItemView extends View {

  public render(data: Product): void {
    const container = document.createElement('li');
    container.className = 'products-list__item';
    container.innerHTML = listItemTemplate(data);
    super.render(container);
  }
}