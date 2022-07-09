import './cart-btn.scss';
import { View, ViewOptions } from '@core/view';
import cartBtnTemplate from './cart-btn.ejs';
import { CartBtnViewOptions } from '@components/cart-btn';

export class CartBtnView extends View {
  constructor(options: ViewOptions = {}) {
    super({
      ...options,
      mountPoint: '.header__cart',
    })
  }
  
  public render(data: CartBtnViewOptions): void {
    super.render(cartBtnTemplate(data));
  }
}