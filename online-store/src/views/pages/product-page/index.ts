import './product-page.scss';
import { View, ViewOptions } from '@core/view';

export class ProductPageView extends View {
  constructor(options: ViewOptions) {
    super({
      ...options,
      root: '.product-datails',
    })
  }
  
  public render(): string {
    return super.render(`
      <div class="product-datails">
        <div class="product-datails__container container">
          Product page. Not implemented yet!
          <a href="#">Back to main page</a>
        </div>
      </div>
    `);
  }
}