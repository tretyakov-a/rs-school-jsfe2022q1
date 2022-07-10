import './products-list.scss';
import { View } from '@core/view';
import { ProductListDisplayOption } from '@components/products-list';

export class ProductsListView extends View {
  static readonly className: string = 'products-list';

  public render(data: { displayOption: ProductListDisplayOption }): void {
    const container = document.createElement('div');
    const className = ProductsListView.className;
    container.className = `${className} ${className}_${data.displayOption}`;
    super.render(container);
  }
}