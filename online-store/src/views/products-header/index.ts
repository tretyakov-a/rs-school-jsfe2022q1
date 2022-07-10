import './products-header.scss';
import { View } from '@core/view';
import headerTemplate from './products-header.ejs';

export class ProductsHeaderView extends View {
  public render(): void {
    super.render(headerTemplate())
  }
}