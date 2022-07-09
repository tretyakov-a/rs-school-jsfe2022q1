import './products-list.scss';
import { View, ViewOptions  } from '@core/view';

export class ProductsListView extends View {
  constructor(options: ViewOptions = {}) {
    super({
      ...options,
      mountPoint: '.products-list',
    })
  }
}