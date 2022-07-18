import { EVENT } from "@common/constants";
import { Component, ComponentProps } from "@core/component";
import { CartBtnView } from "@views/cart-btn";
import { AppLoadEventData } from '@components/app';

export type CartBtnViewOptions = {
  productsAmount: number;
}

export class CartBtn extends Component {

  constructor(props: ComponentProps) {
    super({
      ...props,
      viewConstructor: CartBtnView,
    });


    this.on(EVENT.ADD_TO_CART, this.handleAddToCart);
    this.on(EVENT.LOAD_APP, this.handleDataLoad);

    this.onLoadingStart();
  }

  private handleAddToCart = (e: CustomEvent<{ productsAmount: number, totalSum: number }>): void => {
    const { productsAmount } = e.detail;
    this.update({ productsAmount });
  };

  public handleDataLoad = (e: CustomEvent<AppLoadEventData>): void => {
    const { productInCartIds } = e.detail.state;
    const productsAmount = Object.keys(productInCartIds).reduce((sum, id) => sum + productInCartIds[id], 0);
    this.onLoadingEnd({ productsAmount });
  }

  protected render(data: CartBtnViewOptions): string {
    return super.render(data);
  }

}