import { EVENT } from "@common/constants";
import { AddToCurtBtnView } from "@views/add-to-cart-btn";
import { Button } from "./button";
import { ProductProps } from "./products-list-item";

export class AddToCartBtn extends Button {
  private id: string;

  constructor(props: ProductProps) {
    if (!props.data) throw TypeError();
    super({
      ...props,
      viewConstructor: AddToCurtBtnView,
    });

    this.id = props.data.product.id;
    this.update(props.data);
  }

  protected onClick = (): void => {
    this.emit(EVENT.ADD_TO_CART, this.id);
    this.update({ isInCart: true });
  }
}