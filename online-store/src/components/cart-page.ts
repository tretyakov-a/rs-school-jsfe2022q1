import { Component, ComponentProps } from '@core/component';
import { EVENT } from '@common/constants';
import { AppLoadEventData } from './app';
import { CartPageView } from '@views/pages/cart-page';

export class CartPage extends Component {
  private productsAmountEl: Element | null;
  private totalSumEl: Element | null;

  constructor(props: ComponentProps) {
    super({
      ...props,
      viewConstructor: CartPageView,
    });

    this.productsAmountEl = null;
    this.totalSumEl = null;
    
    this.onLoadingStart();
    this.on(EVENT.LOAD_APP, this.handleAppLoad);
    this.on(EVENT.ADD_TO_CART, this.handleAddToCart);
  }
  
  protected afterRender(): void {
    super.afterRender();

    const productsAmountEl = this.getRoot().querySelector('.cart-details__products-amount span');
    if (productsAmountEl !== null) {
      this.productsAmountEl = productsAmountEl;
    }
    const totalSumEl = this.getRoot().querySelector('.cart-details__total-value');
    if (totalSumEl !== null) {
      this.totalSumEl = totalSumEl;
    }
  }

  private handleAppLoad = (e: CustomEvent<AppLoadEventData>) => {
    this.onLoadingEnd(e.detail);
  }

  private handleAddToCart = (e: CustomEvent<{ productsAmount: number, totalSum: number }>): void => {
    const { productsAmount, totalSum } = e.detail;
    if (this.productsAmountEl !== null) {
      this.productsAmountEl.textContent = `${productsAmount}`;
    }
    if (this.totalSumEl) {
      this.totalSumEl.textContent = `${totalSum}`;
    }
  };

}
