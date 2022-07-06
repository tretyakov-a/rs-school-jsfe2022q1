import './header.scss';
import { View, ViewOptions } from '@core/view';
import headerTemplate from './header.ejs';

export class HeaderView extends View<void> {
  constructor() {
    super({
      root: '#app',
    })
  }

  public render(): void {
    const header = document.createElement('header');
    header.className = 'header';
    header.innerHTML = headerTemplate({ title: 'QudroShop' });
    this.contentEl?.append(header);
  }
}