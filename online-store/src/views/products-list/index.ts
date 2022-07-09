import './products-list.scss';
import { View, ViewOptions  } from '@core/view';
import { Product } from '@components/products-list';

export class ProductsListView extends View {
  constructor(options: ViewOptions = {}) {
    super({
      ...options,
      mountPoint: '.products-list',
    })
  }

  public render(): void {
    super.render();
  }
}