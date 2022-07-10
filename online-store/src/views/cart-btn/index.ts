import './cart-btn.scss';
import { View } from '@core/view';
import cartBtnTemplate from './cart-btn.ejs';
import { CartBtnViewOptions } from '@components/cart-btn';

export class CartBtnView extends View {
  public render(data: CartBtnViewOptions): void {
    super.render(cartBtnTemplate(data));
  }
}