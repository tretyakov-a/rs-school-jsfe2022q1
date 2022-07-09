import './add-to-cart-btn.scss';
import btnTemplate from './add-to-cart-btn.ejs';
import { View, ViewOptions } from '@core/view';
import { ProductViewOptions } from '@components/products-list-item';

export class AddToCurtBtnView extends View {
  constructor(options: ViewOptions) {
    super({
      ...options,
      mountPoint: '.product__add-to-curt',
    })
  }

  public render(data: ProductViewOptions): void {
    super.render(btnTemplate(data));
  }  
}
