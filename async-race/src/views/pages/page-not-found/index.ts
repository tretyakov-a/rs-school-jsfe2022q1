import './page-not-found.scss';
import { View, ViewOptions } from '@core/view';

export class PageNotFoundView extends View {
  constructor(options: ViewOptions) {
    super({
      ...options,
      root: '.page-not-found',
    })
  }
  
  public render(): string {
    return super.render(`
      <div class="page-not-found">
        <div class="page-not-found__container container">
          <p>404. Page not found!</p>
          <a href="#">Back to main page</a>
        </div>
      </div>
    `);
  }
}