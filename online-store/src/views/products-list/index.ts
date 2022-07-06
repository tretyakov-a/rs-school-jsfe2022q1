import './products-list.scss';
import { View, ViewOptions } from '@core/view';
import { Product } from '@components/product-list';

export class ProductsListView extends View<Product> {
  constructor() {
    super({
      root: '.main__right',
      contentEl: '.products-list',
    })
  }

  public render(options: ViewOptions<Product>): void {
    super.render(options);
    // const { data } = options;
    // if (data === undefined || super.render(options) || !Array.isArray(data)) return;

    // console.log(data);
    
    // (this.contentEl as HTMLElement).innerHTML = '';

    // data.forEach((item) => {
    //   new ProductListItemView({ data: item });
    // });

    // const container = document.createElement('ul');
    // container.className = 'products-list';
    // this.contentEl?.append(fragment);
  }
}