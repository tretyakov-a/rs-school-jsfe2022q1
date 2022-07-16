import './shop-page.scss';
import { View, ViewOptions } from '@core/view';
import { Component } from '@core/component';
import { ProductsHeaderView } from '@views/products-header';
import { ProductsList } from '@components/products/products-list';
import { FiltersList } from '@components/filters/filters-list';
import { ResetSettingsBtn } from '@components/reset-settings-btn';
import { ResetFilterBtn } from '@components/filters/reset-filters-btn';
import { SelectedFilters } from '@components/filters/selected-filters';

export class ShopPageView extends View {
  
  constructor(options: ViewOptions) {
    super({
      ...options,
      root: '.shop',
    })
  }

  public render(): string {
    return super.render(`
      <div class="shop">
        <div class="shop__overlay"></div>
        <div class="shop__container container">
          <aside class="shop__left">
            <div class="controls">
              ${this.renderChild('resetFiltersBtn', ResetFilterBtn)}
              ${this.renderChild('resetSettingsBtn', ResetSettingsBtn)}
            </div>
            ${this.renderChild('filters', FiltersList)}
          </aside>
          <div class="shop__right">
            <div class="products">
              ${this.renderChild('productsHeader', Component, {
                viewConstructor: ProductsHeaderView
              })}
              ${this.renderChild('selectedFilters', SelectedFilters)}
              ${this.renderChild('productsList', ProductsList)}
            </div>
          </div>
        </div>
      </div>
    `);
  }
}