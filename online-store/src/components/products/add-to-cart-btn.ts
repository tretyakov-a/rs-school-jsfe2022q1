import { ActiveRoute } from "@common/active-route";
import { EVENT } from "@common/constants";
import { ComponentProps } from "@core/component";
import { AddToCurtBtnView } from "@views/products/add-to-cart-btn";
import { ProductViewOptions } from "@views/products/products-list-item";
import { Button } from "../button";

export type ProductProps = ComponentProps & {
  data?: ProductViewOptions;
}

export class AddToCartBtn extends Button {
  private productId: string;
  private isInCart: boolean;

  constructor(props: ProductProps) {
    if (!props.data) throw TypeError();
    super({
      ...props,
      viewConstructor: AddToCurtBtnView,
    });

    const { data } = props;
    if (data === undefined) throw new TypeError();

    this.productId = props.data.product.id;
    this.isInCart = data.isInCart;
  }

  private handleAddToCart = () => {
    this.isInCart = true;
    this.update({ isInCart: this.isInCart });
  }


  protected onClick = () => {
    const { productId, handleAddToCart } = this;

    if (this.isInCart) {
      return ActiveRoute.change(`cart`);
    }

    this.emit(EVENT.TRY_ADD_TO_CART, { productId, inc: 1, handleAddToCart });
  }
}