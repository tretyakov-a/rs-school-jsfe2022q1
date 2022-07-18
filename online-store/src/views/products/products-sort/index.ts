import './products-sort.scss';
import { View, ViewOptions } from '@core/view';
import { SORT, sortData } from '@common/sorting';

export class ProductsSortView extends View {
  constructor(options: ViewOptions) {
    super({
      ...options,
      root: '.products__sort',
    })
  }

  private renderOptions() {
    const keys = Object.entries(sortData);
    return keys
      .map(([ key, [ value ]]) => `<option value="${key}">${value}</option>`)
      .join('');
  }

  public render(data: { value: SORT }): string {
    return super.render(`
      <div class="products__sort">
        <div class="select">
          <div class="select__title">Сортировать</div>
          <select class="select__input" name="products-sort" value="${data?.value || SORT.TITLE_ASC}">
            ${this.renderOptions()}
          </select>
        </div>
      </div>
    `);
  }  
}