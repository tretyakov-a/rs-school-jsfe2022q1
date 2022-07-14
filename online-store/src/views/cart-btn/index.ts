import './cart-btn.scss';
import { ViewOptions } from '@core/view';
import { CartBtnViewOptions } from '@components/cart-btn';
import { LoaderView } from '@core/loader-view';

export class CartBtnView extends LoaderView {
  constructor(options: ViewOptions) {
    super({
      ...options,
      root: '.header__cart',
    })
  }

  private renderCart(productsAmount: number) {
    return `
      <div class="cart">
        <div class="cart__total">${productsAmount}</div>
        <a class="button button_special cart__link" href="#cart">Корзина</a>
      </div>`;
  }

  public render(data?: CartBtnViewOptions): string {

    let html = '';
    if (data !== undefined) {
      html = this.renderCart(data.productsAmount);
    }
    
    return super.render((loader: string) => `
      <div class="header__cart">
        ${loader !== '' ? loader : html}
      </div>
    `);
  }
}