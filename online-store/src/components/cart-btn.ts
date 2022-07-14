import { EVENT } from "@common/constants";
import { Component, ComponentProps } from "@core/component";
import { CartBtnView } from "@views/cart-btn";
import { AppLoadEventData } from '@components/app';

export type CartBtnViewOptions = {
  productsAmount: number;
}

export class CartBtn extends Component {
  private productIds: string[];

  constructor(props: ComponentProps) {
    super({
      ...props,
      viewConstructor: CartBtnView,
    });

    this.productIds = [];

    this.on(EVENT.ADD_TO_CART, this.handleAddToCart);
    this.on(EVENT.APP_LOAD, this.handleDataLoad);

    this.onLoadingStart();
  }

  private handleAddToCart = (e: CustomEvent<string>): void => {
    this.productIds.push(e.detail);
    this.update({ productsAmount: this.productIds.length });
  };

  public handleDataLoad = (e: CustomEvent<AppLoadEventData>): void => {
    this.productIds = [ ...e.detail.state.productInCartIds ];
    this.onLoadingEnd({ productsAmount: this.productIds.length });
  }

  protected render(data: CartBtnViewOptions): string {
    return super.render(data);
  }

}