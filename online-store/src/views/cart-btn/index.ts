import './cart-btn.scss';
import { View, ViewOptions } from '@core/view';
import { CartBtnViewOptions } from '@components/cart-btn';
import { Component } from '@core/component';
import { SpinnerView } from '@views/spinner';

export class CartBtnView extends View {
  constructor(options: ViewOptions) {
    super({
      ...options,
      root: '.header__cart',
    })
  }

  private renderCart(data: CartBtnViewOptions) {
    return `
      <div class="cart">
        <div class="cart__total">${data.productsAmount}</div>
        <a class="button button_special cart__link" href="#cart">Корзина</a>
      </div>`;
  }

  public render(data?: CartBtnViewOptions): string {
    const html =  `
      <div class="header__cart">
        ${!data || this.isLoading
          ? this.renderChild('spinner', Component, {
              viewConstructor: SpinnerView
            })
          : this.renderCart(data)}
      </div>`;
    return super.render(html);
  }
}