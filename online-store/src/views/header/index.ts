import './header.scss';
import { View } from '@core/view';
import { CartBtn } from '@components/cart-btn';
import { ViewOptions } from '@core/view';
import { FiltersHeaderBtn } from '@components/filters/filters-header-btn';

export class HeaderView extends View {
  constructor(options: ViewOptions) {
    super({
      ...options,
      root: '.header',
    })
  }

  public render(): string { 
    return super.render(`
      <div class="header">
        <div class="header__container container">
          <div class="header__left">
            ${this.renderChild('filtersBurger', FiltersHeaderBtn)}
            <a class="header__logo logo" href="#">
              <h1>QuadroShop</h1>
            </a>
          </div>
          <nav class="header__menu">
            ${this.renderChild('cartBtn', CartBtn)}
          </nav>
        </div>
      </div>
    `);
  }
}