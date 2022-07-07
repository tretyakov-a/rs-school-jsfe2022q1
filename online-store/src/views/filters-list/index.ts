import './filters-list.scss';
import filtersListTemplate from './filters-list.ejs';
import { View, ViewOptions } from '@core/view';
import { Product } from '@components/products-list';

export class FiltersListView extends View<Product> {
  constructor() {
    super({
      root: '.main__left',
      contentEl: '.filters',
    })
  }

  public render(options: ViewOptions<Product>): void {
    console.log(options);
    (this.contentEl as HTMLElement).innerHTML = filtersListTemplate();
  }
}