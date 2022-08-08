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

  private renderMenu(items: Record<string, { content: string }>): string {
    const currenPath = ActiveRoute.getPath();
    const activeItemClass = 'header-menu__item_active';
    const menuItems = Object.keys(items).map((path) => `
      <li class="header-menu__item ${path === currenPath ? activeItemClass : ''}">
        <a href="${path}">${items[path].content}</a>
      </li>
    `).join('');
    return `
      <ul class="header-menu">
        ${menuItems}
      </ul>`
  }

  public render(): string {
    return super.render(`
      <div class="header">
        <div class="header__container container">
          <a class="header__logo logo" href="#">
            <h1>🏁 Async Race</h1>
          </a>
          <nav class="header__menu">
            ${this.renderMenu({
              '#': { content: 'Garage' },
              '#winners': { content: 'Winners'},
            })}
          </nav>
        </div>
      </div>
    `);
  }
}