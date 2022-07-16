import './cart-page.scss';
import { View, ViewOptions } from '@core/view';

export class CartPageView extends View {
  constructor(options: ViewOptions) {
    super({
      ...options,
      root: '.cart-details',
    })
  }
  
  public render(): string {
    return super.render(`
      <div class="cart-details">
        <div class="cart-details__container container">
          Cart page! Not implemented yet!
          <a href="#">Back to main page</a>
        </div>
      </div>
    `);
  }
}