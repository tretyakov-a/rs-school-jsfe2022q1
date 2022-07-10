import './products-list-item.scss';
import { View } from '@core/view';
import listItemTemplate from './products-list-item.ejs';
import { ProductViewOptions } from '@components/products-list-item';

export class ProductsListItemView extends View {

  public render(data: ProductViewOptions): void {
    const container = document.createElement('li');
    container.className = 'products-list__item product';
    container.innerHTML = listItemTemplate(data.product);
    super.render(container);
  }
}