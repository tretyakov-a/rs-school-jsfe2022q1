import { Component, ComponentProps } from "@core/component";
import { ProductsListItemView } from '../views/products-list-item/index';
import { AddToCartBtn } from '@components/add-to-cart-btn';
import { Product } from '@components/app';

export type ProductViewOptions = {
  product: Product,
  isInCart: boolean,
}

export type ProductProps = ComponentProps & {
  data?: ProductViewOptions;
}

export class ProductsListItem extends Component {

  constructor(props: ProductProps) {
    super({
      ...props,
      viewConstructor: ProductsListItemView,
    })

    this.components = [
      ['addToCart', AddToCartBtn, {
        data: props.data,
        viewOptions: { mountPoint: '.product__add-to-curt' }
      }]
    ];

    this.update(props.data);
  }
}