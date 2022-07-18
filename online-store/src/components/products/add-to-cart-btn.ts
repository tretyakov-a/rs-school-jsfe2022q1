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

  constructor(props: ProductProps) {
    if (!props.data) throw TypeError();
    super({
      ...props,
      viewConstructor: AddToCurtBtnView,
    });

    this.productId = props.data.product.id;
    this.on(EVENT.ADD_TO_CART, this.handleAddToCart);
  }

  private handleAddToCart = (e: CustomEvent<string>) => {
    const productId = e.detail;
    if (this.productId === productId) {
      this.update({ isInCart: true });
    }
  }

  protected onClick = async () => {
    this.emit(EVENT.TRY_ADD_TO_CART, this.productId);
  }
}