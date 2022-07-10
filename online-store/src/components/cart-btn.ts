import { EVENT } from "@common/constants";
import { Component, ComponentProps } from "@core/component";
import { CartBtnView } from "@views/cart-btn";
import { Product, ProductsLoadEventData } from '@components/app';

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
    this.on(EVENT.PRODUCTS_LOAD, this.handleDataLoad);
    
    this.update();
  }

  private handleAddToCart = (e: CustomEvent<string>): void => {
    this.productIds.push(e.detail);
    this.update();
  };

  public handleDataLoad = (e: CustomEvent<ProductsLoadEventData>): void => {
    this.productIds = [ ...e.detail.productInCartIds ];
    this.update();
  }

  protected update(): void {
    super.update({ productsAmount: this.productIds.length });
  }
}