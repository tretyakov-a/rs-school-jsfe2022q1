import './products-list.scss';
import { View, ViewOptions } from '@core/view';
import { Product } from '@components/products-list';

export class ProductsListView extends View<Product> {
  constructor() {
    super({
      root: '.main__right',
      contentEl: '.products-list',
    })
  }

  public render(options: ViewOptions<Product>): void {
    super.render(options);
  }
}