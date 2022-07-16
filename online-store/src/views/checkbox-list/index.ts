import './checkbox-list.scss';
import { View } from '@core/view';
import { CheckboxListViewOptions } from '@components/filters/checkbox-filter';
import { ViewOptions } from '@core/view';
import { COLORS } from '@common/constants';

export class CheckboxListView extends View {
  constructor(options: ViewOptions) {
    super({
      ...options,
      root: '.checkbox-list',
    })
  }

  private renderItems(data: CheckboxListViewOptions): string {
    const { inputName, values, checkedValues, style } = data;
    const colorEntries = Object.entries(COLORS);
    return Object.keys(values)
    .map((key) => {
        const colorEntrie = colorEntries.find(([_, value]) => value === key) || ['white'];
        const colorStyle = style === 'color-pick' ? `style="background-color: ${colorEntrie[0]};"` : '';

        return `<li class="checkbox-list__item">
          <label class="checkbox">
            <input type="checkbox" name="${inputName}" value="${key}" ${checkedValues.includes(key) ? 'checked' : ''}>
            <span class="checkbox__check" ${colorStyle}></span>
            <span class="checkbox__title">${key} (${values[key]})</span>
          </label>
        </li>`
      })
      .join('');
  }

  public render(data: CheckboxListViewOptions): string {
    const { style } = data;
    const mod = style !== '' ? `checkbox-list_${style}` : '';
    return super.render(`
      <ul class="checkbox-list ${mod}">
        ${this.renderItems(data)}
      </ul>
    `);
  }  
}
