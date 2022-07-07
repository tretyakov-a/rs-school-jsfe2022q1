import './products-list.scss';
import { View  } from '@core/view';
import { Product } from '@components/products-list';

export class ProductsListView extends View {
  constructor() {
    super({
      root: '.main__right',
      contentEl: '.products-list',
    })
  }

  public render(): void {
    super.render();
  }
}