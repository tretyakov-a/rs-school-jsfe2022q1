import './footer.scss';
import { View, ViewOptions } from '@core/view';
import footerTemplate from './footer.ejs';

export class FooterView extends View<void> {
  constructor() {
    super({
      root: '#app',
    })
  }

  public render(): void {
    const footer = document.createElement('footer');
    footer.className = 'footer';
    footer.innerHTML = footerTemplate();
    this.contentEl?.append(footer);
  }
}