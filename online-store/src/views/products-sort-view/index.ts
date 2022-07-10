import './products-sort-view.scss';
import productsSortTemplate from './products-sort-view.ejs';
import { View } from '@core/view';
import { ProductsSortViewOptions } from '@components/products-sort';

export class ProductsSortView extends View {
  
  public render(data: ProductsSortViewOptions): void {
    super.render(productsSortTemplate(data));
  }  
}