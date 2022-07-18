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
    const html = data.isInCart
      ? `<span class="product__in-cart">В корзине</span>`
      : `<button class="button button_icon">
          <i class="fa-solid fa-cart-plus"></i>
        </button>`;

    return super.render(`<div class="product__add-to-curt">${html}</div>`);
  }  
}
