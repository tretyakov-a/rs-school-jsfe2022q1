import { Component, ComponentProps } from '@core/component';
import { CartProductView } from '@views/pages/cart-page/cart-product';
import { selectFrom } from '@common/utils';
import { EVENT } from '@common/constants';
import { ProductProps } from './products/add-to-cart-btn';
import { Product } from '@common/product';

export class CartProduct extends Component {
  private product: Product;
  private counterEl: Element | null;
  private priceEl: Element | null;

  constructor(props: ProductProps) {
    super({
      ...props,
      viewConstructor: CartProductView,
    });

    const { data } = props;
    if (data === undefined) throw new TypeError();

    this.product = JSON.parse(JSON.stringify(data.product));
    this.counterEl = null;
    this.priceEl = null;
  }

  private handleTryAddToCart = (inc: number) => () => {
    const { product: { id }, handleAddToCart } = this;
    this.emit(EVENT.TRY_ADD_TO_CART, { productId: id, inc, handleAddToCart });
  }

  private handleAddToCart = (productAmount: number) => {
    if (productAmount === 0) {
      return this.handleDeleteFromCart();
    }

    if (this.counterEl !== null) {
      this.counterEl.textContent = `${productAmount}`;
    }

    if (this.priceEl !== null) {
      this.priceEl.textContent = `${productAmount * this.product.price}`;
    }
  }

  private handleDeleteProductClick = () => {
    const { product: { id }, handleDeleteFromCart } = this;
    this.emit(EVENT.TRY_DELETE_FROM_CART, { productId: id, handleDeleteFromCart });
  }

  private handleDeleteFromCart = () => {
    this.remove();
  }

  protected afterRender(): void {
    super.afterRender();

    selectFrom(this.getRoot())('.cart-product__add-btn')
      .addEventListener('click', this.handleTryAddToCart(1));

    selectFrom(this.getRoot())('.cart-product__sub-btn')
      .addEventListener('click', this.handleTryAddToCart(-1));

    selectFrom(this.getRoot())('.cart-product__delete-btn')
      .addEventListener('click', this.handleDeleteProductClick);
    
    this.counterEl = selectFrom(this.getRoot())('.cart-product__counter');
    this.priceEl = selectFrom(this.getRoot())('.cart-product__price-value');
  }
}
