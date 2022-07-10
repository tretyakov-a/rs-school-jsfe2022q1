import './add-to-cart-btn.scss';
import btnTemplate from './add-to-cart-btn.ejs';
import { View } from '@core/view';
import { ProductViewOptions } from '@components/products-list-item';

export class AddToCurtBtnView extends View {
  public render(data: ProductViewOptions): void {
    super.render(btnTemplate(data));
  }  
}
