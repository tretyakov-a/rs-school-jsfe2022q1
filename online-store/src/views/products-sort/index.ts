import './products-sort.scss';
import { View, ViewOptions } from '@core/view';
import { ProductsSortViewOptions } from '@components/products-sort';

export class ProductsSortView extends View {
  constructor(options: ViewOptions) {
    super({
      ...options,
      root: '.products__sort',
    })
  }

  private renderOptions({ options }: ProductsSortViewOptions) {
    const keys = Object.entries(options);
    return keys
      .map(([ key, [ value ]]) => `<option value="${key}">${value}</option>`)
      .join('');
  }

  public render(data: ProductsSortViewOptions): string {
    return super.render(`
      <div class="products__sort">
        <div class="select">
          <div class="select__title">Сортировать</div>
          <select class="select__input" name="products-sort">
            ${this.renderOptions(data)}
          </select>
        </div>
      </div>
    `);
  }  
}