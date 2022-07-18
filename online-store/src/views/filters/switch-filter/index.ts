import './switch-filter.scss';
import { View, ViewOptions } from "@core/view";
import { ProductsNumberView } from '../filter-products-number';
import { Component } from '@core/component';

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
          <span class="checkbox__title">${title}</span>
          ${this.renderChild('productsNumber', Component, {
            viewConstructor: ProductsNumberView,
            viewOptions: {
              data: matchedProductsNumber
            },
          })}
        </label>
      </div>
    `);
  }
}