import './header.scss';
import { View } from '@core/view';
import { ViewOptions } from '@core/view';
import { ActiveRoute } from '@common/active-route';

export class HeaderView extends View {
  constructor(options: ViewOptions) {
    super({
      ...options,
      root: '.header',
    })
  }

  public render(): string {
    const path = ActiveRoute.getPath();
    return super.render(`
      <div class="header">
        <div class="header__container container">
          <a class="header__logo logo" href="#">
            <h1>🏁 Async Race</h1>
          </a>
          <nav class="header__menu">
            <ul class="header-menu">
              <li class="header-menu__item header-menu__item_active">
                <a href="#">Garage</a>
              </li>
              <li class="header-menu__item">
                <a href="#winners">Winners</a>
              </li>
            </ul>
          </nav>
        </div>
      </div>
    `);
  }
}