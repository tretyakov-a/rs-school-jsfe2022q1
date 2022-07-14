import './main.scss';
import { View, ViewOptions } from '@core/view';
import { Component } from '@core/component';
import { ProductsHeaderView } from '@views/products-header';
import { ProductsList } from '@components/products-list';
import { FiltersList } from '@components/filters/filters-list';
import { ResetSettingsBtn } from '@components/reset-settings-btn';
import { ResetFilterBtn } from '../../components/reset-filters-btn';

export class MainView extends View {
  
  constructor(options: ViewOptions) {
    super({
      ...options,
      root: '.main',
    })
  }

  public render(): string {
    return super.render(`
      <div class="main">
        <div class="main__container container">
          <aside class="main__left">
            <div class="controls">
              ${this.renderChild('resetFiltersBtn', ResetFilterBtn)}
              ${this.renderChild('resetSettingsBtn', ResetSettingsBtn)}
            </div>
            ${this.renderChild('filters', FiltersList)}
          </aside>
          <div class="main__right">
            <div class="products">
              ${this.renderChild('productsHeader', Component, {
                viewConstructor: ProductsHeaderView
              })}
              ${this.renderChild('productsList', ProductsList)}
            </div>
          </div>
        </div>
      </div>
    `);
  }
}