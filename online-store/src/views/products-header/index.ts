import './products-header.scss';
import { View, ViewOptions } from '@core/view';
import { DisplayOptions } from '@components/products/display-options';
import { ProductsSort } from '@components/products/products-sort';

export class ProductsHeaderView extends View {
  constructor(options: ViewOptions) {
    super({
      ...options,
      root: '.products__header',
    })
  }

  public render(): string {  
    return super.render(`
      <div class="products__header">
        ${this.renderChild('productsSort', ProductsSort)}
        ${this.renderChild('productsDisplayOptions', DisplayOptions)}
      </div>
    `);
  }
}