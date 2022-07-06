import './main.scss';
import { View, ViewOptions } from '@core/view';
import mainTemplate from './main.ejs';

export class MainView extends View<void> {
  constructor() {
    super({
      root: '#app',
    })
  }

  public render(): void {
    const main = document.createElement('main');
    main.className = 'main';
    main.innerHTML = mainTemplate({ title: 'QudroShop' });
    this.contentEl?.append(main);
  }
}