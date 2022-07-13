import './switch-filter.scss';
import { View, ViewOptions } from "@core/view";

export type SwitchFilterViewOptions = {
  checked: boolean;
  inputName: string;
  title: string;
  matchedProductsNumber: number;
}

export class SwitchFilterView extends View {

  constructor(options: ViewOptions) {
    super({
      ...options,
      root: '.switch',
    })
  }

  public render(data: SwitchFilterViewOptions): string {
    const { inputName, checked, title, matchedProductsNumber } = data;

    return super.render(`
      <div class="switch">
        <label class="checkbox">
          <input type="checkbox" name="${inputName}" ${checked ? 'checked' : ''}>
          <span class="checkbox__check"></span>
          <span class="checkbox__title">${title} (${matchedProductsNumber})</span>
        </label>
      </div>
    `);
  }
}