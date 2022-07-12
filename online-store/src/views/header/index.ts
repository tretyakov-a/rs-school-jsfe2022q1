import './header.scss';
import { View } from '@core/view';
import { CartBtn } from '@components/cart-btn';
import { ViewOptions } from '@core/view';

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
          <a class="header__logo logo" href="#">
            <h1>QuadroShop</h1>
          </a>
          ${this.renderChild('cartBtn', CartBtn)}
        </div>
      </div>
    `);
  }
}