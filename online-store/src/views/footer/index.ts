import './footer.scss';
import { View } from '@core/view';
import footerTemplate from './footer.ejs';

export class FooterView extends View {
  constructor() {
    super({
      root: '#app',
    })
  }

  public render(): void {
    const footer = document.createElement('footer');
    footer.className = 'footer';
    footer.innerHTML = footerTemplate();
    super.render(footer);
  }
}