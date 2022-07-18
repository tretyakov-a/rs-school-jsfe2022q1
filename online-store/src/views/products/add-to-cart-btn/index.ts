import './add-to-cart-btn.scss';
import { View, ViewOptions } from '@core/view';
import { ProductViewOptions } from '../products-list-item';

export class AddToCurtBtnView extends View {
  constructor(options: ViewOptions) {
    super({
      ...options,
      root: '.product__add-to-curt',
    })
  }

  public render(data: ProductViewOptions): string {
    const { isInCart } = data;
    const text = isInCart
      ? `В корзине`
      : `Купить`;
    const title = isInCart
      ? `Перейти в корзину`
      : `Добавить в корзину`;

    return super.render(`
      <div class="product__add-to-curt">
        <button class="button ${isInCart ? 'button_in-cart' : ''}" title="${title}">
          ${text}
        </button>
      </div>
    `);
  }  
}
