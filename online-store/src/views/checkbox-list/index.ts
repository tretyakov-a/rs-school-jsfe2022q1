import './checkbox-list.scss';
import { View } from '@core/view';
import { CheckboxListViewOptions } from '@components/checkbox-list';
import { ViewOptions } from '@core/view';

export class CheckboxListView extends View {
  constructor(options: ViewOptions) {
    super({
      ...options,
      root: '.checkbox-list',
    })
  }

  private renderItems(data: CheckboxListViewOptions): string {
    const { inputName, values } = data;
    return Object.keys(values)
      .map((key) => (`
        <li class="checkbox-list__item">
          <label class="checkbox">
            <input type="checkbox" name="${inputName}" value="${key}">
            <span class="checkbox__check"></span>
            <span class="checkbox__title">${key} (${values[key]})</span>
          </label>
        </li>
      `))
      .join('');
  }

  public render(data: CheckboxListViewOptions): string {
    return super.render(`
    <ul class="checkbox-list">
      ${this.renderItems(data)}
    </ul>
  `);
  }  
}
