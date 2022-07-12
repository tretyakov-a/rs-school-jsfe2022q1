import { EVENT } from "@common/constants";
import { ComponentProps } from "@core/component";
import { AddToCurtBtnView } from "@views/add-to-cart-btn";
import { ProductViewOptions } from "@views/products-list-item";
import { Button } from "./button";

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
  }

  protected onClick = (): void => {
    this.emit(EVENT.ADD_TO_CART, this.id);
    this.update({ isInCart: true });
  }
}